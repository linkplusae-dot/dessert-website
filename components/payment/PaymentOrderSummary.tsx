import Image from "next/image";
import {
  LockKeyhole,
  ShoppingBag,
} from "lucide-react";

const items = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    image:
      "/images/products/chocolate-cake.webp",
    quantity: 1,
    size: "Medium",
    price: 120,
  },
  {
    id: 3,
    name: "Chocolate Brownies",
    image:
      "/images/products/brownies.webp",
    quantity: 2,
    size: null,
    price: 55,
  },
];

const subtotal = 230;
const delivery = 20;
const total = subtotal + delivery;

export default function PaymentOrderSummary() {
  return (
    <section className={cardClass}>
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--primary)]/10
          pb-4
        "
      >
        <div>
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[var(--accent)]
            "
          >
            Your Order
          </p>

          <h2
            className="
              mt-1
              font-serif
              text-[23px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            Order Summary
          </h2>
        </div>

        <div
          className="
            flex
            h-[38px]
            w-[38px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <ShoppingBag size={17} />
        </div>
      </div>

      <div
        className="
          divide-y
          divide-[var(--primary)]/8
        "
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="
              flex
              gap-3
              py-4
            "
          >
            <div
              className="
                relative
                h-[65px]
                w-[65px]
                shrink-0
                overflow-hidden
                rounded-[13px]
                bg-[var(--surface)]
              "
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="65px"
                className="object-cover"
              />

              <span
                className="
                  absolute
                  right-1
                  top-1
                  flex
                  h-[18px]
                  min-w-[18px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  px-1
                  text-[8px]
                  font-bold
                  text-white
                "
              >
                {item.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[10px]
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                {item.name}
              </p>

              {item.size && (
                <p
                  className="
                    mt-1
                    text-[8px]
                    text-[var(--foreground)]/40
                  "
                >
                  Size: {item.size}
                </p>
              )}
            </div>

            <p
              className="
                shrink-0
                text-[10px]
                font-semibold
                text-[var(--primary)]
              "
            >
              AED{" "}
              {(
                item.price *
                item.quantity
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div
        className="
          space-y-3
          border-t
          border-[var(--primary)]/10
          pt-4
        "
      >
        <Row
          label="Subtotal"
          value={`AED ${subtotal.toFixed(2)}`}
        />

        <Row
          label="Delivery"
          value={`AED ${delivery.toFixed(2)}`}
        />

        <div
          className="
            border-t
            border-dashed
            border-[var(--primary)]/15
          "
        />

        <div
          className="
            flex
            items-end
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[12px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Total
            </p>

            <p
              className="
                mt-1
                text-[8px]
                text-[var(--foreground)]/35
              "
            >
              VAT included where applicable
            </p>
          </div>

          <p
            className="
              font-serif
              text-[23px]
              font-semibold
              text-[var(--primary)]
            "
          >
            AED {total.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="
          mt-6
          flex
          h-[52px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-full
          bg-[var(--primary)]
          text-[11px]
          font-semibold
          text-white
          transition
          hover:opacity-90
        "
      >
        <LockKeyhole size={14} />
        Pay AED {total.toFixed(2)}
      </button>

      <p
        className="
          mt-3
          text-center
          text-[8px]
          leading-4
          text-[var(--foreground)]/35
        "
      >
        Your order will only be confirmed
        after successful payment.
      </p>
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
          text-[10px]
          text-[var(--foreground)]/50
        "
      >
        {label}
      </span>

      <span
        className="
          text-[10px]
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