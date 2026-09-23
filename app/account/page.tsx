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

import AccountPage from "@/components/account/AccountPage";

export default async function Page() {
  const session =
    await auth();

  if (
    !session?.user?.id
  ) {
    redirect(
      "/login?callbackUrl=%2Faccount"
    );
  }

  await connectDB();

  const customer =
    await Customer.findOne({
      _id:
        session.user.id,

      isActive: true,
    })
      .select(
        "firstName lastName email phone"
      )
      .lean();

  if (!customer) {
    redirect("/login");
  }

  const fullName = [
    customer.firstName,
    customer.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <>
      <Header />

      <AccountPage
        customer={{
          fullName:
            fullName ||
            "Customer",

          email:
            customer.email,

          phone:
            customer.phone,
        }}
      />

      <Footer />

      <MobileBottomNav />
    </>
  );
}