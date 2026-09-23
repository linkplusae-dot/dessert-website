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
  Phone,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

import AuthVisual from "./AuthVisual";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") ||
    "/account";

  const loginUrl =
    callbackUrl !== "/account"
      ? `/login?callbackUrl=${encodeURIComponent(
          callbackUrl
        )}`
      : "/login";

  const [form, setForm] =
    useState<FormState>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [agreed, setAgreed] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const updateField = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    if (!agreed) {
      setError(
        "Please accept the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (form.password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response =
        await fetch(
          "/api/auth/signup",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              firstName:
                form.firstName.trim(),
              lastName:
                form.lastName.trim(),
              email: form.email
                .trim()
                .toLowerCase(),
              phone:
                form.phone.trim(),
              password:
                form.password,
              confirmPassword:
                form.confirmPassword,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to create account."
        );
        return;
      }

      const result = await signIn(
        "credentials",
        {
          email: form.email
            .trim()
            .toLowerCase(),
          password: form.password,
          redirect: false,
        }
      );

      if (!result || result.error) {
        router.replace(
          `/login?callbackUrl=${encodeURIComponent(
            callbackUrl
          )}`
        );

        return;
      }

      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      setError(
        "Unable to create account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
          py-8
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
            h-[620px]
            w-full
            max-w-[1180px]
            overflow-hidden
            bg-white
            shadow-[0_18px_60px_rgba(45,32,32,0.12)]
            xl:h-[650px]
            xl:max-w-[1250px]
          "
        >
          <AuthVisual type="signup" />

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
            <div className="w-full max-w-[430px]">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                Join Us
              </p>

              <h1 className="mt-2 font-serif text-[38px] font-semibold leading-none text-[var(--foreground)] xl:text-[42px]">
                Create an account
              </h1>

              <p className="mt-3 text-[11px] text-[var(--foreground)]/45">
                Already have an
                account?{" "}
                <Link
                  href={loginUrl}
                  className="font-semibold text-[var(--primary)]"
                >
                  Log in here
                </Link>
              </p>

              <GoogleButton />

              <Divider />

              <form
                onSubmit={handleSubmit}
                className="space-y-2.5"
              >
                <div className="grid grid-cols-2 gap-2.5">
                  <Field>
                    <UserRound
                      size={15}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                    />

                    <input
                      type="text"
                      value={
                        form.firstName
                      }
                      onChange={(event) =>
                        updateField(
                          "firstName",
                          event.target.value
                        )
                      }
                      placeholder="First Name"
                      autoComplete="given-name"
                      required
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </Field>

                  <Field>
                    <input
                      type="text"
                      value={
                        form.lastName
                      }
                      onChange={(event) =>
                        updateField(
                          "lastName",
                          event.target.value
                        )
                      }
                      placeholder="Last Name"
                      autoComplete="family-name"
                      required
                      disabled={isSubmitting}
                      className={`${inputClass} pl-4`}
                    />
                  </Field>
                </div>

                <Field>
                  <Mail
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                  />

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="Email Address"
                    autoComplete="email"
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </Field>

                <Field>
                  <Phone
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                  />

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="+971 Phone Number"
                    autoComplete="tel"
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </Field>

                <Field>
                  <LockKeyhole
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={(event) =>
                      updateField(
                        "password",
                        event.target.value
                      )
                    }
                    placeholder="Password"
                    autoComplete="new-password"
                    minLength={8}
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
                </Field>

                <Field>
                  <LockKeyhole
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      form.confirmPassword
                    }
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={isSubmitting}
                    className={`${inputClass} pr-12`}
                  />

                  <PasswordToggle
                    show={
                      showConfirmPassword
                    }
                    disabled={isSubmitting}
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) =>
                          !current
                      )
                    }
                  />
                </Field>

                <Terms
                  agreed={agreed}
                  disabled={isSubmitting}
                  setAgreed={(value) => {
                    setAgreed(value);

                    if (error) {
                      setError("");
                    }
                  }}
                />

                {error && (
                  <ErrorMessage
                    message={error}
                  />
                )}

                <button
                  type="submit"
                  disabled={
                    !agreed ||
                    isSubmitting
                  }
                  className="
                    mx-auto
                    mt-3
                    flex
                    h-[46px]
                    w-[190px]
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
                    disabled:opacity-40
                  "
                >
                  {isSubmitting
                    ? "CREATING..."
                    : "CREATE ACCOUNT"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="min-h-screen bg-[var(--white)] lg:hidden">
        <AuthVisual type="signup" />

        <div className="relative z-20 -mt-[38px] px-3 pb-[125px] sm:px-5">
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
            <div className="text-center">
              <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                Join Us
              </p>

              <h1 className="mt-2 font-serif text-[29px] font-semibold leading-none text-[var(--foreground)]">
                Create an account
              </h1>

              <p className="mt-3 text-[10px] leading-5 text-[var(--foreground)]/45">
                Create your account and
                start ordering your
                favourites.
              </p>
            </div>

            <GoogleButton />

            <Divider />

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                <Field>
                  <UserRound
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                  />

                  <input
                    type="text"
                    value={
                      form.firstName
                    }
                    onChange={(event) =>
                      updateField(
                        "firstName",
                        event.target.value
                      )
                    }
                    placeholder="First Name"
                    autoComplete="given-name"
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </Field>

                <Field>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(event) =>
                      updateField(
                        "lastName",
                        event.target.value
                      )
                    }
                    placeholder="Last Name"
                    autoComplete="family-name"
                    required
                    disabled={isSubmitting}
                    className={`${inputClass} pl-4`}
                  />
                </Field>
              </div>

              <Field>
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </Field>

              <Field>
                <Phone
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                />

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="+971 Phone Number"
                  autoComplete="tel"
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </Field>

              <Field>
                <LockKeyhole
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={form.password}
                  onChange={(event) =>
                    updateField(
                      "password",
                      event.target.value
                    )
                  }
                  placeholder="Password"
                  autoComplete="new-password"
                  minLength={8}
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
              </Field>

              <Field>
                <LockKeyhole
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    form.confirmPassword
                  }
                  onChange={(event) =>
                    updateField(
                      "confirmPassword",
                      event.target.value
                    )
                  }
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={isSubmitting}
                  className={`${inputClass} pr-12`}
                />

                <PasswordToggle
                  show={
                    showConfirmPassword
                  }
                  disabled={isSubmitting}
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) =>
                        !current
                    )
                  }
                />
              </Field>

              <Terms
                agreed={agreed}
                disabled={isSubmitting}
                setAgreed={(value) => {
                  setAgreed(value);

                  if (error) {
                    setError("");
                  }
                }}
              />

              {error && (
                <ErrorMessage
                  message={error}
                />
              )}

              <button
                type="submit"
                disabled={
                  !agreed ||
                  isSubmitting
                }
                className="
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
                  disabled:opacity-40
                "
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            <p className="mt-7 text-center text-[10px] text-[var(--foreground)]/50">
              Have an account?{" "}
              <Link
                href={loginUrl}
                className="font-semibold text-[var(--primary)] underline underline-offset-4"
              >
                Log in here
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

