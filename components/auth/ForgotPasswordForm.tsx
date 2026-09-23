"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

import AuthVisual from "./AuthVisual";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) return;

    // Backend reset-password email logic later
    setSent(true);
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
              {!sent ? (
                <ForgotContent
                  email={email}
                  setEmail={setEmail}
                  handleSubmit={handleSubmit}
                  desktop
                />
              ) : (
                <SuccessContent
                  email={email}
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
            {!sent ? (
              <ForgotContent
                email={email}
                setEmail={setEmail}
                handleSubmit={handleSubmit}
              />
            ) : (
              <SuccessContent
                email={email}
              />
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

type ForgotContentProps = {
  email: string;
  setEmail: (value: string) => void;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  desktop?: boolean;
};

function ForgotContent({
  email,
  setEmail,
  handleSubmit,
  desktop = false,
}: ForgotContentProps) {
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
          Account Recovery
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
          Forgot Password?
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
          Enter your email address and
          we&apos;ll send you a link to
          reset your password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={
          desktop
            ? "mt-8"
            : "mt-7"
        }
      >
        <div className="relative">
          <Mail
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
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Email Address"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className={`
            mt-5
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
                ? "mx-auto h-[46px] w-[190px] text-[11px]"
                : "h-[52px] w-full text-[11px]"
            }
          `}
        >
          Send Reset Link
        </button>
      </form>

      <div
        className={
          desktop
            ? "mt-7"
            : "mt-7 text-center"
        }
      >
        <Link
          href="/login"
          className="
            inline-flex
            items-center
            gap-2
            text-[10px]
            font-semibold
            text-[var(--primary)]
            transition
            hover:opacity-70
          "
        >
          <ArrowLeft size={14} />

          Back to Login
        </Link>
      </div>

      {!desktop && (
        <p className="mt-5 text-center">
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
  email,
  desktop = false,
}: {
  email: string;
  desktop?: boolean;
}) {
  return (
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
        duration: 0.35,
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
          h-[58px]
          w-[58px]
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
            h-[38px]
            w-[38px]
            items-center
            justify-center
            rounded-full
            bg-[var(--primary)]
            text-white
          "
        >
          <Check
            size={19}
            strokeWidth={2}
          />
        </div>
      </div>

      <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
        Check Your Email
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
        Reset link sent
      </h1>

      <p
        className={`
          mt-4
          leading-5
          text-[var(--foreground)]/45
          ${
            desktop
              ? "max-w-[360px] text-[11px]"
              : "mx-auto max-w-[300px] text-[10px]"
          }
        `}
      >
        If an account exists for{" "}
        <span className="font-semibold text-[var(--foreground)]/70">
          {email}
        </span>
        , you&apos;ll receive a password
        reset link shortly.
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
        Back to Login
      </Link>

      <button
        type="button"
        className="
          mt-5
          text-[9px]
          font-medium
          text-[var(--foreground)]/45
          underline
          underline-offset-4
          transition
          hover:text-[var(--primary)]
        "
        onClick={() => {
          window.location.reload();
        }}
      >
        Try another email
      </button>
    </motion.div>
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