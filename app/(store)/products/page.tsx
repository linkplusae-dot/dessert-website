import { Suspense } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProductsPage from "@/components/products/ProductsPage";

import {
  getProducts,
} from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products =
    await getProducts();

  return (
    <>
      <Header />

      <Suspense fallback={null}>
        <ProductsPage
          products={products}
        />
      </Suspense>

      <Footer />

      <MobileBottomNav />
    </>
  );
}