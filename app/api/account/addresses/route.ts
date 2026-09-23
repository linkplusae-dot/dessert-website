import {
  NextResponse,
} from "next/server";

import { z } from "zod";

import { auth } from "@/lib/auth";
import {
  connectDB,
} from "@/lib/mongodb";

import Address from "@/models/Address";

export const runtime = "nodejs";

const addressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1)
    .max(30),

  recipientName: z
    .string()
    .trim()
    .min(1)
    .max(100),

  phone: z
    .string()
    .trim()
    .min(7)
    .max(25),

  addressLine1: z
    .string()
    .trim()
    .min(3)
    .max(200),

  addressLine2: z
    .string()
    .trim()
    .max(200)
    .optional()
    .default(""),

  area: z
    .string()
    .trim()
    .min(2)
    .max(100),

  city: z
    .string()
    .trim()
    .min(2)
    .max(100),

  emirate: z
    .string()
    .trim()
    .min(2)
    .max(100),

  notes: z
    .string()
    .trim()
    .max(300)
    .optional()
    .default(""),

  isDefault: z
    .boolean()
    .optional()
    .default(false),
});

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const addresses =
      await Address.find({
        customer:
          session.user.id,
      })
        .sort({
          isDefault: -1,
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      addresses:
        JSON.parse(
          JSON.stringify(
            addresses
          )
        ),
    });
  } catch (error) {
    console.error(
      "Get addresses error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to load addresses.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const parsed =
      addressSchema.safeParse(
        body
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            parsed.error.issues[0]
              ?.message ||
            "Invalid address.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const existingCount =
      await Address.countDocuments(
        {
          customer:
            session.user.id,
        }
      );

    const shouldBeDefault =
      existingCount === 0 ||
      parsed.data.isDefault;

    if (shouldBeDefault) {
      await Address.updateMany(
        {
          customer:
            session.user.id,
        },
        {
          $set: {
            isDefault: false,
          },
        }
      );
    }

    const address =
      await Address.create({
        customer:
          session.user.id,

        ...parsed.data,

        isDefault:
          shouldBeDefault,
      });

    return NextResponse.json(
      {
        message:
          "Address saved successfully.",

        address: {
          id:
            address._id.toString(),

          label:
            address.label,

          recipientName:
            address.recipientName,

          phone:
            address.phone,

          addressLine1:
            address.addressLine1,

          addressLine2:
            address.addressLine2,

          area:
            address.area,

          emirate:
            address.emirate,

          notes:
            address.notes,

          isDefault:
            address.isDefault,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Create address error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to save address.",
      },
      {
        status: 500,
      }
    );
  }
}
