"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

const products = [
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
  }
];

export default function Products() {
  return (
    <section
      id="all-products"
      className="w-full bg-[var(--background)] py-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10 xl:px-12">
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
          className="flex items-end justify-between"
        >
          <div>
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] lg:text-xs">
              Freshly Made For You
            </p>

            <h2 className="font-serif text-[25px] font-semibold leading-tight text-[var(--foreground)] lg:text-[36px]">
              Our Desserts
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-1.5 pb-1 text-sm font-semibold text-[var(--primary)] transition-opacity hover:opacity-70 sm:flex"
          >
            View All

            <ArrowRight
              size={15}
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>

        {/* Products */}
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-4 md:grid-cols-3 lg:mt-8 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-9">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
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
                amount: 0.15,
              }}
              transition={{
                duration: 0.45,
                delay: (index % 4) * 0.05,
              }}
              className="min-w-0"
            >
              <Link
                href={`/products/${product.id}`}
                className="group block"
              >
                {/* Image */}
                <div
                  className="
                    relative
                    aspect-square
                    w-full
                    overflow-hidden
                    rounded-[18px]
                    bg-[var(--surface)]
                    lg:rounded-[24px]
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="
                      (max-width: 640px) 50vw,
                      (max-width: 1024px) 33vw,
                      25vw
                    "
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="pt-2.5 lg:pt-3.5">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[var(--accent)] lg:text-[10px]">
                    {product.category}
                  </p>

                  <h3 className="mt-1 line-clamp-1 text-[11px] font-semibold text-[var(--foreground)] sm:text-[12px] lg:text-[15px]">
                    {product.name}
                  </h3>

                  {/* Price + Cart */}
                  <div className="mt-2 flex items-center justify-between gap-2 lg:mt-3">
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
                      />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mt-8 flex justify-center sm:hidden"
        >
          <Link
            href="/products"
            className="
              inline-flex
              h-[42px]
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-[var(--primary)]/25
              px-5
              text-[11px]
              font-semibold
              text-[var(--primary)]
              transition-all
              duration-300
              hover:bg-[var(--primary)]
              hover:text-[var(--white)]
            "
          >
            View All Desserts

            <ArrowRight
              size={14}
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}