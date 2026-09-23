"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  Home,
  UserRound,
  ShoppingCart,
  Phone,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import ConnectMenu from "./ConnectMenu";

export default function MobileBottomNav() {
  const [connectOpen, setConnectOpen] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setConnectOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const itemClass = `
    flex
    min-h-[64px]
    flex-col
    items-center
    justify-center
    gap-1
    text-white/90
  `;

  return (
    <div
      ref={wrapperRef}
      className="
        fixed
        inset-x-0
        bottom-0
        z-50
        lg:hidden
      "
    >
      <div className="relative">

        {/* CONNECT POPUP */}
        <ConnectMenu
          open={connectOpen}
        />

        {/* NAV */}
        <nav
          className="
            grid
            grid-cols-4
            items-center
            border-t
            border-white/20
            bg-gradient-to-r
            from-[#D98796]
            via-[#A95D69]
            to-[#7A4650]
            px-2
            pt-2
            pb-[max(8px,env(safe-area-inset-bottom))]
            shadow-[0_-10px_35px_rgba(74,35,41,0.16)]
          "
        >

          {/* HOME */}
          <Link
            href="/"
            className={itemClass}
          >
            <motion.span
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#B85F70]
              "
            >
              <Home
                size={20}
                strokeWidth={2}
              />
            </motion.span>

            <span className="text-[11px] font-medium">
              Home
            </span>
          </Link>

          {/* ACCOUNT */}
          <Link
            href="/account"
            className={itemClass}
          >
            <motion.div
              whileTap={{
                scale: 0.9,
              }}
            >
              <UserRound
                size={25}
                strokeWidth={1.6}
              />
            </motion.div>

            <span className="text-[11px]">
              Account
            </span>
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className={itemClass}
          >
            <motion.div
              whileTap={{
                scale: 0.9,
              }}
              className="relative"
            >
              <ShoppingCart
                size={25}
                strokeWidth={1.6}
              />

              <span
                className="
                  absolute
                  -right-3
                  -top-2
                  flex
                  h-[18px]
                  min-w-[18px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#2D2020]
                  px-1
                  text-[9px]
                  text-white
                "
              >
                0
              </span>
            </motion.div>

            <span className="text-[11px]">
              Cart
            </span>
          </Link>

          {/* CONNECT */}
          <motion.button
            type="button"
            onClick={() =>
              setConnectOpen(
                (prev) => !prev
              )
            }
            whileTap={{
              scale: 0.9,
            }}
            aria-expanded={
              connectOpen
            }
            aria-label={
              connectOpen
                ? "Close contact options"
                : "Open contact options"
            }
            className={itemClass}
          >
            <motion.div
              animate={{
                rotate:
                  connectOpen
                    ? -12
                    : 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                transition-colors
                duration-200
                ${
                  connectOpen
                    ? "bg-white text-[#7A4650]"
                    : "bg-transparent text-white"
                }
              `}
            >
              <Phone
                size={24}
                strokeWidth={1.8}
              />
            </motion.div>

            <span className="text-[11px] font-medium">
              Connect
            </span>
          </motion.button>

        </nav>
      </div>
    </div>
  );
}