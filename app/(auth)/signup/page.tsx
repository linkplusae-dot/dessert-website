import SignupForm from "@/components/auth/SignupForm";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function SignupPage() {
  return (
<>
<Header />
      <Suspense>
        <SignupForm />
      </Suspense>
<MobileBottomNav />
</>
  ) 
}
import { Suspense } from "react";
