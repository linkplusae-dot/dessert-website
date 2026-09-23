"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import CheckoutHeader from "./CheckoutHeader";
import ContactInformation from "./ContactInformation";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";

import {
  cartItems,
  customer,
} from "./checkout-data";

import type {
  AddressForm,
} from "./checkout-types";

export default function CheckoutPage() {
  const [address, setAddress] =
    useState<AddressForm>({
      emirate: "",
      area: "",
      street: "",
      building: "",
      apartment: "",
      landmark: "",
      instructions: "",
    });

  const [
    saveAddress,
    setSaveAddress,
  ] = useState(true);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          item.price *
            item.quantity,
        0
      ),
    []
  );

  // Temporary until delivery rules
  // are confirmed.
  const deliveryFee =
    address.emirate ? 20 : 0;

  const total =
    subtotal + deliveryFee;

  const updateAddress = (
    field: keyof AddressForm,
    value: string
  ) => {
    setAddress((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log({
      customer,
      address,
      saveAddress,
      cartItems,
      subtotal,
      deliveryFee,
      total,
    });

    // Navigate to payment next.
  };

  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        pb-[120px]
        lg:pb-16
      "
    >
      <CheckoutHeader />

      <form
        onSubmit={handleSubmit}
        className="
          mx-auto
          grid
          max-w-[1280px]
          gap-5
          px-3
          py-5
          sm:px-6
          lg:grid-cols-[minmax(0,1fr)_390px]
          lg:items-start
          lg:gap-8
          lg:px-8
          lg:py-8
          xl:grid-cols-[minmax(0,1fr)_420px]
        "
      >
        <div className="space-y-5">
          <ContactInformation
            customer={customer}
          />

          <DeliveryAddressForm
            address={address}
            saveAddress={saveAddress}
            onChange={updateAddress}
            onSaveAddressChange={
              setSaveAddress
            }
          />

          {/* Mobile */}
          <div className="lg:hidden">
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={
                deliveryFee
              }
              total={total}
              hasEmirate={
                !!address.emirate
              }
            />
          </div>

          <Link
            href="/cart"
            className="
              flex
              justify-center
              py-2
              text-[10px]
              font-semibold
              text-[var(--primary)]
              underline
              underline-offset-4
              sm:hidden
            "
          >
            Back to Cart
          </Link>
        </div>

        {/* Desktop */}
        <aside
          className="
            hidden
            lg:sticky
            lg:top-6
            lg:block
          "
        >
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={
              deliveryFee
            }
            total={total}
            hasEmirate={
              !!address.emirate
            }
          />
        </aside>
      </form>
    </main>
  );
}