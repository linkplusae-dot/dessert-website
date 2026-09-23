import CartPage from "@/components/cart/CartPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function Page() {
  return (
    <>
    <Header />
      <CartPage />
    <Footer />
    <MobileBottomNav />
    </>
  ) 
}