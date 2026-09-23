import {
  NextResponse,
} from "next/server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export const runtime = "nodejs";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name is required"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name is required"),

    email: z
      .string()
      .trim()
      .email("Enter a valid email address"),

    phone: z
      .string()
      .trim()
      .min(7, "Enter a valid phone number")
      .max(20, "Enter a valid phone number"),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      ),

    confirmPassword: z
      .string()
      .min(8),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const parsed =
      signupSchema.safeParse(
        body
      );

    if (!parsed.success) {
      const error =
        parsed.error.issues[0];

      return NextResponse.json(
        {
          success: false,
          message:
            error?.message ||
            "Invalid information",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = parsed.data;

    const normalizedEmail =
      email.toLowerCase();

    const existingCustomer =
      await Customer.findOne({
        email: normalizedEmail,
      });

    if (existingCustomer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An account with this email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );

    const customer =
      await Customer.create({
        firstName,
        lastName,
        email: normalizedEmail,
        phone,
        passwordHash,
      });

    return NextResponse.json(
      {
        success: true,

        customer: {
          id: customer._id.toString(),
          firstName:
            customer.firstName,
          lastName:
            customer.lastName,
          email: customer.email,
          phone: customer.phone,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Signup error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create account. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}