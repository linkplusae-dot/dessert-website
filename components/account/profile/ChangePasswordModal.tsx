"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  X,
} from "lucide-react";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({
  open,
  onClose,
}: Props) {
  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showCurrent,
    setShowCurrent,
  ] = useState(false);

  const [
    showNew,
    setShowNew,
  ] = useState(false);

  const [
    showConfirm,
    setShowConfirm,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setSuccess(false);

      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError(
        "New password must contain at least 8 characters."
      );

      return;
    }

    if (
      newPassword !== confirmPassword
    ) {
      setError(
        "New passwords do not match."
      );

      return;
    }

    // Connect change password API later.
    setSuccess(true);
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

      <form
        onSubmit={handleSubmit}
        className="
          relative
          z-10
          max-h-[92dvh]
          w-full
          overflow-y-auto
          rounded-t-[25px]
          bg-white
          p-4
          shadow-2xl
          sm:max-w-[480px]
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
                h-[38px]
                w-[38px]
                items-center
                justify-center
                rounded-full
                bg-[var(--surface)]
                text-[var(--primary)]
              "
            >
              <KeyRound size={15} />
            </div>

            <div>
              <p
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[var(--accent)]
                "
              >
                Security
              </p>

              <h2
                className="
                  font-serif
                  text-[20px]
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                Change Password
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
              shrink-0
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

        {success ? (
          <div
            className="
              py-8
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-[50px]
                w-[50px]
                items-center
                justify-center
                rounded-full
                bg-emerald-50
                text-emerald-600
              "
            >
              <CheckCircle2 size={21} />
            </div>

            <h3
              className="
                mt-4
                font-serif
                text-[20px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Password Updated
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-[300px]
                text-[8px]
                leading-5
                text-[var(--foreground)]/45
              "
            >
              Your password has been updated
              successfully.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="
                mt-5
                h-[42px]
                rounded-full
                bg-[var(--primary)]
                px-6
                text-[8px]
                font-semibold
                text-white
              "
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div
              className="
                mt-5
                space-y-4
              "
            >
              <PasswordField
                label="Current Password"
                value={currentPassword}
                show={showCurrent}
                onChange={
                  setCurrentPassword
                }
                onToggle={() =>
                  setShowCurrent(
                    (value) => !value
                  )
                }
              />

              <PasswordField
                label="New Password"
                value={newPassword}
                show={showNew}
                onChange={setNewPassword}
                onToggle={() =>
                  setShowNew(
                    (value) => !value
                  )
                }
              />

              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                show={showConfirm}
                onChange={
                  setConfirmPassword
                }
                onToggle={() =>
                  setShowConfirm(
                    (value) => !value
                  )
                }
              />
            </div>

            <p
              className="
                mt-3
                text-[7px]
                leading-4
                text-[var(--foreground)]/35
              "
            >
              Use at least 8 characters for
              your new password.
            </p>

            {error && (
              <div
                className="
                  mt-3
                  rounded-[12px]
                  bg-red-50
                  px-3
                  py-2.5
                  text-[8px]
                  text-red-600
                "
              >
                {error}
              </div>
            )}

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
                Cancel
              </button>

              <button
                type="submit"
                className="
                  h-[42px]
                  flex-1
                  rounded-full
                  bg-[var(--primary)]
                  text-[8px]
                  font-semibold
                  text-white
                "
              >
                Update Password
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function PasswordField({
  label,
  value,
  show,
  onChange,
  onToggle,
}: {
  label: string;
  value: string;
  show: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
}) {
  return (
    <label className="block">
      <span
        className="
          mb-2
          block
          text-[8px]
          font-semibold
          text-[var(--foreground)]/55
        "
      >
        {label}
      </span>

      <div className="relative">
        <input
          type={
            show
              ? "text"
              : "password"
          }
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          required
          className="
            h-[45px]
            w-full
            rounded-[13px]
            border
            border-[var(--primary)]/12
            bg-[var(--background)]
            px-4
            pr-11
            text-[10px]
            text-[var(--foreground)]
            outline-none
            transition
            focus:border-[var(--primary)]/40
            focus:bg-white
          "
        />

        <button
          type="button"
          onClick={onToggle}
          className="
            absolute
            right-1
            top-1/2
            flex
            h-[38px]
            w-[38px]
            -translate-y-1/2
            items-center
            justify-center
            text-[var(--foreground)]/35
          "
        >
          {show ? (
            <EyeOff size={14} />
          ) : (
            <Eye size={14} />
          )}
        </button>
      </div>
    </label>
  );
}