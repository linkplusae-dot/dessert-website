import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import Address from "@/models/Address";

import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Footer from "@/components/layout/Footer";
import CheckoutPage from "@/components/checkout/CheckoutPage";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        "/checkout"
      )}`
    );
  }

  await connectDB();

  const [customer, addresses] = await Promise.all([
    Customer.findById(session.user.id).lean(),
    Address.find({ customer: session.user.id }).sort({ isDefault: -1, createdAt: -1 }).lean(),
  ]);

  if (!customer) redirect(`/login?callbackUrl=${encodeURIComponent("/checkout")}`);

  return (
    <>
      <Header />

      <CheckoutPage customer={{ fullName: `${customer.firstName} ${customer.lastName}`.trim(), email: customer.email, phone: customer.phone }} addresses={addresses.map((address) => ({ id: address._id.toString(), label: address.label, recipientName: address.recipientName, phone: address.phone, addressLine1: address.addressLine1, addressLine2: address.addressLine2, area: address.area, emirate: address.emirate, notes: address.notes, isDefault: address.isDefault }))} />

      <Footer />

      <MobileBottomNav />
    </>
  );
}
