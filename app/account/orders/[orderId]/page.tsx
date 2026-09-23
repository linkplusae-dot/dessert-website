import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import OrderDetailsPage from "@/components/account/orders/details/OrderDetailsPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

type PageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function Page({
  params,
}: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=%2Faccount%2Forders");
  const { orderId } = await params;
  await connectDB();
  const order = await Order.findOne({ _id: orderId, customer: session.user.id }).lean();
  if (!order) notFound();
  const detailOrder = {
    id: order.orderNumber,
    date: order.createdAt.toISOString(),
    status: order.status,
    currentStep: ["Confirmed", "Preparing", "Out for Delivery", "Delivered"].indexOf(order.status),
    customer: { name: order.deliveryAddress.recipientName, phone: order.deliveryAddress.phone },
    address: { emirate: order.deliveryAddress.emirate, area: order.deliveryAddress.area, street: order.deliveryAddress.addressLine1, building: order.deliveryAddress.label, apartment: order.deliveryAddress.addressLine2 || "", instructions: order.deliveryAddress.notes || "" },
    products: order.items.map((item) => ({ id: item.product.toString(), name: item.name, image: item.image, quantity: item.quantity, price: item.unitPrice, size: item.selectedSize || null, message: item.message || null })),
    subtotal: order.pricing.subtotal, deliveryFee: order.pricing.deliveryFee, total: order.pricing.total, paymentMethod: order.payment.method, paymentStatus: order.payment.status,
  };

  return (
	<>
  <Header />
	  
<OrderDetailsPage
  order={detailOrder}
/>
	  <Footer />
	  <MobileBottomNav />
	</>
	) 
}
