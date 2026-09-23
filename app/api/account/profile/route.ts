import {
  NextResponse,
} from "next/server";

import { z } from "zod";

import { auth } from "@/lib/auth";
import {
  connectDB,
} from "@/lib/mongodb";

import Customer from "@/models/Customer";

export const runtime = "nodejs";

const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(
      1,
      "First name is required."
    )
    .max(
      50,
      "First name is too long."
    ),

  lastName: z
    .string()
    .trim()
    .min(
      1,
      "Last name is required."
    )
    .max(
      50,
      "Last name is too long."
    ),

  phone: z
    .string()
    .trim()
    .min(
      7,
      "Enter a valid mobile number."
    )
    .max(
      25,
      "Mobile number is too long."
    ),
});

/* Get Profile */

export async function GET() {
  try {
    const session =
      await auth();

    if (
      !session?.user?.id
    ) {
      return NextResponse.json(
        {
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const customer =
      await Customer.findById(
        session.user.id
      )
      .select(
          "firstName lastName email phone createdAt isActive"
        )
        .lean();

    if (
      !customer ||
      !customer.isActive
    ) {
      return NextResponse.json(
        {
          message:
            "Customer not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      customer: {
        id:
          customer._id.toString(),

        firstName:
          customer.firstName,

        lastName:
          customer.lastName,

        email:
          customer.email,

        phone:
          customer.phone,

        createdAt:
          customer.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error(
      "Get profile error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to load profile.",
      },
      {
        status: 500,
      }
    );
  }
}

/* Update Profile */

export async function PATCH(
  request: Request
) {
  try {
    const session =
      await auth();

    if (
      !session?.user?.id
    ) {
      return NextResponse.json(
        {
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const parsed =
      profileSchema.safeParse(
        body
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            parsed.error
              .issues[0]
              ?.message ||
            "Invalid profile information.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const customer =
      await Customer.findOneAndUpdate(
        {
          _id:
            session.user.id,

          isActive: true,
        },
        {
          $set: {
            firstName:
              parsed.data
                .firstName,

            lastName:
              parsed.data
                .lastName,

            phone:
              parsed.data.phone,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).select(
        "firstName lastName email phone createdAt"
      );

    if (!customer) {
      return NextResponse.json(
        {
          message:
            "Customer not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message:
        "Profile updated successfully.",

      customer: {
        id:
          customer._id.toString(),

        firstName:
          customer.firstName,

        lastName:
          customer.lastName,

        email:
          customer.email,

        phone:
          customer.phone,

        createdAt:
          customer.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error(
      "Update profile error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to update profile.",
      },
      {
        status: 500,
      }
    );
  }
}
