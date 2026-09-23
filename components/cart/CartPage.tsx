"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

type CartItem = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  message?: string;
  selected: boolean;
};

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    category: "Cakes",
    image: "/images/products/chocolate-cake.webp",
    price: 120,
    quantity: 1,
    size: "Medium",
    message: "Happy Birthday Sara",
    selected: true,
  },
  {
    id: 3,
    name: "Chocolate Brownies",
    category: "Brownies",
    image: "/images/products/brownies.webp",
    price: 55,
    quantity: 2,
    selected: true,
  },
  {
    id: 6,
    name: "Chocolate Cookies",
    category: "Cookies",
    image: "/images/products/chocolate-cookies.webp",
    price: 45,
    quantity: 1,
    selected: false,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] =
    useState<CartItem[]>(initialCartItems);

  const selectedItems = useMemo(
    () =>
      cartItems.filter(
        (item) => item.selected
      ),
    [cartItems]
  );

  const selectedQuantity = useMemo(
    () =>
      selectedItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [selectedItems]
  );

  const subtotal = useMemo(
    () =>
      selectedItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      ),
    [selectedItems]
  );

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every(
      (item) => item.selected
    );

  const toggleItem = (id: number) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
            }
          : item
      )
    );
  };

  const toggleAll = () => {
    const nextSelected = !allSelected;

    setCartItems((current) =>
      current.map((item) => ({
        ...item,
        selected: nextSelected,
      }))
    );
  };

  const increaseQuantity = (
    id: number
  ) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (
    id: number
  ) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[var(--background)] px-5 pb-[90px] lg:pb-0">
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
              strokeWidth={1.5}
              className="text-[var(--primary)]"
            />
          </div>

          <h1 className="mt-5 font-serif text-[28px] font-semibold text-[var(--foreground)] lg:text-[36px]">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-2 max-w-[330px] text-[11px] leading-5 text-[var(--foreground)]/55 lg:text-[13px]">
            Add something sweet and
            come back when you&apos;re
            ready.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-[46px] items-center justify-center rounded-full bg-[var(--primary)] px-7 text-[11px] font-semibold text-[var(--white)]"
          >
            Explore Desserts
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-[105px] lg:pb-16">
      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-10 lg:py-12 xl:px-12">
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
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] lg:text-[11px]">
            Your Selection
          </p>

          <div className="mt-1 flex items-end justify-between gap-4">
            <h1 className="font-serif text-[30px] font-semibold text-[var(--foreground)] sm:text-[34px] lg:text-[44px]">
              Your Cart
            </h1>

            <span className="mb-1 text-[10px] text-[var(--foreground)]/45 lg:text-[12px]">
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}
            </span>
          </div>
        </motion.div>

        <div className="mt-7 grid items-start gap-8 lg:mt-10 lg:grid-cols-[1fr_390px] lg:gap-12 xl:grid-cols-[1fr_420px]">
          {/* Cart Items */}
          <div>
            {/* Select All */}
            <div className="mb-3 flex items-center justify-between border-b border-[var(--primary)]/10 pb-4">
              <button
                type="button"
                onClick={toggleAll}
                className="flex items-center gap-2.5"
              >
                <Checkbox
                  checked={allSelected}
                />

                <span className="text-[10px] font-semibold text-[var(--foreground)] lg:text-[12px]">
                  Select All
                </span>
              </button>

              <span className="text-[9px] text-[var(--foreground)]/40 lg:text-[10px]">
                {selectedItems.length}{" "}
                selected
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3 lg:space-y-4">
              {cartItems.map(
                (item, index) => (
                  <motion.article
                    key={item.id}
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
                      duration: 0.35,
                      delay:
                        index * 0.04,
                    }}
                    className={`
                      rounded-[20px]
                      border
                      bg-[var(--white)]
                      p-3
                      transition-all
                      lg:rounded-[24px]
                      lg:p-4
                      ${
                        item.selected
                          ? "border-[var(--primary)]/20"
                          : "border-[var(--primary)]/8 opacity-70"
                      }
                    `}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {/* Select */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleItem(
                            item.id
                          )
                        }
                        aria-label={`Select ${item.name}`}
                        className="self-start pt-1"
                      >
                        <Checkbox
                          checked={
                            item.selected
                          }
                        />
                      </button>

                      {/* Image */}
                      <Link
                        href={`/products/${item.id}`}
                        className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[15px] bg-[var(--surface)] sm:h-[105px] sm:w-[105px] lg:h-[120px] lg:w-[120px] lg:rounded-[18px]"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] lg:text-[9px]">
                              {
                                item.category
                              }
                            </p>

                            <Link
                              href={`/products/${item.id}`}
                              className="mt-0.5 block truncate font-serif text-[15px] font-semibold text-[var(--foreground)] sm:text-[17px] lg:text-[19px]"
                            >
                              {
                                item.name
                              }
                            </Link>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(
                                item.id
                              )
                            }
                            aria-label={`Remove ${item.name}`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--foreground)]/35 transition hover:bg-[var(--surface)] hover:text-[var(--primary)]"
                          >
                            <Trash2
                              size={15}
                              strokeWidth={
                                1.7
                              }
                            />
                          </button>
                        </div>

                        {/* Options */}
                        {(item.size ||
                          item.message) && (
                          <div className="mt-1.5 space-y-0.5">
                            {item.size && (
                              <p className="text-[9px] text-[var(--foreground)]/50 lg:text-[10px]">
                                Size:{" "}
                                <span className="font-medium text-[var(--foreground)]/70">
                                  {
                                    item.size
                                  }
                                </span>
                              </p>
                            )}

                            {item.message && (
                              <p className="truncate text-[9px] text-[var(--foreground)]/50 lg:text-[10px]">
                                Message:{" "}
                                <span className="font-medium text-[var(--foreground)]/70">
                                  &quot;
                                  {
                                    item.message
                                  }
                                  &quot;
                                </span>
                              </p>
                            )}
                          </div>
                        )}

                        {/* Price + Quantity */}
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-[13px] font-bold text-[var(--primary)] lg:text-[15px]">
                            AED{" "}
                            {item.price *
                              item.quantity}
                          </p>

                          <div className="flex h-[34px] items-center rounded-full border border-[var(--primary)]/15 bg-[var(--background)] px-1 lg:h-[38px]">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              disabled={
                                item.quantity ===
                                1
                              }
                              aria-label="Decrease quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[var(--surface)] disabled:opacity-30 lg:h-8 lg:w-8"
                            >
                              <Minus
                                size={12}
                              />
                            </button>

                            <span className="w-7 text-center text-[10px] font-semibold text-[var(--foreground)] lg:text-[11px]">
                              {
                                item.quantity
                              }
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                              aria-label="Increase quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[var(--surface)] lg:h-8 lg:w-8"
                            >
                              <Plus
                                size={12}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              )}
            </div>
          </div>

          {/* Summary */}
          <motion.aside
            initial={{
              opacity: 0,
              x: 15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="rounded-[24px] border border-[var(--primary)]/10 bg-[var(--white)] p-5 shadow-[0_12px_40px_rgba(45,32,32,0.04)] lg:sticky lg:top-[100px] lg:rounded-[28px] lg:p-7"
          >
            <h2 className="font-serif text-[22px] font-semibold text-[var(--foreground)] lg:text-[26px]">
              Order Summary
            </h2>

            <p className="mt-1 text-[9px] text-[var(--foreground)]/45 lg:text-[10px]">
              Only selected items will
              be checked out.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground)]/55 lg:text-[12px]">
                  Selected
                </span>

                <span className="text-[10px] font-medium text-[var(--foreground)] lg:text-[12px]">
                  {selectedQuantity}{" "}
                  {selectedQuantity === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground)]/55 lg:text-[12px]">
                  Subtotal
                </span>

                <span className="text-[10px] font-medium text-[var(--foreground)] lg:text-[12px]">
                  AED {subtotal}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground)]/55 lg:text-[12px]">
                  Delivery
                </span>

                <span className="text-[9px] text-[var(--foreground)]/45 lg:text-[10px]">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="my-5 h-px bg-[var(--primary)]/10" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--foreground)]/40">
                  Total
                </p>

                <p className="mt-1 text-[9px] text-[var(--foreground)]/35">
                  Before delivery
                </p>
              </div>

              <p className="text-[22px] font-bold text-[var(--primary)] lg:text-[25px]">
                AED {subtotal}
              </p>
            </div>

            <Link
              href={
                selectedItems.length > 0
                  ? "/checkout"
                  : "#"
              }
              onClick={(event) => {
                if (
                  selectedItems.length ===
                  0
                ) {
                  event.preventDefault();
                }
              }}
              className={`
                mt-6
                flex
                h-[50px]
                w-full
                items-center
                justify-center
                rounded-full
                text-[11px]
                font-semibold
                transition-all
                lg:h-[54px]
                lg:text-[12px]
                ${
                  selectedItems.length >
                  0
                    ? "bg-[var(--primary)] text-[var(--white)] hover:scale-[1.01] hover:opacity-90"
                    : "cursor-not-allowed bg-[var(--surface)] text-[var(--foreground)]/30"
                }
              `}
            >
              {selectedItems.length > 0
                ? `Checkout ${selectedQuantity} ${
                    selectedQuantity ===
                    1
                      ? "Item"
                      : "Items"
                  }`
                : "Select Items to Checkout"}
            </Link>

            <Link
              href="/products"
              className="mt-3 flex h-[42px] w-full items-center justify-center text-[10px] font-semibold text-[var(--primary)] lg:text-[11px]"
            >
              Continue Shopping
            </Link>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}

function Checkbox({
  checked,
}: {
  checked: boolean;
}) {
  return (
    <span
      className={`
        flex
        h-[19px]
        w-[19px]
        shrink-0
        items-center
        justify-center
        rounded-[6px]
        border
        transition-all
        lg:h-[21px]
        lg:w-[21px]
        ${
          checked
            ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--white)]"
            : "border-[var(--primary)]/25 bg-[var(--white)]"
        }
      `}
    >
      {checked && (
        <Check
          size={12}
          strokeWidth={2.4}
        />
      )}
    </span>
  );
}