"use client";

import {
  Check,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

type CartToastProps = {
  show: boolean;
  productName: string;
  onClose: () => void;
};

export default function CartToast({
  show,
  productName,
  onClose,
}: CartToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -12,
            scale: 0.96,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            fixed
            left-1/2
            top-4
            z-[100]
            w-[calc(100%-32px)]
            max-w-[380px]
            -translate-x-1/2
            rounded-[16px]
            border
            border-[var(--primary)]/10
            bg-[var(--white)]
            p-3
            shadow-[0_12px_40px_rgba(45,32,32,0.16)]
            sm:top-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[var(--primary)]
                text-[var(--white)]
              "
            >
              <Check
                size={17}
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-[var(--foreground)]">
                Added to cart
              </p>

              <p className="mt-0.5 truncate text-[9px] text-[var(--foreground)]/55">
                {productName}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close notification"
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[var(--foreground)]/40
                transition
                hover:bg-[var(--surface)]
                hover:text-[var(--foreground)]
              "
            >
              <X
                size={15}
                strokeWidth={1.8}
              />
            </button>
          </div>

          <motion.div
            initial={{
              width: "100%",
            }}
            animate={{
              width: "0%",
            }}
            transition={{
              duration: 2.5,
              ease: "linear",
            }}
            className="absolute bottom-0 left-0 h-[2px] bg-[var(--primary)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}