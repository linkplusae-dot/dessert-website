"use client";

import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderCTA() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[var(--surface)]
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/images/cta/order-bg.png')",
      }}
    >
      {/* Light background overlay */}
      <div className="absolute inset-0 bg-[var(--surface)]/28" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[320px] max-w-[1440px] items-center justify-center px-5 py-12 lg:min-h-[400px] lg:px-10 lg:py-16 xl:px-12">
        <div className="mx-auto w-full max-w-[680px] text-center">
          {/* Label */}
          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.45,
            }}
            className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] lg:text-[11px]"
          >
            Made Fresh · Shared With Love
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.4,
            }}
            transition={{
              duration: 0.55,
              delay: 0.05,
            }}
            className="mt-3 font-serif text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] sm:text-[38px] lg:mt-4 lg:text-[52px]"
          >
            Your next{" "}
            <span className="italic text-[var(--primary)]">
              sweet
            </span>
            <br />
            moment starts here.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="mx-auto mt-4 max-w-[390px] text-[11px] leading-5 text-[var(--foreground)]/60 lg:mt-5 lg:text-[14px] lg:leading-6"
          >
            Handcrafted desserts made for the moments worth celebrating.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="mt-6 lg:mt-7"
          >
            <Link
              href="/products"
              className="
                inline-flex
                h-[44px]
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[var(--primary)]
                px-6
                text-[11px]
                font-semibold
                text-[var(--white)]
                shadow-sm
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:opacity-90
                lg:h-[50px]
                lg:px-7
                lg:text-[12px]
              "
            >
              Explore Desserts

              <ArrowRight
                size={15}
                strokeWidth={1.8}
              />
            </Link>
          </motion.div>

          {/* Decoration */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="mt-6 flex items-center justify-center gap-3 text-[var(--accent)] lg:mt-7"
          >
            <Heart
              size={11}
              strokeWidth={1.5}
            />

            <Sparkles
              size={12}
              strokeWidth={1.5}
            />

            <Heart
              size={11}
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}