import Link from "next/link";
import {
  Check,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  orderNumber: string;
};

export default function SuccessHero({
  orderNumber,
}: Props) {
  return (
    <section className="text-center">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 14,
        }}
        className="
          mx-auto
          flex
          h-[76px]
          w-[76px]
          items-center
          justify-center
          rounded-full
          bg-[var(--primary)]
          text-white
          shadow-[0_12px_35px_rgba(122,70,80,0.22)]
          sm:h-[86px]
          sm:w-[86px]
        "
      >
        <Check
          size={36}
          strokeWidth={2}
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 14,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: 0.15,
        }}
      >
        <p
          className="
            mt-6
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-[var(--accent)]
          "
        >
          Order Confirmed
        </p>

        <h1
          className="
            mt-2
            font-serif
            text-[32px]
            font-semibold
            leading-tight
            text-[var(--foreground)]
            sm:text-[40px]
            lg:text-[46px]
          "
        >
          Thank You!
        </h1>

        <p
          className="
            mx-auto
            mt-3
            max-w-[470px]
            text-[10px]
            leading-5
            text-[var(--foreground)]/50
            sm:text-[11px]
          "
        >
          Your order has been successfully
          placed. We&apos;ll keep you updated
          as your desserts are prepared for
          delivery.
        </p>

        <div
          className="
            mx-auto
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[var(--surface)]
            px-4
            py-2.5
          "
        >
          <ShoppingBag
            size={13}
            className="text-[var(--primary)]"
          />

          <span
            className="
              text-[9px]
              text-[var(--foreground)]/45
            "
          >
            Order
          </span>

          <span
            className="
              text-[10px]
              font-semibold
              text-[var(--primary)]
            "
          >
            #{orderNumber}
          </span>
        </div>

        <div
          className="
            mt-6
            flex
            flex-col
            justify-center
            gap-2.5
            sm:flex-row
          "
        >
          <Link
            href="/account/orders"
            className="
              flex
              h-[46px]
              items-center
              justify-center
              rounded-full
              bg-[var(--primary)]
              px-7
              text-[10px]
              font-semibold
              text-white
              transition
              hover:opacity-90
            "
          >
            View My Order
          </Link>

          <Link
            href="/products"
            className="
              flex
              h-[46px]
              items-center
              justify-center
              rounded-full
              border
              border-[var(--primary)]/20
              bg-white
              px-7
              text-[10px]
              font-semibold
              text-[var(--primary)]
              transition
              hover:bg-[var(--surface)]
            "
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </section>
  );
}