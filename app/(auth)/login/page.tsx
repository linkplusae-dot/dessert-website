import { Suspense } from "react";

import LoginForm from "@/components/auth/LoginForm";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function LoginPage() {
  return (
<>
<Header />
      <Suspense>
        <LoginForm />
      </Suspense>
<MobileBottomNav />
</>
  ) 
}
