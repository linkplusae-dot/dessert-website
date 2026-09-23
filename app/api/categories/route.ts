import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

/* Get categories */

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({
      isActive: true,
    })
      .sort({
        sortOrder: 1,
        createdAt: 1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error(
      "GET categories error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch categories.",
      },
      {
        status: 500,
      }
    );
  }
}