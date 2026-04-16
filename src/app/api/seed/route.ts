import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Create sample vouchers
    const vouchers = [
      {
        name: 'Amazon Gift Card',
        provider: 'Amazon',
        description: 'Redeemable on Amazon.in for any product',
        points: 500,
        value: 500,
        stock: 100
      },
      {
        name: 'Flipkart Gift Card',
        provider: 'Flipkart',
        description: 'Use on Flipkart for electronics, fashion, and more',
        points: 500,
        value: 500,
        stock: 100
      },
      {
        name: 'Amazon Gift Card',
        provider: 'Amazon',
        description: 'Redeemable on Amazon.in for any product',
        points: 1000,
        value: 1000,
        stock: 50
      },
      {
        name: 'Flipkart Gift Card',
        provider: 'Flipkart',
        description: 'Use on Flipkart for electronics, fashion, and more',
        points: 1000,
        value: 1000,
        stock: 50
      },
      {
        name: 'Amazon Gift Card',
        provider: 'Amazon',
        description: 'Redeemable on Amazon.in for any product',
        points: 2000,
        value: 2000,
        stock: 25
      },
      {
        name: 'Flipkart Gift Card',
        provider: 'Flipkart',
        description: 'Use on Flipkart for electronics, fashion, and more',
        points: 2000,
        value: 2000,
        stock: 25
      }
    ]

    for (const voucher of vouchers) {
      await db.voucher.create({
        data: voucher
      })
    }

    return NextResponse.json({ message: 'Database seeded successfully!' })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}