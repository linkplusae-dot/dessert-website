import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* Get product */

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;

    let product;

    if (Types.ObjectId.isValid(id)) {
      product = await Product.findOne({
        _id: id,
        isActive: true,
      }).populate(
        "category",
        "name slug image"
      );
    } else {
      product = await Product.findOne({
        slug: id.toLowerCase(),
        isActive: true,
      }).populate(
        "category",
        "name slug image"
      );
    }

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "GET product error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch product.",
      },
      {
        status: 500,
      }
    );
  }
}

/* Update product */

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid product ID.",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    if (body.category) {
      if (
        !Types.ObjectId.isValid(
          body.category
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid category.",
          },
          {
            status: 400,
          }
        );
      }

      const categoryExists =
        await Category.exists({
          _id: body.category,
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
    }

    if (body.slug) {
      body.slug = body.slug
        .trim()
        .toLowerCase();

      const duplicate =
        await Product.findOne({
          slug: body.slug,
          _id: {
            $ne: id,
          },
        });

      if (duplicate) {
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
    }

    const product =
      await Product.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "category",
        "name slug image"
      );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "UPDATE product error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update product.",
      },
      {
        status: 500,
      }
    );
  }
}

/* Delete product */

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid product ID.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      Soft delete.

      We keep the product in MongoDB because
      future orders may reference this product.
    */

    const product =
      await Product.findByIdAndUpdate(
        id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Product removed successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE product error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to remove product.",
      },
      {
        status: 500,
      }
    );
  }
}