function Field({
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
        <EyeOff size={17} />
      ) : (
        <Eye size={17} />
      )}
    </button>
  );
}

function Terms({
  agreed,
  setAgreed,
  disabled,
}: {
  agreed: boolean;
  setAgreed: (
    value: boolean
  ) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`
        flex
        items-start
        gap-2.5
        px-1
        pt-1
        ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }
      `}
    >
      <input
        type="checkbox"
        checked={agreed}
        disabled={disabled}
        onChange={(event) =>
          setAgreed(
            event.target.checked
          )
        }
        className="sr-only"
      />

      <span
        className={`
          mt-[1px]
          flex
          h-[18px]
          w-[18px]
          shrink-0
          items-center
          justify-center
          rounded-[5px]
          border
          ${
            agreed
              ? "border-[var(--primary)] bg-[var(--primary)]"
              : "border-[var(--primary)]/25 bg-white"
          }
        `}
      >
        {agreed && (
          <span className="text-[10px] font-bold text-white">
            ✓
          </span>
        )}
      </span>

      <span className="text-[9px] leading-4 text-[var(--foreground)]/50">
        I agree to the{" "}
        <Link
          href="/terms"
          className="font-semibold text-[var(--primary)] underline underline-offset-2"
        >
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-semibold text-[var(--primary)] underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        .
      </span>
    </label>
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
    <div className="my-4 flex items-center gap-4">
      <span className="h-px flex-1 bg-[var(--primary)]/10" />

      <span className="text-[9px] text-[var(--foreground)]/30">
        or
      </span>

      <span className="h-px flex-1 bg-[var(--primary)]/10" />
    </div>
  );
}

function GoogleButton() {
  return (
    <button
      type="button"
      disabled
      title="Google signup will be available soon"
      className="
        mt-5
        flex
        h-[48px]
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
      "
    >
      <GoogleIcon />

      Sign up with Google
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
  h-[48px]
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
`;