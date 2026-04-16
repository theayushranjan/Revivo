import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        ePoints: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, name, phone, address, city, state, pincode } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(pincode && { pincode })
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        ePoints: true,
        isActive: true,
        emailVerified: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}