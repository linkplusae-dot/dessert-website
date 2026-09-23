import Link from "next/link";

import {
  ArrowLeft,
  Plus,
} from "lucide-react";

type Props = {
  onAdd: () => void;
};

export default function AddressesHeader({
  onAdd,
}: Props) {
  return (
    <div className="mb-5">
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
          items-end
          justify-between
          gap-4
        "
      >
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
            Delivery
          </p>

          <h1
            className="
              mt-1
              font-serif
              text-[26px]
              font-semibold
              text-[var(--foreground)]
              sm:text-[32px]
            "
          >
            Saved Addresses
          </h1>

          <p
            className="
              mt-2
              text-[9px]
              text-[var(--foreground)]/45
            "
          >
            Manage your delivery addresses.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="
            hidden
            h-[42px]
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[var(--primary)]
            px-5
            text-[9px]
            font-semibold
            text-white
            transition
            hover:opacity-90
            sm:flex
          "
        >
          <Plus size={14} />
          Add Address
        </button>
      </div>

      {/* Mobile */}
      <button
        type="button"
        onClick={onAdd}
        className="
          mt-4
          flex
          h-[44px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-full
          bg-[var(--primary)]
          text-[9px]
          font-semibold
          text-white
          sm:hidden
        "
      >
        <Plus size={14} />
        Add New Address
      </button>
    </div>
  );
}