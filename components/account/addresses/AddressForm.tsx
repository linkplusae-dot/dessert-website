"use client";

import {
  Check,
  ChevronDown,
  X,
} from "lucide-react";

import type {
  SavedAddress,
} from "./AddressCard";

export type AddressValues = {
  label: string;
  emirate: string;
  area: string;
  street: string;
  building: string;
  apartment: string;
  landmark: string;
  instructions: string;
  isDefault: boolean;
};

const emirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

type Props = {
  values: AddressValues;
  editing: SavedAddress | null;

  onChange: (
    field: keyof AddressValues,
    value: string | boolean
  ) => void;

  onClose: () => void;

  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
};

export default function AddressForm({
  values,
  editing,
  onChange,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
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
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close address form"
        onClick={onClose}
        className="absolute inset-0"
      />

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="
          relative
          z-10
          max-h-[92dvh]
          w-full
          overflow-y-auto
          rounded-t-[26px]
          bg-white
          px-4
          pb-6
          pt-5
          shadow-2xl

          sm:max-w-[650px]
          sm:rounded-[26px]
          sm:p-6
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
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
              Delivery Address
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-[22px]
                font-semibold
                leading-tight
                text-[var(--foreground)]
                sm:text-[25px]
              "
            >
              {editing
                ? "Edit Address"
                : "Add New Address"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
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
              transition
              hover:opacity-80
              sm:h-[38px]
              sm:w-[38px]
            "
          >
            <X size={15} />
          </button>
        </div>

        {/* Fields */}
        <div
          className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          {/* Address Label */}
          <Field
            label="Address Label"
            required
          >
            <input
              type="text"
              value={values.label}
              onChange={(event) =>
                onChange(
                  "label",
                  event.target.value
                )
              }
              placeholder="Home, Work..."
              required
              className={inputClass}
            />
          </Field>

          {/* Emirate */}
          <Field
            label="Emirate"
            required
          >
            <div className="relative">
              <select
                value={values.emirate}
                onChange={(event) =>
                  onChange(
                    "emirate",
                    event.target.value
                  )
                }
                required
                className={selectClass}
              >
                <option value="">
                  Select Emirate
                </option>

                {emirates.map(
                  (emirate) => (
                    <option
                      key={emirate}
                      value={emirate}
                    >
                      {emirate}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={14}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--primary)]
                "
              />
            </div>
          </Field>

          {/* Area */}
          <Field
            label="Area / Community"
            required
          >
            <input
              type="text"
              value={values.area}
              onChange={(event) =>
                onChange(
                  "area",
                  event.target.value
                )
              }
              placeholder="Dubai Marina"
              required
              className={inputClass}
            />
          </Field>

          {/* Street */}
          <Field
            label="Street Name"
            required
          >
            <input
              type="text"
              value={values.street}
              onChange={(event) =>
                onChange(
                  "street",
                  event.target.value
                )
              }
              placeholder="Street name"
              required
              className={inputClass}
            />
          </Field>

          {/* Building */}
          <Field
            label="Building / Villa"
            required
          >
            <input
              type="text"
              value={values.building}
              onChange={(event) =>
                onChange(
                  "building",
                  event.target.value
                )
              }
              placeholder="Building or villa name"
              required
              className={inputClass}
            />
          </Field>

          {/* Apartment */}
          <Field label="Apartment / Office">
            <input
              type="text"
              value={values.apartment}
              onChange={(event) =>
                onChange(
                  "apartment",
                  event.target.value
                )
              }
              placeholder="Apartment or office"
              className={inputClass}
            />
          </Field>

          {/* Landmark */}
          <div className="sm:col-span-2">
            <Field label="Nearest Landmark">
              <input
                type="text"
                value={values.landmark}
                onChange={(event) =>
                  onChange(
                    "landmark",
                    event.target.value
                  )
                }
                placeholder="Optional landmark"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Instructions */}
          <div className="sm:col-span-2">
            <Field label="Delivery Instructions">
              <textarea
                value={values.instructions}
                onChange={(event) =>
                  onChange(
                    "instructions",
                    event.target.value
                  )
                }
                rows={3}
                placeholder="Gate number, call on arrival, etc."
                className={textareaClass}
              />
            </Field>
          </div>
        </div>

        {/* Default Address */}
        <button
          type="button"
          onClick={() =>
            onChange(
              "isDefault",
              !values.isDefault
            )
          }
          className="
            mt-4
            flex
            w-full
            items-center
            gap-2.5
            rounded-[13px]
            bg-[var(--background)]
            px-3
            py-3
            text-left
          "
        >
          <span
            className={`
              flex
              h-[19px]
              w-[19px]
              shrink-0
              items-center
              justify-center
              rounded-[5px]
              border
              transition

              ${
                values.isDefault
                  ? `
                    border-[var(--primary)]
                    bg-[var(--primary)]
                    text-white
                  `
                  : `
                    border-[var(--primary)]/20
                    bg-white
                  `
              }
            `}
          >
            {values.isDefault && (
              <Check size={11} />
            )}
          </span>

          <div>
            <p
              className="
                text-[9px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Default delivery address
            </p>

            <p
              className="
                mt-0.5
                text-[7px]
                leading-4
                text-[var(--foreground)]/40
              "
            >
              Automatically select this
              address during checkout.
            </p>
          </div>
        </button>

        {/* Actions */}
        <div
          className="
            sticky
            bottom-0
            -mx-4
            mt-5
            flex
            gap-2
            border-t
            border-[var(--primary)]/8
            bg-white
            px-4
            pb-1
            pt-4

            sm:static
            sm:mx-0
            sm:mt-6
            sm:px-0
            sm:pb-0
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-[44px]
              flex-1
              rounded-full
              border
              border-[var(--primary)]/15
              bg-white
              text-[9px]
              font-semibold
              text-[var(--primary)]
              transition
              hover:bg-[var(--surface)]/40
              sm:h-[46px]
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              h-[44px]
              flex-1
              rounded-full
              bg-[var(--primary)]
              text-[9px]
              font-semibold
              text-white
              transition
              hover:opacity-90
              sm:h-[46px]
            "
          >
            {editing
              ? "Save Changes"
              : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
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
          text-[var(--foreground)]/60
          sm:text-[9px]
        "
      >
        {label}

        {required && (
          <span
            className="
              ml-1
              text-[var(--accent)]
            "
          >
            *
          </span>
        )}
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

const selectClass = `
  h-[45px]
  w-full
  appearance-none
  rounded-[13px]
  border
  border-[var(--primary)]/12
  bg-[var(--background)]
  px-4
  pr-10
  text-[10px]
  text-[var(--foreground)]
  outline-none
  transition
  focus:border-[var(--primary)]/40
  focus:bg-white
  sm:h-[47px]
`;

const textareaClass = `
  w-full
  resize-none
  rounded-[13px]
  border
  border-[var(--primary)]/12
  bg-[var(--background)]
  px-4
  py-3
  text-[10px]
  leading-5
  text-[var(--foreground)]
  outline-none
  transition
  placeholder:text-[var(--foreground)]/25
  focus:border-[var(--primary)]/40
  focus:bg-white
`;