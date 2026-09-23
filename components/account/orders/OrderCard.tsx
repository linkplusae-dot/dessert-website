import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Package,
} from "lucide-react";

import type {
  CustomerOrder,
  OrderStatus,
} from "./orders-data";

type Props = {
  order: CustomerOrder;
};

export default function OrderCard({
  order,
}: Props) {
  return (
    <article
      className="
        overflow-hidden
        rounded-[20px]
        border
        border-[var(--primary)]/8
        bg-white
        shadow-[0_8px_30px_rgba(45,32,32,0.035)]
        sm:rounded-[24px]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
          border-b
          border-[var(--primary)]/8
          px-4
          py-3.5
          sm:px-5
          sm:py-4
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[var(--foreground)]/35
            "
          >
            Order Number
          </p>

          <p
            className="
              mt-1
              text-[10px]
              font-semibold
              text-[var(--foreground)]
              sm:text-[11px]
            "
          >
            #{order.id}
          </p>

          <div
            className="
              mt-1.5
              flex
              items-center
              gap-1.5
              text-[8px]
              text-[var(--foreground)]/40
            "
          >
            <CalendarDays size={11} />
            {order.date}
          </div>
        </div>

        <StatusBadge
          status={order.status}
        />
      </div>

      {/* Products */}
      <div
        className="
          space-y-3
          px-4
          py-4
          sm:px-5
        "
      >
        {order.items.map((item) => (
          <div
            key={item.id}
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                relative
                h-[54px]
                w-[54px]
                shrink-0
                overflow-hidden
                rounded-[12px]
                bg-[var(--surface)]
                sm:h-[60px]
                sm:w-[60px]
              "
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="60px"
                className="object-cover"
              />

              {item.quantity > 1 && (
                <span
                  className="
                    absolute
                    right-1
                    top-1
                    flex
                    h-[17px]
                    min-w-[17px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    px-1
                    text-[7px]
                    font-bold
                    text-white
                  "
                >
                  {item.quantity}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate
                  text-[9px]
                  font-semibold
                  text-[var(--foreground)]
                  sm:text-[10px]
                "
              >
                {item.name}
              </p>

              <p
                className="
                  mt-1
                  text-[7px]
                  text-[var(--foreground)]/40
                "
              >
                Qty: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-[var(--primary)]/8
          bg-[var(--background)]/60
          px-4
          py-3.5
          sm:px-5
        "
      >
        <div>
          <p
            className="
              text-[7px]
              uppercase
              tracking-[0.1em]
              text-[var(--foreground)]/35
            "
          >
            Total
          </p>

          <p
            className="
              mt-0.5
              font-serif
              text-[17px]
              font-semibold
              text-[var(--primary)]
            "
          >
            AED {order.total.toFixed(2)}
          </p>
        </div>

        <Link
          href={`/account/orders/${order.id}`}
          className="
            flex
            h-[38px]
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[var(--primary)]
            px-4
            text-[8px]
            font-semibold
            text-white
            transition
            hover:opacity-90
          "
        >
          View Order
          <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  return (
    <span
      className={`
        inline-flex
        shrink-0
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1.5
        text-[7px]
        font-semibold

        ${getStatusClass(status)}
      `}
    >
      <span
        className="
          h-[5px]
          w-[5px]
          rounded-full
          bg-current
        "
      />

      {status}
    </span>
  );
}

function getStatusClass(
  status: OrderStatus
) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-50 text-emerald-700";

    case "Cancelled":
      return "bg-red-50 text-red-600";

    case "Out for Delivery":
      return "bg-blue-50 text-blue-600";

    case "Preparing":
      return "bg-amber-50 text-amber-700";

    default:
      return "bg-[var(--surface)] text-[var(--primary)]";
  }
}