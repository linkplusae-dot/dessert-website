"use client";

import {
  useState,
} from "react";

import AccountInformation from "./AccountInformation";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccount from "./DeleteAccount";
import DeleteAccountModal from "./DeleteAccountModal";
import PasswordSecurity from "./PasswordSecurity";
import ProfileForm from "./ProfileForm";
import ProfileHeader from "./ProfileHeader";

type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
};

type Props = {
  customer: Customer;
};

export default function ProfilePage({
  customer,
}: Props) {
  const [
    changePasswordOpen,
    setChangePasswordOpen,
  ] = useState(false);

  const [
    deleteAccountOpen,
    setDeleteAccountOpen,
  ] = useState(false);

  return (
    <>
      <section
        className="
          min-h-[70vh]
          bg-[var(--background)]
          pb-8
          lg:pb-14
        "
      >
        <div
          className="
            mx-auto
            max-w-[850px]
            px-3
            py-4
            sm:px-6
            sm:py-7
            lg:px-8
            lg:py-10
          "
        >
          <ProfileHeader />

          <div
            className="
              mt-4
              space-y-3
              sm:mt-6
              sm:space-y-4
            "
          >
            <ProfileForm
              customer={customer}
            />

            <PasswordSecurity
              onChangePassword={() =>
                setChangePasswordOpen(true)
              }
            />

            <AccountInformation
              createdAt={customer.createdAt}
            />

            <DeleteAccount
              onDelete={() =>
                setDeleteAccountOpen(true)
              }
            />
          </div>
        </div>
      </section>

      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() =>
          setChangePasswordOpen(false)
        }
      />

      <DeleteAccountModal
        open={deleteAccountOpen}
        onClose={() =>
          setDeleteAccountOpen(false)
        }
      />
    </>
  );
}
