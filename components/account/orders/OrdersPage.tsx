"use client";

import {
  Package,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import OrderCard from "./OrderCard";
import OrdersHeader from "./OrdersHeader";

import { type CustomerOrder, type OrderStatus } from "./orders-data";

type Filter =
  | "All"
  | OrderStatus;

const filters: Filter[] = [
  "All",
  "Awaiting Payment",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export default function OrdersPage({ orders }: { orders: CustomerOrder[] }) {
  const [
    filter,
    setFilter,
  ] = useState<Filter>("All");

  const filteredOrders =
    useMemo(() => {
      if (filter === "All") {
        return orders;
      }

      return orders.filter(
        (order) =>
          order.status === filter
      );
    }, [filter, orders]);

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
          max-w-[950px]
          px-3
          py-4
          sm:px-6
          sm:py-7
          lg:px-8
          lg:py-10
        "
      >
        <OrdersHeader
          orderCount={orders.length}
        />

        {/* Filters */}
        <div
          className="
            -mx-3
            mb-4
            overflow-x-auto
            px-3
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:mx-0
            sm:px-0
          "
        >
          <div
            className="
              flex
              w-max
              gap-2
            "
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setFilter(item)
                }
                className={`
                  h-[34px]
                  whitespace-nowrap
                  rounded-full
                  px-3.5
                  text-[8px]
                  font-semibold
                  transition

                  ${
                    filter === item
                      ? `
                        bg-[var(--primary)]
                        text-white
                      `
                      : `
                        border
                        border-[var(--primary)]/10
                        bg-white
                        text-[var(--foreground)]/50
                      `
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div
            className="
              grid
              gap-3
              md:grid-cols-2
              md:gap-4
            "
          >
            {filteredOrders.map(
              (order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              )
            )}
          </div>
        ) : (
          <EmptyOrders />
        )}
      </div>
    </section>
  );
}

function EmptyOrders() {
  return (
    <div
      className="
        rounded-[22px]
        border
        border-[var(--primary)]/8
        bg-white
        px-5
        py-12
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[52px]
          w-[52px]
          items-center
          justify-center
          rounded-full
          bg-[var(--surface)]
          text-[var(--primary)]
        "
      >
        <Package size={20} />
      </div>

      <h2
        className="
          mt-4
          font-serif
          text-[20px]
          font-semibold
          text-[var(--foreground)]
        "
      >
        No orders here
      </h2>

      <p
        className="
          mx-auto
          mt-2
          max-w-[280px]
          text-[9px]
          leading-5
          text-[var(--foreground)]/40
        "
      >
            No orders yet. Your purchases will appear here.
      </p>

      <Link
        href="/products"
        className="
          mx-auto
          mt-5
          flex
          h-[42px]
          w-fit
          items-center
          gap-2
          rounded-full
          bg-[var(--primary)]
          px-5
          text-[9px]
          font-semibold
          text-white
        "
      >
        <ShoppingBag size={13} />
        Explore Desserts
      </Link>
    </div>
  );
}
