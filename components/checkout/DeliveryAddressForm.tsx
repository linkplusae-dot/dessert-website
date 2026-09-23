import {
  Check,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

import CheckoutField from "./CheckoutField";
import { emirates } from "./checkout-data";
import type { AddressForm } from "./checkout-types";

type Props = {
  address: AddressForm;
  saveAddress: boolean;
  onChange: (
    field: keyof AddressForm,
    value: string
  ) => void;
  onSaveAddressChange: (
    value: boolean
  ) => void;
};

export default function DeliveryAddressForm({
  address,
  saveAddress,
  onChange,
  onSaveAddressChange,
}: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.05,
      }}
      className={cardClass}
    >
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-[var(--primary)]/10
          pb-4
        "
      >
        <div
          className="
            flex
            h-[40px]
            w-[40px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <MapPin size={17} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                text-[8px]
                font-semibold
                tracking-[0.15em]
                text-[var(--accent)]
              "
            >
              02
            </span>

            <h2
              className="
                font-serif
                text-[20px]
                font-semibold
                text-[var(--foreground)]
                sm:text-[22px]
              "
            >
              Delivery Address
            </h2>
          </div>

          <p
            className="
              mt-0.5
              text-[9px]
              text-[var(--foreground)]/40
            "
          >
            Where should we deliver your
            order?
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        <CheckoutField
          label="Emirate"
          required
        >
          <div className="relative">
            <select
              value={address.emirate}
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
              size={15}
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[var(--foreground)]/35
              "
            />
          </div>
        </CheckoutField>

        <CheckoutField
          label="Area / Community"
          required
        >
          <input
            type="text"
            value={address.area}
            onChange={(event) =>
              onChange(
                "area",
                event.target.value
              )
            }
            placeholder="e.g. Dubai Marina"
            required
            className={inputClass}
          />
        </CheckoutField>

        <div className="sm:col-span-2">
          <CheckoutField
            label="Street Name"
            required
          >
            <input
              type="text"
              value={address.street}
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
          </CheckoutField>
        </div>

        <CheckoutField
          label="Building / Villa"
          required
        >
          <input
            type="text"
            value={address.building}
            onChange={(event) =>
              onChange(
                "building",
                event.target.value
              )
            }
            placeholder="Building or villa name / number"
            required
            className={inputClass}
          />
        </CheckoutField>

        <CheckoutField label="Apartment / Office">
          <input
            type="text"
            value={address.apartment}
            onChange={(event) =>
              onChange(
                "apartment",
                event.target.value
              )
            }
            placeholder="Apartment / office number"
            className={inputClass}
          />
        </CheckoutField>

        <div className="sm:col-span-2">
          <CheckoutField label="Nearest Landmark">
            <input
              type="text"
              value={address.landmark}
              onChange={(event) =>
                onChange(
                  "landmark",
                  event.target.value
                )
              }
              placeholder="Optional landmark"
              className={inputClass}
            />
          </CheckoutField>
        </div>

        <div className="sm:col-span-2">
          <CheckoutField label="Delivery Instructions">
            <textarea
              value={
                address.instructions
              }
              onChange={(event) =>
                onChange(
                  "instructions",
                  event.target.value
                )
              }
              placeholder="Gate number, reception details or anything our delivery team should know..."
              rows={4}
              className={textareaClass}
            />
          </CheckoutField>
        </div>
      </div>

      <label
        className="
          mt-5
          flex
          cursor-pointer
          items-center
          gap-3
        "
      >
        <input
          type="checkbox"
          checked={saveAddress}
          onChange={(event) =>
            onSaveAddressChange(
              event.target.checked
            )
          }
          className="sr-only"
        />

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
              saveAddress
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-[var(--primary)]/20 bg-white"
            }
          `}
        >
          {saveAddress && (
            <Check
              size={12}
              strokeWidth={2.5}
            />
          )}
        </span>

        <span
          className="
            text-[10px]
            text-[var(--foreground)]/55
          "
        >
          Save this address to my account
          for faster checkout next time
        </span>
      </label>
    </motion.section>
  );
}

const cardClass = `
  rounded-[22px]
  border
  border-[var(--primary)]/8
  bg-white
  p-4
  shadow-[0_10px_40px_rgba(45,32,32,0.04)]
  sm:rounded-[26px]
  sm:p-6
  lg:p-7
`;

const inputClass = `
  h-[50px]
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
  placeholder:text-[var(--foreground)]/28
  focus:border-[var(--primary)]/45
  sm:text-[11px]
`;

const selectClass = `
  h-[50px]
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
  focus:border-[var(--primary)]/45
  sm:text-[11px]
`;

const textareaClass = `
  w-full
  resize-none
  rounded-[13px]
  border
  border-[var(--primary)]/12
  bg-[var(--background)]
  px-4
  py-3.5
  text-[10px]
  leading-5
  text-[var(--foreground)]
  outline-none
  transition
  placeholder:text-[var(--foreground)]/28
  focus:border-[var(--primary)]/45
  sm:text-[11px]
`;