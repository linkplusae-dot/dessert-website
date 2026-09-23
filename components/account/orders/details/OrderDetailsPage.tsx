"use client";

import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderStatus from "./OrderStatus";
import OrderProducts from "./OrderProducts";
import OrderDelivery from "./OrderDelivery";
import OrderPayment from "./OrderPayment";

type Props = {
  orderId: string;
};

const order = {
  id: "DS24092201",
  date: "22 Sep 2026",
  status: "Preparing",

  currentStep: 1,

  customer: {
    name: "Ahmed Daniyal",
    email: "ahmed@example.com",
    phone: "+971 50 000 0000",
  },

  address: {
    emirate: "Dubai",
    area: "Dubai Marina",
    street: "Al Marsa Street",
    building: "Marina Residence",
    apartment: "Apartment 804",
    landmark: "Near Marina Mall",
    instructions:
      "Please call when you arrive.",
  },

  products: [
    {
      id: 1,
      name: "Chocolate Dream Cake",
      image:
        "/images/products/chocolate-cake.webp",
      quantity: 1,
      price: 120,
      size: "Medium",
      message: "Happy Birthday!",
    },
    {
      id: 3,
      name: "Chocolate Brownies",
      image:
        "/images/products/brownies.webp",
      quantity: 2,
      price: 55,
      size: null,
      message: null,
    },
  ],

  subtotal: 230,
  deliveryFee: 20,
  total: 250,

  paymentMethod:
    "Credit / Debit Card",
};

export default function OrderDetailsPage({
  orderId,
}: Props) {
  // Temporary until database is connected.
  // orderId will be used to fetch the order later.
  const currentOrder = {
    ...order,
    id: orderId,
  };

  return (
    <section
      className="
        min-h-[70vh]
        bg-[var(--background)]
        pb-8
        lg:pb-14
      "
    >
      <div
        className="
          mx-auto
          max-w-[1050px]
          px-3
          py-4
          sm:px-6
          sm:py-7
          lg:px-8
          lg:py-10
        "
      >
        <OrderDetailsHeader
          orderNumber={
            currentOrder.id
          }
          date={currentOrder.date}
          status={
            currentOrder.status
          }
        />

        <div className="space-y-3 sm:space-y-5">
          <OrderStatus
            currentStep={
              currentOrder.currentStep
            }
          />

          <div
            className="
              grid
              gap-3
              sm:gap-5
              lg:grid-cols-[minmax(0,1fr)_360px]
              lg:items-start
            "
          >
            <div className="space-y-3 sm:space-y-5">
              <OrderProducts
                products={
                  currentOrder.products
                }
              />

              <OrderDelivery
                customer={
                  currentOrder.customer
                }
                address={
                  currentOrder.address
                }
              />
            </div>

            <div
              className="
                lg:sticky
                lg:top-6
              "
            >
              <OrderPayment
                subtotal={
                  currentOrder.subtotal
                }
                deliveryFee={
                  currentOrder.deliveryFee
                }
                total={
                  currentOrder.total
                }
                paymentMethod={
                  currentOrder.paymentMethod
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}