import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Moments from "@/components/home/Moments";
import OrderCTA from "@/components/home/OrderCTA";
import Footer from "@/components/layout/Footer";
import Products from "@/components/home/Products";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="w-full pb-[80px] lg:pb-0">
        <Hero />
        <Categories />
        <BestSellers />
        <Products />

        <Moments />
        <OrderCTA />
              <Footer />

      </main>

      <MobileBottomNav />
    </>
  );
}