import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

type Props = {
  orderNumber: string;
  date: string;
  status: string;
};

export default function OrderDetailsHeader({
  orderNumber,
  date,
  status,
}: Props) {
  return (
    <div className="mb-5 sm:mb-7">
      <Link
        href="/account/orders"
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
        Back to Orders
      </Link>

      <div
        className="
          mt-5
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div className="min-w-0">
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
            Order Details
          </p>

          <h1
            className="
              mt-1
              font-serif
              text-[25px]
              font-semibold
              leading-tight
              text-[var(--foreground)]
              sm:text-[32px]
            "
          >
            #{orderNumber}
          </h1>

          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5
              text-[8px]
              text-[var(--foreground)]/40
              sm:text-[9px]
            "
          >
            <CalendarDays size={12} />
            Placed on {date}
          </div>
        </div>

        <span
          className="
            mt-1
            shrink-0
            rounded-full
            bg-[var(--surface)]
            px-3
            py-1.5
            text-[8px]
            font-semibold
            text-[var(--primary)]
          "
        >
          {status}
        </span>
      </div>
    </div>
  );
}