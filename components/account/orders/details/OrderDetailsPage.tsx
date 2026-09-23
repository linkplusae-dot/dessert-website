"use client";

import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderStatus from "./OrderStatus";
import OrderProducts from "./OrderProducts";
import OrderDelivery from "./OrderDelivery";
import OrderPayment from "./OrderPayment";

type Props = {
  order: { id: string; date: string; status: string; currentStep: number; customer: { name: string; phone: string }; address: { emirate: string; area: string; street: string; building: string; apartment: string; instructions: string }; products: { id: string; name: string; image: string; quantity: number; price: number; size: string | null; message: string | null }[]; subtotal: number; deliveryFee: number; total: number; paymentMethod: string; paymentStatus: string };
};

export default function OrderDetailsPage({ order: currentOrder }: Props) {

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
          date={new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(currentOrder.date))}
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
                  { ...currentOrder.customer, email: "" }
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
                paymentStatus={currentOrder.paymentStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
