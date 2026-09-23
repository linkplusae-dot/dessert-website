import AccountPage from "@/components/account/AccountPage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function Page() {
  return (
<>
<Header />
	  <AccountPage />
	  <Footer/>
	  <MobileBottomNav />	
</>
  )
}