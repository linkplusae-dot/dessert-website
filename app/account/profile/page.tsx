import ProfilePage from "@/components/account/profile/ProfilePage";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";


export default function Page() {
 return (
	<>
 <Header />
	  <ProfilePage />;
	  <Footer />
	  <MobileBottomNav />
	</>
   )  
}