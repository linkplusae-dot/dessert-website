"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    category: "Cakes",
    price: 120,
    image: "/images/products/chocolate-cake.webp",
  },
  {
    id: 2,
    name: "Strawberry Cupcakes",
    category: "Cupcakes",
    price: 65,
    image: "/images/products/strawberry-cupcakes.webp",
  },
  {
    id: 3,
    name: "Chocolate Brownies",
    category: "Brownies",
    price: 55,
    image: "/images/products/brownies.webp",
  },
  {
    id: 4,
    name: "Dessert Box",
    category: "Gift Boxes",
    price: 95,
    image: "/images/products/dessert-box.webp",
  },
  {
    id: 5,
    name: "Lotus Cheesecake",
    category: "Cakes",
    price: 110,
    image: "/images/products/lotus-cheesecake.webp",
  },
  {
    id: 6,
    name: "Chocolate Cookies",
    category: "Cookies",
    price: 45,
    image: "/images/products/chocolate-cookies.webp",
  },
];

export default function BestSellers() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="products"
      className="w-full overflow-hidden bg-[var(--surface)] py-7 lg:py-14"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex items-end justify-between px-5 lg:px-10 xl:px-12"
        >
          <div>
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] lg:text-xs">
              Customer Favorites
            </p>

            <h2 className="font-serif text-[25px] font-semibold leading-tight text-[var(--foreground)] lg:text-[36px]">
              Signature desserts
            </h2>
          </div>

          <Link
            href="/products"
            className="flex items-center gap-1.5 pb-1 text-[11px] font-semibold text-[var(--primary)] transition-opacity hover:opacity-70 lg:text-sm"
          >
            View All

            <ArrowRight
              size={14}
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>

        {/* Slider */}
        <div
          className="mt-5 w-full overflow-hidden lg:mt-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex w-max gap-3 lg:gap-5"
            animate={{
              x: paused ? undefined : ["0%", "-50%"],
            }}
            transition={{
              x: {
                duration: 55,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }}
          >
            {/* First Set */}
            <ProductSet products={products} />

            {/* Duplicate Set */}
            <ProductSet products={products} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductSet({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="flex shrink-0 gap-3 pl-3 lg:gap-5 lg:pl-5">
      {products.map((product) => (
        <article
          key={product.id}
          className="
            w-[155px]
            shrink-0
            sm:w-[175px]
            md:w-[190px]
            lg:w-[250px]
            xl:w-[270px]
          "
        >
          <Link
            href={`/products/${product.id}`}
            className="group block"
          >
            {/* Image */}
            <div
              className="
                relative
                aspect-[1/1.05]
                w-full
                overflow-hidden
                rounded-[18px]
                bg-[var(--background)]
                lg:rounded-[22px]
              "
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 155px, (max-width: 1024px) 190px, 270px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Details */}
            <div className="pt-2.5">
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--accent)] lg:text-[10px]">
                {product.category}
              </p>

              <h3 className="mt-1 line-clamp-1 text-[12px] font-semibold text-[var(--foreground)] lg:text-[15px]">
                {product.name}
              </h3>

              {/* Price + Cart */}
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-[12px] font-bold text-[var(--primary)] lg:text-[14px]">
                  AED {product.price}
                </p>

                <button
                  type="button"
                  aria-label={`Add ${product.name} to cart`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    // Add to cart logic later
                  }}
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    text-[var(--white)]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:opacity-90
                    lg:h-9
                    lg:w-9
                  "
                >
                  <ShoppingCart
                    size={14}
                    strokeWidth={1.8}
                    className="lg:h-4 lg:w-4"
                  />
                </button>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}