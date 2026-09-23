"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

import AuthVisual from "./AuthVisual";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") ||
    "/account";

  const signupUrl =
    callbackUrl !== "/account"
      ? `/signup?callbackUrl=${encodeURIComponent(
          callbackUrl
        )}`
      : "/signup";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [remember, setRemember] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const result = await signIn(
        "credentials",
        {
          email: email
            .trim()
            .toLowerCase(),
          password,
          redirect: false,
        }
      );

      if (!result || result.error) {
        setError(
          "Incorrect email or password."
        );
        return;
      }

      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to log in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Desktop */}
      <div
        className="
          hidden
          min-h-[calc(100vh-72px)]
          items-center
          justify-center
          px-8
          py-6
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
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                Welcome Back
              </p>

              <h1 className="mt-2 font-serif text-[40px] font-semibold leading-none text-[var(--foreground)] xl:text-[44px]">
                Login
              </h1>

              <p className="mt-3 text-[11px] text-[var(--foreground)]/45">
                Don&apos;t have an
                account?{" "}
                <Link
                  href={signupUrl}
                  className="font-semibold text-[var(--primary)]"
                >
                  Create your account
                </Link>
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >
                <InputWrapper>
                  <Mail
                    size={16}
                    strokeWidth={1.6}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(
                        event.target.value
                      );

                      if (error) {
                        setError("");
                      }
                    }}
                    placeholder="Email Address"
                    autoComplete="email"
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </InputWrapper>

                <InputWrapper>
                  <LockKeyhole
                    size={16}
                    strokeWidth={1.6}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(
                        event.target.value
                      );

                      if (error) {
                        setError("");
                      }
                    }}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    disabled={isSubmitting}
                    className={`${inputClass} pr-12`}
                  />

                  <PasswordToggle
                    show={showPassword}
                    disabled={isSubmitting}
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                  />
                </InputWrapper>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      disabled={
                        isSubmitting
                      }
                      onChange={(event) =>
                        setRemember(
                          event.target
                            .checked
                        )
                      }
                      className="sr-only"
                    />

                    <Checkbox
                      checked={remember}
                    />

                    <span className="text-[10px] text-[var(--foreground)]/50">
                      Remember me
                    </span>
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-semibold text-[var(--primary)]"
                  >
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <ErrorMessage
                    message={error}
                  />
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    mx-auto
                    mt-5
                    flex
                    h-[46px]
                    w-[170px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    text-[11px]
                    font-semibold
                    text-white
                    transition
                    hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isSubmitting
                    ? "LOGGING IN..."
                    : "LOGIN"}
                </button>
              </form>

              <Divider />

              <GoogleButton
                text="Continue with Google"
              />
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
              bg-[var(--white)]
              px-5
              pb-8
              pt-7
              shadow-[0_18px_55px_rgba(45,32,32,0.07)]
              sm:px-8
            "
          >
            <div className="text-center">
              <h1 className="font-serif text-[30px] font-semibold leading-none text-[var(--foreground)]">
                Log in
              </h1>

              <p className="mt-3 text-[11px] leading-5 text-[var(--foreground)]/45">
                Welcome back. Log in to
                continue your order.
              </p>
            </div>

            <GoogleButton
              text="Continue with Google"
            />

            <Divider />

            <form
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              <InputWrapper>
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(
                      event.target.value
                    );

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </InputWrapper>

              <InputWrapper>
                <LockKeyhole
                  size={16}
                  strokeWidth={1.6}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) => {
                    setPassword(
                      event.target.value
                    );

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  disabled={isSubmitting}
                  className={`${inputClass} pr-12`}
                />

                <PasswordToggle
                  show={showPassword}
                  disabled={isSubmitting}
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                />
              </InputWrapper>

              <div className="flex items-center justify-between gap-3 px-1 pt-1">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setRemember(
                        event.target
                          .checked
                      )
                    }
                    className="sr-only"
                  />

                  <Checkbox
                    checked={remember}
                  />

                  <span className="text-[9px] text-[var(--foreground)]/50 sm:text-[10px]">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-[9px] font-semibold text-[var(--primary)] sm:text-[10px]"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <ErrorMessage
                  message={error}
                />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={primaryButtonClass}
              >
                {isSubmitting
                  ? "Logging in..."
                  : "Log In"}
              </button>
            </form>

            <p className="mt-7 text-center text-[10px] text-[var(--foreground)]/50 sm:text-[11px]">
              Don&apos;t have an
              account?{" "}
              <Link
                href={signupUrl}
                className="font-semibold text-[var(--primary)] underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>

            <p className="mt-4 text-center">
              <Link
                href="/products"
                className="text-[9px] text-[var(--foreground)]/40"
              >
                Continue shopping
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function InputWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}

function PasswordToggle({
  show,
  onClick,
  disabled,
}: {
  show: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        show
          ? "Hide password"
          : "Show password"
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/35 disabled:cursor-not-allowed"
    >
      {show ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>
  );
}

function Checkbox({
  checked,
}: {
  checked: boolean;
}) {
  return (
    <span
      className={`
        flex
        h-[18px]
        w-[18px]
        shrink-0
        items-center
        justify-center
        rounded-[5px]
        border
        ${
          checked
            ? "border-[var(--primary)] bg-[var(--primary)]"
            : "border-[var(--primary)]/25 bg-white"
        }
      `}
    >
      {checked && (
        <span className="text-[10px] font-bold text-white">
          ✓
        </span>
      )}
    </span>
  );
}

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -4,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-[12px] bg-red-50 px-3 py-2.5 text-center text-[10px] font-medium text-red-600"
    >
      {message}
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="my-5 flex items-center gap-4">
      <span className="h-px flex-1 bg-[var(--primary)]/10" />

      <span className="text-[9px] text-[var(--foreground)]/30">
        or
      </span>

      <span className="h-px flex-1 bg-[var(--primary)]/10" />
    </div>
  );
}

function GoogleButton({
  text,
}: {
  text: string;
}) {
  return (
    <button
      type="button"
      disabled
      title="Google login will be available soon"
      className="
        flex
        h-[50px]
        w-full
        cursor-not-allowed
        items-center
        justify-center
        gap-3
        rounded-full
        border
        border-[var(--primary)]/15
        bg-white
        text-[10px]
        font-semibold
        text-[var(--foreground)]
        opacity-60
        sm:h-[52px]
        lg:text-[11px]
      "
    >
      <GoogleIcon />
      {text}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.86A6.01 6.01 0 0 1 6.08 12c0-.65.11-1.28.31-1.86V7.52H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.48l3.35-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.01c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.96 3.01 14.7 2 12 2a10 10 0 0 0-8.96 5.52l3.35 2.62C7.18 7.77 9.39 6.01 12 6.01Z"
      />
    </svg>
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
  disabled:cursor-not-allowed
  disabled:opacity-60
  sm:h-[52px]
  sm:text-[11px]
  lg:h-[50px]
  lg:text-[11px]
`;

const primaryButtonClass = `
  mt-2
  flex
  h-[52px]
  w-full
  items-center
  justify-center
  rounded-full
  bg-[var(--primary)]
  text-[11px]
  font-semibold
  text-white
  transition
  hover:opacity-90
  disabled:cursor-not-allowed
  disabled:opacity-60
`;