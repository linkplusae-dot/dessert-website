import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

/* Get products */

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {
      isActive: true,
    };

    /* Category filter */

    if (category) {
      const categoryDocument = await Category.findOne({
        slug: category.toLowerCase(),
        isActive: true,
      }).select("_id");

      if (!categoryDocument) {
        return NextResponse.json({
          success: true,
          products: [],
        });
      }

      filter.category = categoryDocument._id;
    }

    /* Featured filter */

    if (featured === "true") {
      filter.featured = true;
    }

    /* Search */

    if (search?.trim()) {
      filter.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const products = await Product.find(filter)
      .populate(
        "category",
        "name slug image"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "GET products error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch products.",
      },
      {
        status: 500,
      }
    );
  }
}

/* Create product */

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      slug,
      category,
      description,
      price,
      images = [],
      sizes = [],
      allowMessage = false,
      stock = 0,
      featured = false,
      isActive = true,
    } = body;

    if (
      !name ||
      !slug ||
      !category ||
      !description ||
      price === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, slug, category, description and price are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!Types.ObjectId.isValid(category)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category.",
        },
        {
          status: 400,
        }
      );
    }

    const categoryExists =
      await Category.exists({
        _id: category,
        isActive: true,
      });

    if (!categoryExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Category does not exist.",
        },
        {
          status: 400,
        }
      );
    }

    const existingProduct =
      await Product.findOne({
        slug: slug
          .trim()
          .toLowerCase(),
      });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A product with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const product =
      await Product.create({
        name: name.trim(),
        slug: slug
          .trim()
          .toLowerCase(),
        category,
        description:
          description.trim(),
        price,
        images,
        sizes,
        allowMessage,
        stock,
        featured,
        isActive,
      });

    await product.populate(
      "category",
      "name slug image"
    );

    return NextResponse.json(
      {
        success: true,
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE product error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create product.",
      },
      {
        status: 500,
      }
    );
  }
}