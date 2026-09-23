import CheckoutPage from "@/components/checkout/CheckoutPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function Page() {
  return (
	<>
<Header />
	  <CheckoutPage />
	  <Footer />
	  <MobileBottomNav />
	</>
  ) 
}