import Image from "next/image";
import {
  Home,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

import type { CartItem } from "./checkout-types";

type Props = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  hasEmirate: boolean;
  items: CartItem[];
  isSubmitting: boolean;
};

export default function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  hasEmirate,
  items,
  isSubmitting,
}: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.1,
      }}
      className={cardClass}
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--primary)]/10
          pb-4
        "
      >
        <div>
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[var(--accent)]
            "
          >
            Your Order
          </p>

          <h2
            className="
              mt-1
              font-serif
              text-[24px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            Order Summary
          </h2>
        </div>

        <div
          className="
            flex
            h-[38px]
            w-[38px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <ShoppingBag size={17} />
        </div>
      </div>

      <div
        className="
          divide-y
          divide-[var(--primary)]/8
        "
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 py-4"
          >
            <div
              className="
                relative
                h-[72px]
                w-[72px]
                shrink-0
                overflow-hidden
                rounded-[14px]
                bg-[var(--surface)]
              "
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="72px"
                className="object-cover"
              />

              <span
                className="
                  absolute
                  right-1
                  top-1
                  flex
                  h-[19px]
                  min-w-[19px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  px-1
                  text-[8px]
                  font-bold
                  text-white
                "
              >
                {item.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-[var(--accent)]
                "
              >
                {item.category}
              </p>

              <h3
                className="
                  mt-1
                  text-[11px]
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                {item.name}
              </h3>

                {item.size && (
                <p
                  className="
                    mt-1
                    text-[9px]
                    text-[var(--foreground)]/45
                  "
                >
                  Size: {item.size}
                </p>
              )}

              {item.message && (
                <p
                  className="
                    mt-0.5
                    truncate
                    text-[9px]
                    text-[var(--foreground)]/45
                  "
                >
                  Message: &quot;
                  {item.message}&quot;
                </p>
              )}
            </div>

            <p
              className="
                shrink-0
                pt-1
                text-[11px]
                font-semibold
                text-[var(--primary)]
              "
            >
              AED{" "}
              {(
                item.price *
                item.quantity
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div
        className="
          space-y-3
          border-t
          border-[var(--primary)]/10
          pt-4
        "
      >
        <SummaryRow
          label="Subtotal"
          value={`AED ${subtotal.toFixed(
            2
          )}`}
        />

        <SummaryRow
          label="Delivery"
          value={
            hasEmirate
              ? `AED ${deliveryFee.toFixed(
                  2
                )}`
              : "Calculated after address"
          }
        />

        <div
          className="
            border-t
            border-dashed
            border-[var(--primary)]/15
          "
        />

        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-[12px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Total
            </p>

            <p
              className="
                mt-0.5
                text-[8px]
                text-[var(--foreground)]/35
              "
            >
              VAT included where applicable
            </p>
          </div>

          <p
            className="
              font-serif
              text-[23px]
              font-semibold
              text-[var(--primary)]
            "
          >
            AED {total.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !hasEmirate || !items.length}
        className="
          mt-6
          flex
          h-[52px]
          w-full
          items-center
          justify-center
          rounded-full
          bg-[var(--primary)]
          text-[11px]
          font-semibold
          text-white
          transition
          hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        {isSubmitting ? "Preparing Order..." : "Continue to Payment"}
      </button>

      <div
        className="
          mt-4
          flex
          items-start
          gap-2
          rounded-[13px]
          bg-[var(--surface)]/65
          px-3
          py-3
        "
      >
        <Home
          size={13}
          className="
            mt-[1px]
            shrink-0
            text-[var(--primary)]
          "
        />

        <p
          className="
            text-[8px]
            leading-4
            text-[var(--foreground)]/45
          "
        >
          Please make sure your delivery
          address and contact number are
          correct before continuing.
        </p>
      </div>
    </motion.section>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <span
        className="
          text-[10px]
          text-[var(--foreground)]/50
        "
      >
        {label}
      </span>

      <span
        className="
          text-right
          text-[10px]
          font-semibold
          text-[var(--foreground)]
        "
      >
        {value}
      </span>
    </div>
  );
}

const cardClass = `
  rounded-[22px]
  border
  border-[var(--primary)]/8
  bg-white
  p-4
  shadow-[0_10px_40px_rgba(45,32,32,0.04)]
  sm:rounded-[26px]
  sm:p-6
  lg:p-7
`;
