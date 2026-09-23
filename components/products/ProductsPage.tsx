"use client";

import {
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ChevronDown,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  Product,
} from "@/types/product";

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name";

type ProductsPageProps = {
  products: Product[];
};

export default function ProductsPage({
  products,
}: ProductsPageProps) {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const [sort, setSort] =
    useState<SortOption>(
      "featured"
    );

  const [search, setSearch] =
    useState("");

  const categorySlug =
    searchParams.get("category");

  /* Selected category */

  const selectedCategory =
    categorySlug
      ? products.find(
          (product) =>
            product.category
              .slug ===
            categorySlug
        )?.category
      : null;

  /* Filter + sort */

  const filteredProducts =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      let result =
        products.filter(
          (product) => {
            const matchesCategory =
              !categorySlug ||
              product.category
                .slug ===
                categorySlug;

            const matchesSearch =
              !query ||
              product.name
                .toLowerCase()
                .includes(
                  query
                ) ||
              product.category
                .name
                .toLowerCase()
                .includes(
                  query
                );

            return (
              matchesCategory &&
              matchesSearch
            );
          }
        );

      result = [...result];

      if (
        sort === "featured"
      ) {
        result.sort(
          (a, b) =>
            Number(
              b.featured
            ) -
            Number(
              a.featured
            )
        );
      }

      if (
        sort === "price-low"
      ) {
        result.sort(
          (a, b) =>
            a.price -
            b.price
        );
      }

      if (
        sort === "price-high"
      ) {
        result.sort(
          (a, b) =>
            b.price -
            a.price
        );
      }

      if (sort === "name") {
        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      return result;
    }, [
      products,
      search,
      sort,
      categorySlug,
    ]);

  /* Clear category */

  const clearCategory = () => {
    router.push("/products");
  };

  /* Clear filters */

  const clearFilters = () => {
    setSearch("");

    if (categorySlug) {
      router.push(
        "/products"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] pb-[90px] lg:pb-0">
      <section className="w-full py-7 lg:py-12">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10 xl:px-12">
          {/* Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] lg:text-[11px]">
              Freshly Made
            </p>

            <h1 className="mt-1 font-serif text-[27px] font-semibold text-[var(--foreground)] lg:text-[38px]">
              {selectedCategory
                ? selectedCategory.name
                : "Our Desserts"}
            </h1>

            {/* Active Category */}
            {selectedCategory && (
              <button
                type="button"
                onClick={
                  clearCategory
                }
                className="
                  mt-3
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-[var(--surface)]
                  px-3
                  py-1.5
                  text-[9px]
                  font-semibold
                  text-[var(--primary)]
                  transition
                  hover:opacity-75
                  lg:text-[10px]
                "
              >
                {
                  selectedCategory.name
                }

                <X
                  size={12}
                  strokeWidth={
                    1.8
                  }
                />
              </button>
            )}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.05,
            }}
            className="relative mt-5 w-full lg:mt-7 lg:max-w-[520px]"
          >
            <Search
              size={16}
              strokeWidth={1.7}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[var(--foreground)]/40
              "
            />

            <input
              type="text"
              value={search}
              onChange={(
                event
              ) =>
                setSearch(
                  event.target
                    .value
                )
              }
              placeholder={
                selectedCategory
                  ? `Search ${selectedCategory.name.toLowerCase()}...`
                  : "Search desserts..."
              }
              className="
                h-[44px]
                w-full
                rounded-full
                border
                border-[var(--primary)]/15
                bg-[var(--white)]
                pl-11
                pr-11
                text-[11px]
                text-[var(--foreground)]
                outline-none
                transition
                placeholder:text-[var(--foreground)]/35
                focus:border-[var(--primary)]/40
                lg:h-[48px]
                lg:text-[12px]
              "
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Clear search"
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-7
                  w-7
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  text-[var(--foreground)]/40
                  transition
                  hover:bg-[var(--surface)]
                  hover:text-[var(--foreground)]
                "
              >
                <X
                  size={14}
                  strokeWidth={
                    1.7
                  }
                />
              </button>
            )}
          </motion.div>

          {/* Count + Sort */}
          <div className="mt-5 flex items-center justify-between border-b border-[var(--primary)]/10 pb-4 lg:mt-6">
            <p className="text-[10px] text-[var(--foreground)]/55 lg:text-[12px]">
              <span className="font-semibold text-[var(--foreground)]">
                {
                  filteredProducts.length
                }
              </span>{" "}
              {filteredProducts.length ===
              1
                ? "Dessert"
                : "Desserts"}
            </p>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(
                  event
                ) =>
                  setSort(
                    event.target
                      .value as SortOption
                  )
                }
                className="
                  h-[38px]
                  appearance-none
                  rounded-full
                  border
                  border-[var(--primary)]/15
                  bg-[var(--white)]
                  pl-4
                  pr-9
                  text-[10px]
                  font-medium
                  text-[var(--foreground)]
                  outline-none
                  transition
                  focus:border-[var(--primary)]/40
                  lg:h-[42px]
                  lg:pl-5
                  lg:pr-10
                  lg:text-[11px]
                "
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to
                  High
                </option>

                <option value="price-high">
                  Price: High to
                  Low
                </option>

                <option value="name">
                  Name: A-Z
                </option>
              </select>

              <ChevronDown
                size={14}
                strokeWidth={1.7}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[var(--foreground)]/50
                "
              />
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length >
          0 ? (
            <motion.div
              layout
              className="
                mt-5
                grid
                grid-cols-2
                gap-x-3
                gap-y-6
                sm:gap-4
                md:grid-cols-3
                lg:mt-7
                lg:grid-cols-4
                lg:gap-x-5
                lg:gap-y-9
              "
            >
              {filteredProducts.map(
                (
                  product,
                  index
                ) => (
                  <motion.article
                    layout
                    key={
                      product._id
                    }
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        (index %
                          4) *
                        0.04,
                    }}
                    className="min-w-0"
                  >
                    <Link
                      href={`/products/${product.slug}`}
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
                          src={
                            product
                              .images[0] ||
                            "/images/product-placeholder.webp"
                          }
                          alt={
                            product.name
                          }
                          fill
                          sizes="
                            (max-width: 768px) 50vw,
                            (max-width: 1024px) 33vw,
                            25vw
                          "
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Details */}
                      <div className="pt-2.5 lg:pt-3.5">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[var(--accent)] lg:text-[10px]">
                          {
                            product
                              .category
                              .name
                          }
                        </p>

                        <h2 className="mt-1 line-clamp-1 text-[11px] font-semibold text-[var(--foreground)] sm:text-[12px] lg:text-[15px]">
                          {
                            product.name
                          }
                        </h2>

                        {/* Price + Cart */}
                        <div className="mt-2 flex items-center justify-between gap-2 lg:mt-3">
                          <p className="text-[12px] font-bold text-[var(--primary)] lg:text-[14px]">
                            AED{" "}
                            {
                              product.price
                            }
                          </p>

                          <button
                            type="button"
                            aria-label={`Add ${product.name} to cart`}
                            disabled={
                              product.stock <=
                              0
                            }
                            onClick={(
                              event
                            ) => {
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
                              disabled:cursor-not-allowed
                              disabled:opacity-35
                              lg:h-9
                              lg:w-9
                            "
                          >
                            <ShoppingCart
                              size={
                                14
                              }
                              strokeWidth={
                                1.8
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )
              )}
            </motion.div>
          ) : (
            /* No Results */
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="flex min-h-[280px] flex-col items-center justify-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)]">
                <Search
                  size={19}
                  strokeWidth={1.6}
                  className="text-[var(--primary)]"
                />
              </div>

              <h2 className="mt-3 font-serif text-[20px] font-semibold text-[var(--foreground)]">
                No desserts found
              </h2>

              <p className="mt-1 max-w-[280px] text-[10px] leading-5 text-[var(--foreground)]/50 lg:text-[12px]">
                {selectedCategory
                  ? `There are currently no matching desserts in ${selectedCategory.name}.`
                  : "Try searching for another dessert."}
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="
                  mt-4
                  rounded-full
                  bg-[var(--primary)]
                  px-5
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-[var(--white)]
                  transition
                  hover:opacity-90
                "
              >
                {selectedCategory
                  ? "View All Desserts"
                  : "Clear Search"}
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}