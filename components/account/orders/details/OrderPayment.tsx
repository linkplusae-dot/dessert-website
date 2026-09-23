import {
  CheckCircle2,
  CreditCard,
  ReceiptText,
} from "lucide-react";

type Props = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
};

export default function OrderPayment({
  subtotal,
  deliveryFee,
  total,
  paymentMethod,
  paymentStatus,
}: Props) {
  return (
    <section className={cardClass}>
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[7px]
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
              mt-1
              font-serif
              text-[20px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            Payment Summary
          </h2>
        </div>

        <div
          className="
            flex
            h-[36px]
            w-[36px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <CreditCard size={15} />
        </div>
      </div>

      <div
        className="
          mt-4
          rounded-[15px]
          bg-[var(--background)]
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-b
            border-[var(--primary)]/8
            pb-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <CreditCard
              size={13}
              className="text-[var(--primary)]"
            />

            <span
              className="
                text-[8px]
                text-[var(--foreground)]/45
              "
            >
              {paymentMethod}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-1
              text-[8px]
              font-semibold
              text-emerald-600
            "
          >
            <CheckCircle2 size={12} />
            {paymentStatus}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <Row
            label="Subtotal"
            value={`AED ${subtotal.toFixed(2)}`}
          />

          <Row
            label="Delivery"
            value={`AED ${deliveryFee.toFixed(2)}`}
          />

          <div
            className="
              border-t
              border-dashed
              border-[var(--primary)]/12
            "
          />

          <div
            className="
              flex
              items-end
              justify-between
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <ReceiptText
                size={13}
                className="text-[var(--primary)]"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                Total
              </span>
            </div>

            <span
              className="
                font-serif
                text-[20px]
                font-semibold
                text-[var(--primary)]
              "
            >
              AED {total.toFixed(2)}
            </span>
          </div>

          <p
            className="
              text-right
              text-[7px]
              text-[var(--foreground)]/30
            "
          >
            VAT included where applicable
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <span
        className="
          text-[8px]
          text-[var(--foreground)]/45
        "
      >
        {label}
      </span>

      <span
        className="
          text-[9px]
          font-semibold
          text-[var(--foreground)]
        "
      >
        {value}
      </span>
    </div>
  );
}

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
