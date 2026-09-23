import {
  Check,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

export default function PaymentMethods({
  selected,
  onChange,
}: Props) {
  return (
    <section className={cardClass}>
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
          <CreditCard size={17} />
        </div>

        <div>
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[var(--accent)]
            "
          >
            Payment
          </p>

          <h2
            className="
              mt-0.5
              font-serif
              text-[20px]
              font-semibold
              text-[var(--foreground)]
              sm:text-[22px]
            "
          >
            Payment Method
          </h2>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange("card")
        }
        className={`
          mt-5
          flex
          w-full
          items-center
          gap-4
          rounded-[16px]
          border
          p-4
          text-left
          transition
          ${
            selected === "card"
              ? "border-[var(--primary)] bg-[var(--surface)]/50"
              : "border-[var(--primary)]/10 bg-white"
          }
        `}
      >
        <div
          className="
            flex
            h-[42px]
            w-[42px]
            shrink-0
            items-center
            justify-center
            rounded-[12px]
            bg-white
            text-[var(--primary)]
            shadow-sm
          "
        >
          <CreditCard size={19} />
        </div>

        <div className="flex-1">
          <p
            className="
              text-[11px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            Credit / Debit Card
          </p>

          <p
            className="
              mt-1
              text-[8px]
              text-[var(--foreground)]/40
            "
          >
            Pay securely using your card
          </p>
        </div>

        <div
          className={`
            flex
            h-[20px]
            w-[20px]
            items-center
            justify-center
            rounded-full
            border
            ${
              selected === "card"
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-[var(--primary)]/20"
            }
          `}
        >
          {selected === "card" && (
            <Check size={12} />
          )}
        </div>
      </button>

      {/* Payment provider mounts here later */}
      <div
        className="
          mt-4
          rounded-[16px]
          border
          border-dashed
          border-[var(--primary)]/15
          bg-[var(--background)]
          px-4
          py-5
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <LockKeyhole
            size={16}
            className="
              mt-0.5
              shrink-0
              text-[var(--primary)]
            "
          />

          <div>
            <p
              className="
                text-[10px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Secure card payment
            </p>

            <p
              className="
                mt-1
                text-[8px]
                leading-4
                text-[var(--foreground)]/45
              "
            >
              Your secure payment form
              will appear here once the
              payment gateway is connected.
            </p>
          </div>
        </div>
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          gap-2
          text-[8px]
          text-[var(--foreground)]/40
        "
      >
        <ShieldCheck
          size={13}
          className="text-[var(--primary)]"
        />

        Payment details are processed securely.
      </div>
    </section>
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