import {
  Check,
  CreditCard,
  PackageCheck,
} from "lucide-react";

export default function CheckoutProgress() {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        px-2
        py-5
      "
    >
      <Step
        icon={<Check size={13} />}
        label="Delivery"
        complete
      />

      <Line active />

      <Step
        icon={<CreditCard size={13} />}
        label="Payment"
        active
      />

      <Line />

      <Step
        icon={<PackageCheck size={13} />}
        label="Confirmation"
      />
    </div>
  );
}

function Step({
  icon,
  label,
  active = false,
  complete = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  complete?: boolean;
}) {
  const highlighted = active || complete;

  return (
    <div
      className="
        flex
        min-w-[66px]
        flex-col
        items-center
        gap-1.5
      "
    >
      <div
        className={`
          flex
          h-[30px]
          w-[30px]
          items-center
          justify-center
          rounded-full
          border
          ${
            highlighted
              ? "border-[var(--primary)] bg-[var(--primary)] text-white"
              : "border-[var(--primary)]/15 bg-white text-[var(--foreground)]/30"
          }
        `}
      >
        {icon}
      </div>

      <span
        className={`
          text-[8px]
          font-semibold
          sm:text-[9px]
          ${
            highlighted
              ? "text-[var(--primary)]"
              : "text-[var(--foreground)]/30"
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}

function Line({
  active = false,
}: {
  active?: boolean;
}) {
  return (
    <div
      className={`
        mb-[20px]
        h-px
        w-[38px]
        sm:w-[70px]
        ${
          active
            ? "bg-[var(--primary)]"
            : "bg-[var(--primary)]/15"
        }
      `}
    />
  );
}