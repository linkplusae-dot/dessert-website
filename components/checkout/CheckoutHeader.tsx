import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutHeader() {
  return (
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
          py-6
          sm:px-6
          lg:px-8
          lg:py-8
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
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[var(--accent)]
              sm:text-[9px]
            "
          >
            Almost There
          </p>

          <div
            className="
              mt-2
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <h1
                className="
                  font-serif
                  text-[30px]
                  font-semibold
                  leading-none
                  text-[var(--foreground)]
                  sm:text-[34px]
                  lg:text-[42px]
                "
              >
                Checkout
              </h1>

              <p
                className="
                  mt-3
                  max-w-[500px]
                  text-[10px]
                  leading-5
                  text-[var(--foreground)]/45
                  sm:text-[11px]
                "
              >
                Confirm your details and
                tell us where to deliver
                your order.
              </p>
            </div>

            <Link
              href="/cart"
              className="
                hidden
                text-[10px]
                font-semibold
                text-[var(--primary)]
                underline
                underline-offset-4
                sm:block
              "
            >
              Back to Cart
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}