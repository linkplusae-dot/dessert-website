import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Address from "@/models/Address";

const addressSchema = z.object({ label: z.string().trim().min(1).max(30), recipientName: z.string().trim().min(1).max(100), phone: z.string().trim().min(7).max(25), addressLine1: z.string().trim().min(3).max(200), addressLine2: z.string().trim().max(200).optional(), area: z.string().trim().min(2).max(100), city: z.string().trim().min(2).max(100), emirate: z.string().trim().min(2).max(100), notes: z.string().trim().max(300).optional(), isDefault: z.boolean().optional() });
async function customerId() { const session = await auth(); return session?.user?.id; }
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const customer = await customerId(); if (!customer) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  try { const body = await request.json(); const parsed = addressSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid address." }, { status: 400 }); await connectDB(); const { id } = await params; if (parsed.data.isDefault) await Address.updateMany({ customer }, { $set: { isDefault: false } }); const address = await Address.findOneAndUpdate({ _id: id, customer }, { $set: parsed.data }, { new: true, runValidators: true }).lean(); return address ? NextResponse.json({ address: JSON.parse(JSON.stringify(address)) }) : NextResponse.json({ message: "Address not found." }, { status: 404 }); } catch (error) { console.error("Update address error:", error); return NextResponse.json({ message: "Unable to update address." }, { status: 500 }); }
}
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const customer = await customerId(); if (!customer) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  try { await connectDB(); const { id } = await params; const deleted = await Address.findOneAndDelete({ _id: id, customer }); if (!deleted) return NextResponse.json({ message: "Address not found." }, { status: 404 }); if (deleted.isDefault) { const next = await Address.findOne({ customer }).sort({ createdAt: -1 }); if (next) { next.isDefault = true; await next.save(); } } return NextResponse.json({ message: "Address deleted." }); } catch (error) { console.error("Delete address error:", error); return NextResponse.json({ message: "Unable to delete address." }, { status: 500 }); }
}
