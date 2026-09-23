import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { checkoutSchema, priceCheckout } from "@/lib/checkout";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: "Invalid checkout items." }, { status: 400 });
  try {
    await connectDB();
    const { pricing } = await priceCheckout(parsed.data.items);
    return NextResponse.json({ pricing });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to calculate your order." }, { status: 400 });
  }
}
