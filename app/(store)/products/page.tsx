import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProductsPage from "@/components/products/ProductsPage";

export default function Page() {
  return (

      <>
  <Header />
  <ProductsPage />
  <Footer />
  <MobileBottomNav />
  </>
    )
}