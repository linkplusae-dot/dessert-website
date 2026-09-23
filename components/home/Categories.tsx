"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Cakes",
    slug: "cakes",
    image: "/images/categories/cakes.webp",
  },
  {
    name: "Cupcakes",
    slug: "cupcakes",
    image: "/images/categories/cupcakes.webp",
  },
  {
    name: "Cookies",
    slug: "cookies",
    image: "/images/categories/cookies.webp",
  },
  {
    name: "Brownies",
    slug: "brownies",
    image: "/images/categories/brownies.webp",
  },
  {
    name: "Dessert Cups",
    slug: "dessert-cups",
    image: "/images/categories/dessert-cups.webp",
  },
  {
    name: "Gift Boxes",
    slug: "gift-boxes",
    image: "/images/categories/gift-boxes.webp",
  },
];

export default function Categories() {
  return (
    <section
      id="categories"
      className="w-full bg-[var(--background)] py-6 lg:py-10"
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
              Explore Our
            </p>

            <h2 className="font-serif text-[25px] font-semibold leading-tight text-[var(--foreground)] lg:text-[36px]">
              Categories
            </h2>
          </div>

          <Link
            href="/categories"
            className="flex items-center gap-1.5 pb-1 text-[11px] font-semibold text-[var(--primary)] transition-opacity hover:opacity-70 lg:text-sm"
          >
            View All

            <ArrowRight
              size={14}
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>

        {/* Categories */}
        <div
          className="
            mt-4
            flex
            snap-x
            snap-mandatory
            gap-3
            overflow-x-auto
            px-5
            pb-1
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            lg:mt-6
            lg:grid
            lg:grid-cols-6
            lg:gap-6
            lg:overflow-visible
            lg:px-10
            xl:px-12
          "
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              className="
                w-[64px]
                shrink-0
                snap-start
                sm:w-[66px]
                lg:w-auto
              "
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group flex flex-col items-center"
              >
                {/* Image */}
                <div
                  className="
                    relative
                    h-[60px]
                    w-[60px]
                    overflow-hidden
                    rounded-full
                    border
                    border-[var(--accent)]/25
                    bg-[var(--surface)]
                    sm:h-[62px]
                    sm:w-[62px]
                    lg:h-[82px]
                    lg:w-[82px]
                    xl:h-[88px]
                    xl:w-[88px]
                  "
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 60px, (max-width: 1024px) 62px, 88px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Name */}
                <h3
                  className="
                    mt-1.5
                    max-w-[64px]
                    text-center
                    text-[9px]
                    font-semibold
                    leading-tight
                    text-[var(--foreground)]
                    sm:text-[10px]
                    lg:mt-2
                    lg:max-w-[100px]
                    lg:text-[12px]
                  "
                >
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}