import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Moments from "@/components/home/Moments";
import OrderCTA from "@/components/home/OrderCTA";
import Footer from "@/components/layout/Footer";
import Products from "@/components/home/Products";

import {
  getFeaturedProducts,
  getProducts,
} from "@/lib/products";

import {
  getCategories,
} from "@/lib/categories";

export default async function HomePage() {
  const [
    categories,
    products,
    featuredProducts,
  ] = await Promise.all([
    getCategories(),
    getProducts(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Header />

      <main className="w-full pb-[80px] lg:pb-0">
        <Hero />

        <Categories
          categories={categories}
        />

        <BestSellers
          products={featuredProducts}
        />

        <Products
          products={products}
        />

        <Moments />

        <OrderCTA />

        <Footer />
      </main>

      <MobileBottomNav />
    </>
  );
}