import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProductDetails from "@/components/products/ProductDetails";

import {
  getProductBySlug,
} from "@/lib/products";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  const product =
    await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />

      <ProductDetails
        product={product}
      />

      <Footer />

      <MobileBottomNav />
    </>
  );
}