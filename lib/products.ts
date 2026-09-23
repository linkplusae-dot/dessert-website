import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";

import type {
  Product,
} from "@/types/product";

/* Get all active products */

export async function getProducts(): Promise<
  Product[]
> {
  await connectDB();

  const products =
    await ProductModel.find({
      isActive: true,
    })
      .populate(
        "category",
        "name slug image"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

  return JSON.parse(
    JSON.stringify(products)
  );
}

/* Get featured products */

export async function getFeaturedProducts(): Promise<
  Product[]
> {
  await connectDB();

  const products =
    await ProductModel.find({
      isActive: true,
      featured: true,
    })
      .populate(
        "category",
        "name slug image"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

  return JSON.parse(
    JSON.stringify(products)
  );
}

/* Get product by slug */

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  await connectDB();

  const product =
    await ProductModel.findOne({
      slug: slug
        .trim()
        .toLowerCase(),
      isActive: true,
    })
      .populate(
        "category",
        "name slug image"
      )
      .lean();

  if (!product) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(product)
  );
}