"use client";

import {
  motion,
} from "framer-motion";

import AccountHeader from "./AccountHeader";
import AccountNavigation from "./AccountNavigation";
import ProfileInformation from "./ProfileInformation";
import SavedAddressPreview from "./SavedAddressPreview";

type Customer = {
  fullName: string;
  email: string;
  phone: string;
};

type Props = {
  customer: Customer;
};

export default function AccountPage({
  customer,
}: Props) {
  return (
    <section
      className="
        bg-[var(--background)]
        pb-8
        lg:pb-14
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          mx-auto
          max-w-[1180px]
          px-3
          py-4
          sm:px-6
          sm:py-6
          lg:px-8
          lg:py-9
        "
      >
        <AccountHeader
          name={
            customer.fullName
          }
          email={
            customer.email
          }
        />

        <div
          className="
            mt-3
            grid
            gap-3
            sm:mt-5
            sm:gap-5
            lg:grid-cols-[310px_minmax(0,1fr)]
          "
        >
          <AccountNavigation />

          <div
            className="
              space-y-3
              sm:space-y-5
            "
          >
            <ProfileInformation
              fullName={
                customer.fullName
              }
              email={
                customer.email
              }
              phone={
                customer.phone
              }
            />

            <SavedAddressPreview />
          </div>
        </div>
      </motion.div>
    </section>
  );
}