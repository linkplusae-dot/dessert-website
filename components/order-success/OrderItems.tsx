import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const items = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    image:
      "/images/products/chocolate-cake.webp",
    quantity: 1,
    size: "Medium",
    message: "Happy Birthday!",
    price: 120,
  },
  {
    id: 3,
    name: "Chocolate Brownies",
    image:
      "/images/products/brownies.webp",
    quantity: 2,
    size: null,
    message: null,
    price: 55,
  },
];

export default function OrderItems() {
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
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[var(--accent)]
            "
          >
            Your Desserts
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
            Order Items
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
          <ShoppingBag size={16} />
        </div>
      </div>

      <div
        className="
          mt-4
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
              first:pt-0
            "
          >
            <div
              className="
                relative
                h-[68px]
                w-[68px]
                shrink-0
                overflow-hidden
                rounded-[14px]
                bg-[var(--surface)]
              "
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="68px"
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
              <h3
                className="
                  text-[10px]
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                {item.name}
              </h3>

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

              {item.message && (
                <p
                  className="
                    mt-1
                    truncate
                    text-[8px]
                    text-[var(--foreground)]/40
                  "
                >
                  Message: &quot;
                  {item.message}&quot;
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
`;