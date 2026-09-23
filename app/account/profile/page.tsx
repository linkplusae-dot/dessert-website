import {
  redirect,
} from "next/navigation";

import {
  auth,
} from "@/lib/auth";

import {
  connectDB,
} from "@/lib/mongodb";

import Customer from "@/models/Customer";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

import ProfilePage from "@/components/account/profile/ProfilePage";

export default async function Page() {
  const session =
    await auth();

  if (!session?.user?.id) {
    redirect(
      "/login?callbackUrl=%2Faccount%2Fprofile"
    );
  }

  await connectDB();

  const customer =
    await Customer.findOne({
      _id: session.user.id,
      isActive: true,
    })
      .select(
        "firstName lastName email phone createdAt"
      )
      .lean();

  if (!customer) {
    redirect("/login");
  }

  return (
    <>
      <Header />

      <ProfilePage
        customer={{
          firstName:
            customer.firstName,

          lastName:
            customer.lastName,

          email:
            customer.email,

          phone:
            customer.phone,

          createdAt:
            customer.createdAt.toISOString(),
        }}
      />

      <Footer />

      <MobileBottomNav />
    </>
  );
}