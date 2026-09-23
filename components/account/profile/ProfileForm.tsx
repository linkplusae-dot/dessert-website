"use client";

import {
  Check,
  Mail,
  Phone,
  Save,
  UserRound,
} from "lucide-react";

import {
  FormEvent,
  useState,
} from "react";

const customer = {
  firstName: "Ahmed",
  lastName: "Daniyal",
  email: "ahmed@example.com",
  phone: "+971 50 000 0000",
};

export default function ProfileForm() {
  const [
    form,
    setForm,
  ] = useState(customer);

  const [
    saved,
    setSaved,
  ] = useState(false);

  function updateField(
    field:
      | "firstName"
      | "lastName"
      | "phone",
    value: string
  ) {
    setSaved(false);

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // Connect to profile update API later.
    setSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cardClass}
    >
      <CardHeading
        icon={<UserRound size={15} />}
        eyebrow="Personal Details"
        title="Your Information"
      />

      <div
        className="
          mt-5
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        <Field label="First Name">
          <input
            type="text"
            value={form.firstName}
            onChange={(event) =>
              updateField(
                "firstName",
                event.target.value
              )
            }
            required
            className={inputClass}
          />
        </Field>

        <Field label="Last Name">
          <input
            type="text"
            value={form.lastName}
            onChange={(event) =>
              updateField(
                "lastName",
                event.target.value
              )
            }
            required
            className={inputClass}
          />
        </Field>

        <Field label="Email Address">
          <div className="relative">
            <Mail
              size={13}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-[var(--primary)]/40
              "
            />

            <input
              type="email"
              value={form.email}
              readOnly
              className={`
                ${inputClass}
                pl-10
                opacity-65
              `}
            />
          </div>

          <p
            className="
              mt-1.5
              text-[7px]
              leading-4
              text-[var(--foreground)]/35
            "
          >
            Email changes will require
            verification.
          </p>
        </Field>

        <Field label="Mobile Number">
          <div className="relative">
            <Phone
              size={13}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-[var(--primary)]/40
              "
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
              required
              className={`
                ${inputClass}
                pl-10
              `}
            />
          </div>
        </Field>
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-end
          gap-3
        "
      >
        {saved && (
          <span
            className="
              flex
              items-center
              gap-1.5
              text-[8px]
              font-semibold
              text-emerald-600
            "
          >
            <Check size={12} />
            Saved
          </span>
        )}

        <button
          type="submit"
          className="
            flex
            h-[42px]
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[var(--primary)]
            px-5
            text-[8px]
            font-semibold
            text-white
            transition
            hover:opacity-90
            sm:h-[44px]
            sm:px-6
            sm:text-[9px]
          "
        >
          <Save size={13} />
          Save Changes
        </button>
      </div>
    </form>
  );
}

function CardHeading({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
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
          h-[36px]
          w-[36px]
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[var(--surface)]
          text-[var(--primary)]
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.17em]
            text-[var(--accent)]
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            mt-0.5
            font-serif
            text-[19px]
            font-semibold
            text-[var(--foreground)]
            sm:text-[21px]
          "
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
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
          sm:text-[9px]
        "
      >
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass = `
  h-[45px]
  w-full
  rounded-[13px]
  border
  border-[var(--primary)]/12
  bg-[var(--background)]
  px-4
  text-[10px]
  text-[var(--foreground)]
  outline-none
  transition
  placeholder:text-[var(--foreground)]/25
  focus:border-[var(--primary)]/40
  focus:bg-white
  sm:h-[47px]
`;

const cardClass = `
  rounded-[20px]
  border
  border-[var(--primary)]/8
  bg-white
  p-4
  shadow-[0_8px_30px_rgba(45,32,32,0.035)]
  sm:rounded-[24px]
  sm:p-6
`;