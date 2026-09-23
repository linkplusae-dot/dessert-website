import OrdersPage from "@/components/account/orders/OrdersPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function Page() {
 return (
	<>
 <Header />
	  <OrdersPage />;
	  <Footer />
	  <MobileBottomNav />
	</>
   )  
}