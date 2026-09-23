"use client";

import {
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  name: string;
  email: string;
};

export default function AccountHeader({
  name,
  email,
}: Props) {
  const initial =
    name.trim().charAt(0).toUpperCase() || "U";

  return (
    <motion.section
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
      className="
        rounded-[20px]
        bg-[var(--primary)]
        px-4
        py-4
        text-white
        sm:rounded-[24px]
        sm:p-6
        lg:p-8
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-4
        "
      >
        {/* Avatar */}
        <div
          className="
            flex
            h-[48px]
            w-[48px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/15
            text-[18px]
            font-semibold
            sm:h-[60px]
            sm:w-[60px]
            sm:text-[21px]
            lg:h-[66px]
            lg:w-[66px]
          "
        >
          {initial}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white/60
              sm:text-[8px]
            "
          >
            My Account
          </p>

          <h1
            className="
              mt-1
              truncate
              font-serif
              text-[19px]
              font-semibold
              leading-tight
              text-white
              sm:text-[25px]
              lg:text-[30px]
            "
            title={name}
          >
            {name}
          </h1>

          <p
            className="
              mt-1
              truncate
              text-[8px]
              text-white/65
              sm:text-[9px]
              lg:text-[10px]
            "
          >
            {email}
          </p>
        </div>

        {/* Logout */}
        <button
          type="button"
          aria-label="Log out"
          className="
            flex
            h-[36px]
            w-[36px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-white
            transition
            hover:bg-white/20
            sm:h-[40px]
            sm:w-[40px]
          "
        >
          <LogOut
            size={15}
            className="sm:h-4 sm:w-4"
          />
        </button>
      </div>
    </motion.section>
  );
}