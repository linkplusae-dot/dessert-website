"use client";

import {
  useMemo,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Check,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useCart,
} from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    isLoaded,
    updateQuantity,
    removeItem,
    selectedIds,
    setSelectedIds,
  } = useCart();

  /*
   * When an item has never been
   * manually selected/unselected,
   * treat all cart items as selected.
   */
  const hasSelectionState =
    selectedIds.length > 0;

  const selectedItems =
    useMemo(() => {
      if (!hasSelectionState) {
        return items;
      }

      return items.filter(
        (item) =>
          selectedIds.includes(
            item.cartItemId
          )
      );
    }, [
      items,
      selectedIds,
      hasSelectionState,
    ]);

  const selectedCount =
    selectedItems.reduce(
      (
        total,
        item
      ) =>
        total +
        item.quantity,
      0
    );

  const subtotal =
    selectedItems.reduce(
      (
        total,
        item
      ) =>
        total +
        item.price *
          item.quantity,
      0
    );

  const allSelected =
    items.length > 0 &&
    selectedItems.length ===
      items.length;

  const isSelected = (
    cartItemId: string
  ) => {
    if (
      !hasSelectionState
    ) {
      return true;
    }

    return selectedIds.includes(
      cartItemId
    );
  };

  const toggleItem = (
    cartItemId: string
  ) => {
    /*
     * First interaction:
     * all products were selected.
     * Clicking one should deselect it.
     */
    if (
      !hasSelectionState
    ) {
      setSelectedIds(
        items
          .filter(
            (item) =>
              item.cartItemId !==
              cartItemId
          )
          .map(
            (item) =>
              item.cartItemId
          )
      );

      return;
    }

    setSelectedIds(
      (current) => {
        if (
          current.includes(
            cartItemId
          )
        ) {
          return current.filter(
            (id) =>
              id !==
              cartItemId
          );
        }

        return [
          ...current,
          cartItemId,
        ];
      }
    );
  };

  const toggleSelectAll =
    () => {
      if (allSelected) {
        /*
         * We need an explicit
         * empty selection.
         */
        setSelectedIds([
          "__none__",
        ]);

        return;
      }

      setSelectedIds(
        items.map(
          (item) =>
            item.cartItemId
        )
      );
    };

  const handleRemove = (
    cartItemId: string
  ) => {
    removeItem(
      cartItemId
    );

    setSelectedIds(
      (current) =>
        current.filter(
          (id) =>
            id !==
            cartItemId
        )
    );
  };

  /* Loading */

  if (!isLoaded) {
    return (
      <main className="min-h-[65vh] bg-[var(--background)]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-10 lg:py-16 xl:px-12">
          <div className="animate-pulse">
            <div className="h-3 w-24 rounded-full bg-[var(--surface)]" />

            <div className="mt-4 h-10 w-44 rounded-lg bg-[var(--surface)]" />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_400px]">
              <div className="space-y-4">
                <div className="h-[170px] rounded-[24px] bg-[var(--surface)]" />

                <div className="h-[170px] rounded-[24px] bg-[var(--surface)]" />
              </div>

              <div className="h-[360px] rounded-[28px] bg-[var(--surface)]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* Empty Cart */

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[var(--background)] pb-[90px] lg:pb-0">
        <div className="mx-auto flex min-h-[65vh] max-w-[1440px] items-center justify-center px-5 lg:px-10 xl:px-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-center"
          >
            <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--surface)]">
              <ShoppingBag
                size={28}
                strokeWidth={
                  1.5
                }
                className="text-[var(--primary)]"
              />
            </div>

            <h1 className="mt-5 font-serif text-[28px] font-semibold text-[var(--foreground)] lg:text-[36px]">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-2 max-w-[320px] text-[11px] leading-5 text-[var(--foreground)]/50 lg:text-[12px]">
              Add your favourite
              desserts and they
              will appear here.
            </p>

            <Link
              href="/products"
              className="
                mt-6
                inline-flex
                h-[46px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[var(--primary)]
                px-6
                text-[11px]
                font-semibold
                text-[var(--white)]
                transition
                hover:opacity-90
              "
            >
              Shop Desserts
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-[100px] lg:pb-16">
      <div className="mx-auto max-w-[1440px] px-5 py-6 lg:px-10 lg:py-12 xl:px-12">
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
            duration: 0.4,
          }}
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] lg:text-[11px]">
            Your Selection
          </p>

          <div className="mt-1 flex items-end justify-between">
            <h1 className="font-serif text-[30px] font-semibold text-[var(--foreground)] lg:text-[42px]">
              Your Cart
            </h1>

            <p className="pb-1 text-[10px] text-[var(--foreground)]/45 lg:text-[12px]">
              {items.length}{" "}
              {items.length ===
              1
                ? "item"
                : "items"}
            </p>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="mt-7 grid gap-7 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-12">
          {/* Cart Items */}
          <div>
            {/* Select All */}
            <div className="flex items-center justify-between border-b border-[var(--primary)]/10 pb-4">
              <button
                type="button"
                onClick={
                  toggleSelectAll
                }
                className="flex items-center gap-2.5"
              >
                <span
                  className={`
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-[6px]
                    border
                    transition
                    ${
                      allSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--primary)]/20 bg-white"
                    }
                  `}
                >
                  {allSelected && (
                    <Check
                      size={
                        12
                      }
                      strokeWidth={
                        2.2
                      }
                    />
                  )}
                </span>

                <span className="text-[10px] font-semibold text-[var(--foreground)] lg:text-[11px]">
                  Select All
                </span>
              </button>

              <p className="text-[9px] text-[var(--foreground)]/40 lg:text-[10px]">
                {
                  selectedItems.length
                }{" "}
                selected
              </p>
            </div>

            {/* Items */}
            <div className="mt-3 space-y-3.5">
              <AnimatePresence
                initial={false}
              >
                {items.map(
                  (item) => {
                    const selected =
                      isSelected(
                        item.cartItemId
                      );

                    return (
                      <motion.article
                        layout
                        key={
                          item.cartItemId
                        }
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                        transition={{
                          duration:
                            0.25,
                        }}
                        className="
                          relative
                          rounded-[20px]
                          border
                          border-[var(--primary)]/10
                          bg-[var(--white)]
                          p-3
                          lg:rounded-[24px]
                          lg:p-4
                        "
                      >
                        <div className="flex gap-3 lg:gap-4">
                          {/* Select */}
                          <button
                            type="button"
                            onClick={() =>
                              toggleItem(
                                item.cartItemId
                              )
                            }
                            aria-label={
                              selected
                                ? `Deselect ${item.name}`
                                : `Select ${item.name}`
                            }
                            className={`
                              mt-1
                              flex
                              h-5
                              w-5
                              shrink-0
                              items-center
                              justify-center
                              rounded-[6px]
                              border
                              transition
                              ${
                                selected
                                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                                  : "border-[var(--primary)]/20 bg-white"
                              }
                            `}
                          >
                            {selected && (
                              <Check
                                size={
                                  12
                                }
                                strokeWidth={
                                  2.2
                                }
                              />
                            )}
                          </button>

                          {/* Image */}
                          <Link
                            href={`/products/${item.slug}`}
                            className="
                              relative
                              h-[92px]
                              w-[92px]
                              shrink-0
                              overflow-hidden
                              rounded-[15px]
                              bg-[var(--surface)]
                              sm:h-[110px]
                              sm:w-[110px]
                              lg:h-[125px]
                              lg:w-[125px]
                              lg:rounded-[18px]
                            "
                          >
                            <Image
                              src={
                                item.image ||
                                "/images/product-placeholder.webp"
                              }
                              alt={
                                item.name
                              }
                              fill
                              sizes="125px"
                              className="object-cover"
                            />
                          </Link>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link
                                  href={`/products/${item.slug}`}
                                >
                                  <h2 className="line-clamp-2 font-serif text-[15px] font-semibold leading-tight text-[var(--foreground)] transition hover:text-[var(--primary)] lg:text-[20px]">
                                    {
                                      item.name
                                    }
                                  </h2>
                                </Link>

                                {item.selectedSize && (
                                  <p className="mt-1.5 text-[9px] text-[var(--foreground)]/50 lg:text-[10px]">
                                    Size:{" "}
                                    <span className="font-medium text-[var(--foreground)]/65">
                                      {
                                        item.selectedSize
                                      }
                                    </span>
                                  </p>
                                )}

                                {item.message && (
                                  <p className="mt-1 max-w-[320px] truncate text-[9px] text-[var(--foreground)]/50 lg:text-[10px]">
                                    Message:{" "}
                                    <span className="text-[var(--foreground)]/65">
                                      “
                                      {
                                        item.message
                                      }
                                      ”
                                    </span>
                                  </p>
                                )}
                              </div>

                              {/* Remove */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemove(
                                    item.cartItemId
                                  )
                                }
                                aria-label={`Remove ${item.name}`}
                                className="
                                  flex
                                  h-8
                                  w-8
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  text-[var(--foreground)]/35
                                  transition
                                  hover:bg-[var(--surface)]
                                  hover:text-red-500
                                "
                              >
                                <Trash2
                                  size={
                                    15
                                  }
                                  strokeWidth={
                                    1.6
                                  }
                                />
                              </button>
                            </div>

                            {/* Price + Quantity */}
                            <div className="mt-3 flex items-end justify-between gap-3 lg:mt-5">
                              <div>
                                <p className="text-[13px] font-bold text-[var(--primary)] lg:text-[15px]">
                                  AED{" "}
                                  {(
                                    item.price *
                                    item.quantity
                                  ).toFixed(
                                    2
                                  )}
                                </p>

                                {item.quantity >
                                  1 && (
                                  <p className="mt-0.5 text-[8px] text-[var(--foreground)]/35 lg:text-[9px]">
                                    AED{" "}
                                    {item.price.toFixed(
                                      2
                                    )}{" "}
                                    each
                                  </p>
                                )}
                              </div>

                              {/* Quantity */}
                              <div
                                className="
                                  flex
                                  h-[38px]
                                  items-center
                                  rounded-full
                                  border
                                  border-[var(--primary)]/15
                                  bg-[var(--background)]
                                  px-1
                                  lg:h-[42px]
                                "
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartItemId,
                                      item.quantity -
                                        1
                                    )
                                  }
                                  disabled={
                                    item.quantity <=
                                    1
                                  }
                                  aria-label="Decrease quantity"
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-[var(--foreground)]
                                    transition
                                    hover:bg-[var(--surface)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-25
                                  "
                                >
                                  <Minus
                                    size={
                                      13
                                    }
                                    strokeWidth={
                                      1.8
                                    }
                                  />
                                </button>

                                <span className="min-w-[25px] text-center text-[10px] font-semibold text-[var(--foreground)] lg:text-[11px]">
                                  {
                                    item.quantity
                                  }
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartItemId,
                                      item.quantity +
                                        1
                                    )
                                  }
                                  disabled={
                                    item.quantity >=
                                    item.stock
                                  }
                                  aria-label="Increase quantity"
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-[var(--foreground)]
                                    transition
                                    hover:bg-[var(--surface)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-25
                                  "
                                >
                                  <Plus
                                    size={
                                      13
                                    }
                                    strokeWidth={
                                      1.8
                                    }
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  }
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <motion.aside
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.1,
            }}
            className="
              rounded-[24px]
              border
              border-[var(--primary)]/10
              bg-[var(--white)]
              p-5
              shadow-[0_15px_50px_rgba(45,32,32,0.06)]
              lg:sticky
              lg:top-[110px]
              lg:rounded-[28px]
              lg:p-7
            "
          >
            <h2 className="font-serif text-[23px] font-semibold text-[var(--foreground)] lg:text-[27px]">
              Order Summary
            </h2>

            <p className="mt-1 text-[9px] text-[var(--foreground)]/40">
              Only selected items
              will be checked out.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground)]/50 lg:text-[11px]">
                  Selected
                </span>

                <span className="text-[10px] font-medium text-[var(--foreground)] lg:text-[11px]">
                  {selectedCount}{" "}
                  {selectedCount ===
                  1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground)]/50 lg:text-[11px]">
                  Subtotal
                </span>

                <span className="text-[10px] font-medium text-[var(--foreground)] lg:text-[11px]">
                  AED{" "}
                  {subtotal.toFixed(
                    2
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground)]/50 lg:text-[11px]">
                  Delivery
                </span>

                <span className="text-[9px] text-[var(--foreground)]/40">
                  Calculated at
                  checkout
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-[var(--primary)]/10" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/40">
                  Total
                </p>

                <p className="mt-1 text-[8px] text-[var(--foreground)]/30">
                  Before delivery
                </p>
              </div>

              <p className="text-[24px] font-bold text-[var(--primary)] lg:text-[27px]">
                AED{" "}
                {subtotal.toFixed(
                  2
                )}
              </p>
            </div>

            {selectedCount >
            0 ? (
              <Link
                href="/checkout"
                className="
                  mt-6
                  flex
                  h-[50px]
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-[11px]
                  font-semibold
                  text-[var(--white)]
                  transition
                  hover:opacity-90
                  lg:h-[54px]
                  lg:text-[12px]
                "
              >
                Checkout{" "}
                {selectedCount}{" "}
                {selectedCount ===
                1
                  ? "Item"
                  : "Items"}
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="
                  mt-6
                  flex
                  h-[50px]
                  w-full
                  cursor-not-allowed
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-[11px]
                  font-semibold
                  text-[var(--white)]
                  opacity-35
                  lg:h-[54px]
                "
              >
                Select Items to
                Checkout
              </button>
            )}

            <Link
              href="/products"
              className="
                mt-4
                flex
                h-10
                items-center
                justify-center
                gap-1.5
                text-[10px]
                font-semibold
                text-[var(--primary)]
                transition
                hover:opacity-65
              "
            >
              <ChevronLeft
                size={13}
                strokeWidth={
                  1.8
                }
              />

              Continue Shopping
            </Link>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
