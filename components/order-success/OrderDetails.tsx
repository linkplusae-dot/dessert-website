import {
  CheckCircle2,
  CreditCard,
  ReceiptText,
} from "lucide-react";

type Props = {
  orderNumber: string;
  paymentMethod: string;
  total: number;
};

export default function OrderDetails({
  orderNumber,
  paymentMethod,
  total,
}: Props) {
  return (
    <section className={cardClass}>
      <h2
        className="
          font-serif
          text-[20px]
          font-semibold
          text-[var(--foreground)]
        "
      >
        Order Details
      </h2>

      <div
        className="
          mt-5
          grid
          gap-3
          sm:grid-cols-3
        "
      >
        <Detail
          icon={<ReceiptText size={15} />}
          label="Order Number"
          value={`#${orderNumber}`}
        />

        <Detail
          icon={<CreditCard size={15} />}
          label="Payment"
          value={paymentMethod}
        />

        <Detail
          icon={
            <CheckCircle2 size={15} />
          }
          label="Payment Status"
          value="Paid"
        />
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-[var(--primary)]/10
          pt-4
        "
      >
        <span
          className="
            text-[11px]
            font-semibold
            text-[var(--foreground)]
          "
        >
          Order Total
        </span>

        <span
          className="
            font-serif
            text-[22px]
            font-semibold
            text-[var(--primary)]
          "
        >
          AED {total.toFixed(2)}
        </span>
      </div>
    </section>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[15px]
        bg-[var(--background)]
        p-3.5
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-[var(--primary)]
        "
      >
        {icon}

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.1em]
            text-[var(--foreground)]/35
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          text-[10px]
          font-semibold
          text-[var(--foreground)]
        "
      >
        {value}
      </p>
    </div>
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
`;