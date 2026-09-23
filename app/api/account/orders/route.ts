import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
export const runtime = "nodejs";
export async function GET() { const session = await auth(); if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized." }, { status: 401 }); try { await connectDB(); const orders = await Order.find({ customer: session.user.id }).sort({ createdAt: -1 }).lean(); return NextResponse.json({ orders: JSON.parse(JSON.stringify(orders)) }); } catch (error) { console.error("Get orders error:", error); return NextResponse.json({ message: "Unable to load orders." }, { status: 500 }); } }
