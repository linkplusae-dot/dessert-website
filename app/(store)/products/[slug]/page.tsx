import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductDetails from "@/components/products/ProductDetails";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <>
   <Header /> 
    <ProductDetails productId={slug} />;
    <Footer />
    </>
  ) 
}
