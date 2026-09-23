import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import OrderSuccessPage from "@/components/order-success/OrderSuccessPage";

export default function Page() {
  return(
<>
<Header />
    <OrderSuccessPage />
    <Footer />
    <MobileBottomNav />
</>
  ) 
}