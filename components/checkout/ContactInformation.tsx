import Link from "next/link";
import {
  Check,
  Edit3,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

import type { Customer } from "./checkout-types";

export default function ContactInformation({
  customer,
}: {
  customer: Customer;
}) {
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
      }}
      className={cardClass}
    >
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-[var(--primary)]/10
          pb-4
        "
      >
        <div
          className="
            flex
            h-[40px]
            w-[40px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <UserRound size={17} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                text-[8px]
                font-semibold
                tracking-[0.15em]
                text-[var(--accent)]
              "
            >
              01
            </span>

            <h2
              className="
                font-serif
                text-[20px]
                font-semibold
                text-[var(--foreground)]
                sm:text-[22px]
              "
            >
              Contact Information
            </h2>
          </div>

          <p
            className="
              mt-0.5
              text-[9px]
              text-[var(--foreground)]/40
            "
          >
            Your account details
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          grid
          gap-3
          md:grid-cols-3
        "
      >
        <CustomerDetail
          icon={<UserRound size={15} />}
          label="Full Name"
          value={customer.fullName}
        />

        <CustomerDetail
          icon={<Mail size={15} />}
          label="Email Address"
          value={customer.email}
        />

        <CustomerDetail
          icon={<Phone size={15} />}
          label="Mobile Number"
          value={customer.phone}
        />
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          rounded-[14px]
          bg-[var(--surface)]/60
          px-4
          py-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[9px]
            text-[var(--foreground)]/50
          "
        >
          <Check
            size={13}
            className="text-[var(--primary)]"
          />

          Signed-in account details
        </div>

        <Link
          href="/account"
          className="
            flex
            items-center
            gap-1.5
            text-[9px]
            font-semibold
            text-[var(--primary)]
          "
        >
          <Edit3 size={12} />
          Edit
        </Link>
      </div>
    </motion.section>
  );
}

function CustomerDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[15px]
        border
        border-[var(--primary)]/8
        bg-[var(--background)]
        px-3.5
        py-3
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-[var(--primary)]
        "
      >
        {icon}

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[var(--foreground)]/35
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          truncate
          text-[10px]
          font-medium
          text-[var(--foreground)]
        "
      >
        {value}
      </p>
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