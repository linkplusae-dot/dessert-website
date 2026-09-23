"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import CheckoutProgress from "./CheckoutProgress";
import DeliverySummary from "./DeliverySummary";
import PaymentMethods from "./PaymentMethods";
import PaymentOrderSummary from "./PaymentOrderSummary";

export default function PaymentPage() {
  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("card");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log({
      paymentMethod,
    });

    // Real payment gateway logic
    // will be connected later.
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
      <section
        className="
          border-b
          border-[var(--primary)]/10
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[1280px]
            px-4
            pt-6
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <p
              className="
                text-center
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[var(--accent)]
              "
            >
              Secure Checkout
            </p>

            <h1
              className="
                mt-2
                text-center
                font-serif
                text-[30px]
                font-semibold
                text-[var(--foreground)]
                sm:text-[34px]
                lg:text-[40px]
              "
            >
              Payment
            </h1>
          </motion.div>

          <CheckoutProgress />
        </div>
      </section>

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
          <DeliverySummary />

          <PaymentMethods
            selected={paymentMethod}
            onChange={
              setPaymentMethod
            }
          />

          {/* Mobile */}
          <div className="lg:hidden">
            <PaymentOrderSummary />
          </div>

          <Link
            href="/checkout"
            className="
              flex
              justify-center
              py-2
              text-[10px]
              font-semibold
              text-[var(--primary)]
              underline
              underline-offset-4
              lg:justify-start
            "
          >
            Back to Delivery
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
          <PaymentOrderSummary />
        </aside>
      </form>
    </main>
  );
}