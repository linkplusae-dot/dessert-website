import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { checkoutSchema, priceCheckout } from "@/lib/checkout";
import { connectDB } from "@/lib/mongodb";
import Address from "@/models/Address";
import Order from "@/models/Order";

export const runtime = "nodejs";

const emirates = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"] as const;
const newAddressSchema = z.object({ label: z.enum(["Home", "Office"]), recipientName: z.string().trim().min(1).max(100), phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,25}$/), addressLine1: z.string().trim().min(3).max(200), addressLine2: z.string().trim().max(200).optional().default(""), area: z.string().trim().min(2).max(100), emirate: z.enum(emirates), notes: z.string().trim().max(300).optional().default("") }).strict();
const orderSchema = checkoutSchema.and(z.discriminatedUnion("addressMode", [z.object({ addressMode: z.literal("saved"), addressId: z.string().min(1) }).strict(), z.object({ addressMode: z.literal("new"), address: newAddressSchema, saveAddress: z.boolean() }).strict()]));

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const parsed = orderSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: "Enter a valid delivery address and checkout items." }, { status: 400 });
  try {
    await connectDB();
    const input = parsed.data;
    let deliveryAddress;
    if (input.addressMode === "saved") {
      const saved = await Address.findOne({ _id: input.addressId, customer: session.user.id }).lean();
      if (!saved) return NextResponse.json({ message: "Select one of your saved addresses." }, { status: 400 });
      deliveryAddress = { label: saved.label, recipientName: saved.recipientName, phone: saved.phone, addressLine1: saved.addressLine1, addressLine2: saved.addressLine2, area: saved.area, emirate: saved.emirate, notes: saved.notes };
    } else {
      deliveryAddress = input.address;
      if (input.saveAddress) {
        const isDefault = (await Address.countDocuments({ customer: session.user.id })) === 0;
        await Address.create({ customer: session.user.id, ...input.address, isDefault });
      }
    }
    const checkout = await priceCheckout(input.items);
    const order = await Order.create({ orderNumber: `ORD-${randomUUID().slice(0, 8).toUpperCase()}`, customer: session.user.id, items: checkout.items, deliveryAddress, pricing: checkout.pricing, status: "Awaiting Payment", payment: { method: "Pending", status: "Pending" } });
    return NextResponse.json({ order: { id: order._id.toString(), orderNumber: order.orderNumber } }, { status: 201 });
  } catch (error) {
    console.error("Create checkout order error:", error);
    return NextResponse.json({ message: "Unable to prepare your order." }, { status: 500 });
  }
}
