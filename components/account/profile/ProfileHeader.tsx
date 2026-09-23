import Link from "next/link";

import {
  ArrowLeft,
  UserRound,
} from "lucide-react";

export default function ProfileHeader() {
  return (
    <div>
      <Link
        href="/account"
        className="
          inline-flex
          items-center
          gap-1.5
          text-[9px]
          font-semibold
          text-[var(--primary)]
        "
      >
        <ArrowLeft size={13} />

        Back to Account
      </Link>

      <div
        className="
          mt-5
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-[44px]
            w-[44px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
            sm:h-[48px]
            sm:w-[48px]
          "
        >
          <UserRound size={18} />
        </div>

        <div>
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[var(--accent)]
              sm:text-[8px]
            "
          >
            My Account
          </p>

          <h1
            className="
              mt-0.5
              font-serif
              text-[24px]
              font-semibold
              leading-tight
              text-[var(--foreground)]
              sm:text-[30px]
            "
          >
            Profile Information
          </h1>

          <p
            className="
              mt-1
              text-[8px]
              text-[var(--foreground)]/40
              sm:text-[9px]
            "
          >
            Manage your personal and account
            information.
          </p>
        </div>
      </div>
    </div>
  );
}