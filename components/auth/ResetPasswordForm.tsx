"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import { motion } from "framer-motion";

import AuthVisual from "./AuthVisual";

export default function ResetPasswordForm() {
  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    // Backend reset logic later
    setSuccess(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f5]">
      {/* Desktop */}
      <div
        className="
          hidden
          min-h-[calc(100vh-72px)]
          items-center
          justify-center
          px-8
          py-10
          lg:flex
          xl:px-12
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            relative
            h-[560px]
            w-full
            max-w-[1180px]
            overflow-hidden
            bg-white
            shadow-[0_18px_60px_rgba(45,32,32,0.12)]
            xl:h-[600px]
            xl:max-w-[1250px]
          "
        >
          <AuthVisual type="login" />

          <div
            className="
              relative
              z-10
              flex
              h-full
              w-[50%]
              items-center
              px-10
              xl:px-14
            "
          >
            <div className="w-full max-w-[410px]">
              {success ? (
                <SuccessContent desktop />
              ) : (
                <ResetContent
                  password={password}
                  confirmPassword={
                    confirmPassword
                  }
                  showPassword={
                    showPassword
                  }
                  showConfirmPassword={
                    showConfirmPassword
                  }
                  error={error}
                  setPassword={
                    setPassword
                  }
                  setConfirmPassword={
                    setConfirmPassword
                  }
                  setShowPassword={
                    setShowPassword
                  }
                  setShowConfirmPassword={
                    setShowConfirmPassword
                  }
                  handleSubmit={
                    handleSubmit
                  }
                  desktop
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="min-h-screen bg-[var(--white)] lg:hidden">
        <AuthVisual type="login" />

        <div
          className="
            relative
            z-20
            -mt-[38px]
            px-3
            pb-[125px]
            sm:px-5
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              mx-auto
              w-full
              max-w-[520px]
              rounded-[32px]
              bg-white
              px-5
              pb-8
              pt-7
              shadow-[0_18px_55px_rgba(45,32,32,0.07)]
              sm:px-8
            "
          >
            {success ? (
              <SuccessContent />
            ) : (
              <ResetContent
                password={password}
                confirmPassword={
                  confirmPassword
                }
                showPassword={
                  showPassword
                }
                showConfirmPassword={
                  showConfirmPassword
                }
                error={error}
                setPassword={
                  setPassword
                }
                setConfirmPassword={
                  setConfirmPassword
                }
                setShowPassword={
                  setShowPassword
                }
                setShowConfirmPassword={
                  setShowConfirmPassword
                }
                handleSubmit={
                  handleSubmit
                }
              />
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

type ResetContentProps = {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  error: string;

  setPassword: (
    value: string
  ) => void;

  setConfirmPassword: (
    value: string
  ) => void;

  setShowPassword: (
    value: boolean
  ) => void;

  setShowConfirmPassword: (
    value: boolean
  ) => void;

  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;

  desktop?: boolean;
};

function ResetContent({
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  error,
  setPassword,
  setConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  handleSubmit,
  desktop = false,
}: ResetContentProps) {
  return (
    <>
      <div
        className={
          desktop
            ? ""
            : "text-center"
        }
      >
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Account Security
        </p>

        <h1
          className={`
            mt-2
            font-serif
            font-semibold
            leading-none
            text-[var(--foreground)]
            ${
              desktop
                ? "text-[40px] xl:text-[44px]"
                : "text-[30px]"
            }
          `}
        >
          Reset Password
        </h1>

        <p
          className={`
            mt-4
            leading-5
            text-[var(--foreground)]/45
            ${
              desktop
                ? "max-w-[350px] text-[11px]"
                : "mx-auto max-w-[290px] text-[10px]"
            }
          `}
        >
          Create a new password for
          your account. Make sure it
          contains at least 8
          characters.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={
          desktop
            ? "mt-8 space-y-4"
            : "mt-7 space-y-3.5"
        }
      >
        {/* New Password */}
        <div className="relative">
          <LockKeyhole
            size={16}
            strokeWidth={1.6}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[var(--foreground)]/30
            "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="New Password"
            autoComplete="new-password"
            minLength={8}
            required
            className={`${inputClass} pr-12`}
          />

          <PasswordToggle
            show={showPassword}
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <LockKeyhole
            size={16}
            strokeWidth={1.6}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[var(--foreground)]/30
            "
          />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
            placeholder="Confirm New Password"
            autoComplete="new-password"
            minLength={8}
            required
            className={`${inputClass} pr-12`}
          />

          <PasswordToggle
            show={
              showConfirmPassword
            }
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          />
        </div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              px-1
              text-[9px]
              font-medium
              text-red-500
            "
          >
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          className={`
            flex
            items-center
            justify-center
            rounded-full
            bg-[var(--primary)]
            font-semibold
            text-white
            transition
            hover:opacity-90
            ${
              desktop
                ? "mx-auto mt-5 h-[46px] w-[190px] text-[11px]"
                : "mt-3 h-[52px] w-full text-[11px]"
            }
          `}
        >
          Reset Password
        </button>
      </form>

      <div
        className={
          desktop
            ? "mt-7 text-center"
            : "mt-7 text-center"
        }
      >
        <Link
          href="/login"
          className="
            text-[10px]
            font-semibold
            text-[var(--primary)]
            underline
            underline-offset-4
          "
        >
          Back to Login
        </Link>
      </div>

      {!desktop && (
        <p className="mt-4 text-center">
          <Link
            href="/products"
            className="text-[9px] text-[var(--foreground)]/40"
          >
            Continue shopping
          </Link>
        </p>
      )}
    </>
  );
}

function SuccessContent({
  desktop = false,
}: {
  desktop?: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className={
        desktop
          ? ""
          : "text-center"
      }
    >
      <div
        className={`
          flex
          h-[64px]
          w-[64px]
          items-center
          justify-center
          rounded-full
          bg-[var(--surface)]
          ${
            desktop
              ? ""
              : "mx-auto"
          }
        `}
      >
        <div
          className="
            flex
            h-[42px]
            w-[42px]
            items-center
            justify-center
            rounded-full
            bg-[var(--primary)]
            text-white
          "
        >
          <Check
            size={20}
            strokeWidth={2}
          />
        </div>
      </div>

      <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
        All Done
      </p>

      <h1
        className={`
          mt-2
          font-serif
          font-semibold
          leading-[1.05]
          text-[var(--foreground)]
          ${
            desktop
              ? "text-[40px] xl:text-[44px]"
              : "text-[30px]"
          }
        `}
      >
        Password Changed
      </h1>

      <p
        className={`
          mt-4
          leading-5
          text-[var(--foreground)]/45
          ${
            desktop
              ? "max-w-[350px] text-[11px]"
              : "mx-auto max-w-[280px] text-[10px]"
          }
        `}
      >
        Your password has been
        successfully updated. You can
        now log in using your new
        password.
      </p>

      <Link
        href="/login"
        className={`
          mt-7
          flex
          items-center
          justify-center
          rounded-full
          bg-[var(--primary)]
          font-semibold
          text-white
          transition
          hover:opacity-90
          ${
            desktop
              ? "h-[46px] w-[190px] text-[11px]"
              : "h-[52px] w-full text-[11px]"
          }
        `}
      >
        Continue to Login
      </Link>

      {!desktop && (
        <p className="mt-5">
          <Link
            href="/products"
            className="text-[9px] text-[var(--foreground)]/40"
          >
            Continue shopping
          </Link>
        </p>
      )}
    </motion.div>
  );
}

function PasswordToggle({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        show
          ? "Hide password"
          : "Show password"
      }
      className="
        absolute
        right-4
        top-1/2
        flex
        -translate-y-1/2
        items-center
        justify-center
        text-[var(--foreground)]/35
        transition
        hover:text-[var(--primary)]
      "
    >
      {show ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>
  );
}

const inputClass = `
  h-[50px]
  w-full
  rounded-[14px]
  border
  border-[var(--primary)]/12
  bg-[var(--background)]
  pl-11
  pr-4
  text-[10px]
  text-[var(--foreground)]
  outline-none
  transition
  placeholder:text-[var(--foreground)]/30
  focus:border-[var(--primary)]/45
  sm:h-[52px]
  sm:text-[11px]
  lg:h-[50px]
  lg:text-[11px]
`;