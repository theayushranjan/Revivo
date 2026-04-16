import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function generateRedemptionCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const { userId, voucherId } = await request.json()

    if (!userId || !voucherId) {
      return NextResponse.json(
        { error: 'User ID and voucher ID are required' },
        { status: 400 }
      )
    }

    // Get user and voucher
    const [user, voucher] = await Promise.all([
      db.user.findUnique({ where: { id: userId } }),
      db.voucher.findUnique({ where: { id: voucherId } })
    ])

    if (!user || !voucher) {
      return NextResponse.json(
        { error: 'User or voucher not found' },
        { status: 404 }
      )
    }

    // Check if user has enough points
    if (user.ePoints < voucher.points) {
      return NextResponse.json(
        { error: 'Insufficient E-Points' },
        { status: 400 }
      )
    }

    // Check if voucher is available
    if (!voucher.isActive || voucher.stock <= 0) {
      return NextResponse.json(
        { error: 'Voucher is not available' },
        { status: 400 }
      )
    }

    // Generate unique redemption code
    let redemptionCode: string
    let attempts = 0
    do {
      redemptionCode = generateRedemptionCode()
      attempts++
      if (attempts > 10) {
        return NextResponse.json(
          { error: 'Failed to generate redemption code' },
          { status: 500 }
        )
      }
    } while (await db.voucherRedemption.findUnique({ where: { code: redemptionCode } }))

    // Use transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
      // Create voucher redemption
      const redemption = await tx.voucherRedemption.create({
        data: {
          userId,
          voucherId,
          pointsUsed: voucher.points,
          code: redemptionCode
        }
      })

      // Update user points
      await tx.user.update({
        where: { id: userId },
        data: { ePoints: user.ePoints - voucher.points }
      })

      // Update voucher stock
      await tx.voucher.update({
        where: { id: voucherId },
        data: { stock: voucher.stock - 1 }
      })

      // Create reward record
      await tx.reward.create({
        data: {
          userId,
          points: -voucher.points,
          type: 'redeemed',
          description: `Redeemed ${voucher.name} voucher`,
          referenceId: redemption.id
        }
      })

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId,
          type: 'debit',
          amount: voucher.points,
          description: `Redeemed ${voucher.name} voucher`,
          referenceId: redemption.id
        }
      })

      return redemption
    })

    return NextResponse.json({
      message: 'Voucher redeemed successfully',
      redemptionCode: result.code
    })

  } catch (error) {
    console.error('Error redeeming voucher:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}