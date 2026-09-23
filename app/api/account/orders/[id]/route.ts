import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) { const session = await auth(); if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 }); try { await connectDB(); const { id } = await params; const order = await Order.findOne({ customer: session.user.id, $or: [{ _id: id }, { orderNumber: id }] }).lean(); return order ? NextResponse.json({ order: JSON.parse(JSON.stringify(order)) }) : NextResponse.json({ message: "Order not found." }, { status: 404 }); } catch (error) { console.error("Get order error:", error); return NextResponse.json({ message: "Unable to load order." }, { status: 500 }); } }
