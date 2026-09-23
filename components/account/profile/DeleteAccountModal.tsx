"use client";

import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DeleteAccountModal({
  open,
  onClose,
}: Props) {
  const [
    confirmation,
    setConfirmation,
  ] = useState("");

  useEffect(() => {
    if (!open) {
      setConfirmation("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const canDelete =
    confirmation === "DELETE";

  function handleDelete() {
    if (!canDelete) {
      return;
    }

    // Connect account deletion API later.
    console.log("Delete account");
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        flex
        items-end
        justify-center
        bg-black/35
        px-3
        pt-6
        sm:items-center
        sm:p-5
      "
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0"
      />

      <div
        className="
          relative
          z-10
          w-full
          rounded-t-[25px]
          bg-white
          p-4
          shadow-2xl
          sm:max-w-[460px]
          sm:rounded-[25px]
          sm:p-6
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-[40px]
                w-[40px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-red-600
              "
            >
              <AlertTriangle size={17} />
            </div>

            <div>
              <p
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-red-400
                "
              >
                Important
              </p>

              <h2
                className="
                  font-serif
                  text-[20px]
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                Delete Account?
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              rounded-full
              bg-[var(--surface)]
              text-[var(--primary)]
            "
          >
            <X size={14} />
          </button>
        </div>

        <p
          className="
            mt-5
            text-[8px]
            leading-5
            text-[var(--foreground)]/50
          "
        >
          Deleting your account is permanent.
          Your profile and saved addresses will
          be removed according to the
          application&apos;s account deletion
          policy.
        </p>

        <div
          className="
            mt-4
            rounded-[13px]
            bg-red-50
            px-3
            py-3
          "
        >
          <p
            className="
              text-[8px]
              leading-4
              text-red-700
            "
          >
            Type{" "}
            <strong>DELETE</strong>{" "}
            below to confirm.
          </p>
        </div>

        <input
          type="text"
          value={confirmation}
          onChange={(event) =>
            setConfirmation(
              event.target.value
            )
          }
          placeholder="Type DELETE"
          className="
            mt-4
            h-[45px]
            w-full
            rounded-[13px]
            border
            border-red-100
            bg-[var(--background)]
            px-4
            text-[10px]
            text-[var(--foreground)]
            outline-none
            transition
            focus:border-red-300
          "
        />

        <div
          className="
            mt-5
            flex
            gap-2
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-[42px]
              flex-1
              rounded-full
              border
              border-[var(--primary)]/15
              text-[8px]
              font-semibold
              text-[var(--primary)]
            "
          >
            Keep Account
          </button>

          <button
            type="button"
            disabled={!canDelete}
            onClick={handleDelete}
            className="
              flex
              h-[42px]
              flex-1
              items-center
              justify-center
              gap-2
              rounded-full
              bg-red-600
              text-[8px]
              font-semibold
              text-white
              transition
              disabled:cursor-not-allowed
              disabled:opacity-35
            "
          >
            <Trash2 size={12} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}