import PaymentPage from "@/components/payment/PaymentPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function Page() {

  return (
    <>
  <Header />
      <PaymentPage />;
      <Footer />
      <MobileBottomNav />
    </>
    ) 
}