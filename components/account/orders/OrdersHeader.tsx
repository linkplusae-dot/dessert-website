import Link from "next/link";

import {
  ArrowLeft,
  Package,
} from "lucide-react";

type Props = {
  orderCount: number;
};

export default function OrdersHeader({
  orderCount,
}: Props) {
  return (
    <div className="mb-5 sm:mb-7">
      <Link
        href="/account"
        className="
          inline-flex
          items-center
          gap-1.5
          text-[9px]
          font-semibold
          text-[var(--primary)]
        "
      >
        <ArrowLeft size={13} />
        Back to Account
      </Link>

      <div
        className="
          mt-5
          flex
          items-end
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[var(--accent)]
              sm:text-[8px]
            "
          >
            My Account
          </p>

          <h1
            className="
              mt-1
              font-serif
              text-[26px]
              font-semibold
              leading-tight
              text-[var(--foreground)]
              sm:text-[32px]
            "
          >
            My Orders
          </h1>

          <p
            className="
              mt-2
              text-[9px]
              text-[var(--foreground)]/45
              sm:text-[10px]
            "
          >
            View your orders and delivery
            status.
          </p>
        </div>

        <div
          className="
            hidden
            h-[42px]
            items-center
            gap-2
            rounded-full
            bg-[var(--surface)]
            px-4
            text-[var(--primary)]
            sm:flex
          "
        >
          <Package size={14} />

          <span className="text-[9px] font-semibold">
            {orderCount}{" "}
            {orderCount === 1
              ? "Order"
              : "Orders"}
          </span>
        </div>
      </div>
    </div>
  );
}