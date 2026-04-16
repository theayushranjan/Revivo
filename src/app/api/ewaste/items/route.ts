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

    const items = await db.ewasteItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ items })

  } catch (error) {
    console.error('Error fetching e-waste items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      name,
      category,
      brand,
      model,
      age,
      condition,
      description,
      images
    } = await request.json()

    // Validate required fields
    if (!userId || !name || !category || !condition) {
      return NextResponse.json(
        { error: 'User ID, name, category, and condition are required' },
        { status: 400 }
      )
    }

    // Calculate estimated points based on category and condition
    const basePoints = {
      'TV': 100,
      'AC': 150,
      'Fridge': 120,
      'Phone': 50,
      'Laptop': 80,
      'Charger': 10,
      'Tablet': 60,
      'Monitor': 70,
      'Other': 30
    }

    const conditionMultiplier = {
      'Working': 1.0,
      'Not Working': 0.6,
      'Damaged': 0.3
    }

    const estimatedPoints = Math.round(
      (basePoints[category as keyof typeof basePoints] || basePoints.Other) *
      (conditionMultiplier[condition as keyof typeof conditionMultiplier] || 0.5)
    )

    // Create e-waste item
    const item = await db.ewasteItem.create({
      data: {
        userId,
        name,
        category,
        brand,
        model,
        age,
        condition,
        description,
        images: images ? JSON.stringify(images) : null,
        estimatedPoints,
        status: 'pending'
      }
    })

    return NextResponse.json({
      message: 'E-waste item listed successfully',
      item: {
        ...item,
        images: item.images ? JSON.parse(item.images) : []
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating e-waste item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}