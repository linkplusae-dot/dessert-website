"use client";

import {
  AlertTriangle,
  Trash2,
} from "lucide-react";

type DeleteAccountProps = {
  onDelete: () => void;
};

export default function DeleteAccount({
  onDelete,
}: DeleteAccountProps) {
  return (
    <section
      className="
        rounded-[20px]
        border
        border-red-100
        bg-white
        p-4
        sm:rounded-[24px]
        sm:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-[36px]
              w-[36px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-600
            "
          >
            <AlertTriangle size={15} />
          </div>

          <div>
            <h2
              className="
                text-[10px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Delete Account
            </h2>

            <p
              className="
                mt-1
                max-w-[430px]
                text-[8px]
                leading-4
                text-[var(--foreground)]/40
              "
            >
              Permanently delete your account
              and associated customer data.
              This action cannot be undone.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="
            flex
            h-[40px]
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-red-200
            px-4
            text-[8px]
            font-semibold
            text-red-600
            transition
            hover:bg-red-50
          "
        >
          <Trash2 size={12} />

          Delete Account
        </button>
      </div>
    </section>
  );
}