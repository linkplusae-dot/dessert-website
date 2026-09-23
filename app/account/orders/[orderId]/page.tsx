import OrderDetailsPage from "@/components/account/orders/details/OrderDetailsPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params;

  return (
	<>
  <Header />
	  
<OrderDetailsPage
  orderId={id}
/>
	  <Footer />
	  <MobileBottomNav />
	</>
	) 
}