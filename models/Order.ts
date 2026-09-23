import { Schema, model, models, type Model, type Types } from "mongoose";

export type OrderDocument = {
  orderNumber: string;
  customer: Types.ObjectId;
  items: { product: Types.ObjectId; name: string; slug: string; image: string; selectedSize?: string; message?: string; quantity: number; unitPrice: number; lineTotal: number }[];
  deliveryAddress: { label: string; recipientName: string; phone: string; addressLine1: string; addressLine2?: string; area: string; emirate: string; notes?: string };
  pricing: { subtotal: number; deliveryFee: number; total: number };
  status: "Awaiting Payment" | "Confirmed" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";
  payment: { method: string; status: string; reference?: string };
  createdAt: Date;
  updatedAt: Date;
};

const item = new Schema({ product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, name: { type: String, required: true }, slug: { type: String, required: true }, image: { type: String, required: true }, selectedSize: String, message: String, quantity: { type: Number, required: true }, unitPrice: { type: Number, required: true }, lineTotal: { type: Number, required: true } }, { _id: false });
const address = new Schema({ label: String, recipientName: String, phone: String, addressLine1: String, addressLine2: String, area: String, emirate: String, notes: String }, { _id: false });
const orderSchema = new Schema<OrderDocument>({ orderNumber: { type: String, required: true, unique: true }, customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true, index: true }, items: { type: [item], required: true }, deliveryAddress: { type: address, required: true }, pricing: { subtotal: Number, deliveryFee: Number, total: Number }, status: { type: String, enum: ["Awaiting Payment", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"], default: "Awaiting Payment" }, payment: { method: { type: String, required: true }, status: { type: String, required: true }, reference: String } }, { timestamps: true });

export default (models.Order as Model<OrderDocument>) || model<OrderDocument>("Order", orderSchema);
