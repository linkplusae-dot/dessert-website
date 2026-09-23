import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";

import type { Category } from "@/types/category";

/* Get active categories */

export async function getCategories(): Promise<Category[]> {
  await connectDB();

  const categories = await CategoryModel.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
      createdAt: 1,
    })
    .lean();

  return JSON.parse(
    JSON.stringify(categories)
  );
}