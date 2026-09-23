"use client";

import { motion } from "framer-motion";

import SuccessHero from "./SuccessHero";
import OrderDetails from "./OrderDetails";
import DeliveryDetails from "./DeliveryDetails";
import OrderItems from "./OrderItems";

const order = {
  orderNumber: "DS24092201",
  paymentMethod: "Credit / Debit Card",
  total: 250,
};

export default function OrderSuccessPage() {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        pb-[125px]
        lg:pb-16
      "
    >
      <div
        className="
          mx-auto
          max-w-[1050px]
          px-3
          py-8
          sm:px-6
          sm:py-10
          lg:px-8
          lg:py-14
        "
      >
        <SuccessHero
          orderNumber={
            order.orderNumber
          }
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.25,
          }}
          className="
            mt-8
            grid
            gap-5
            lg:mt-10
            lg:grid-cols-2
          "
        >
          <div className="space-y-5">
            <OrderDetails
              orderNumber={
                order.orderNumber
              }
              paymentMethod={
                order.paymentMethod
              }
              total={order.total}
            />

            <DeliveryDetails />
          </div>

          <OrderItems />
        </motion.div>

        <p
          className="
            mx-auto
            mt-7
            max-w-[520px]
            text-center
            text-[9px]
            leading-5
            text-[var(--foreground)]/40
          "
        >
          A confirmation will also be sent
          to your registered email address.
          Keep your order number for
          reference.
        </p>
      </div>
    </main>
  );
}