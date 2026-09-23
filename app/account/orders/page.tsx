import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import OrdersPage from "@/components/account/orders/OrdersPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default async function Page() {
 const session = await auth();
 if (!session?.user?.id) redirect("/login?callbackUrl=%2Faccount%2Forders");
 await connectDB();
 const documents = await Order.find({ customer: session.user.id }).sort({ createdAt: -1 }).lean();
 const orders = documents.map((order) => ({ id: order._id.toString(), orderNumber: order.orderNumber, createdAt: order.createdAt.toISOString(), status: order.status, total: order.pricing.total, items: order.items.map((item) => ({ id: item.product.toString(), name: item.name, image: item.image, quantity: item.quantity })) }));
 return (
	<>
 <Header />
	  <OrdersPage orders={orders} />
	  <Footer />
	  <MobileBottomNav />
	</>
   )  
}
