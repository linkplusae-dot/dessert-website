import Image from "next/image";

import {
  ShoppingBag,
} from "lucide-react";

export type OrderProduct = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size: string | null;
  message: string | null;
};

type Props = {
  products: OrderProduct[];
};

export default function OrderProducts({
  products,
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
            h-[36px]
            w-[36px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <ShoppingBag size={15} />
        </div>
      </div>

      <div
        className="
          mt-4
          divide-y
          divide-[var(--primary)]/8
        "
      >
        {products.map((product) => (
          <div
            key={product.id}
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
                h-[62px]
                w-[62px]
                shrink-0
                overflow-hidden
                rounded-[13px]
                bg-[var(--surface)]
                sm:h-[70px]
                sm:w-[70px]
              "
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="70px"
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
                  text-[7px]
                  font-bold
                  text-white
                "
              >
                {product.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className="
                  text-[9px]
                  font-semibold
                  text-[var(--foreground)]
                  sm:text-[10px]
                "
              >
                {product.name}
              </h3>

              {product.size && (
                <p
                  className="
                    mt-1
                    text-[8px]
                    text-[var(--foreground)]/40
                  "
                >
                  Size: {product.size}
                </p>
              )}

              {product.message && (
                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-[8px]
                    leading-4
                    text-[var(--foreground)]/40
                  "
                >
                  Message: &quot;
                  {product.message}&quot;
                </p>
              )}
            </div>

            <p
              className="
                shrink-0
                text-[9px]
                font-semibold
                text-[var(--primary)]
                sm:text-[10px]
              "
            >
              AED{" "}
              {(
                product.price *
                product.quantity
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
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