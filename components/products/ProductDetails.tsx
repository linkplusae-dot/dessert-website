"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    category: "Cakes",
    price: 120,

    images: [
      "/images/products/chocolate-cake.webp",
      "/images/products/chocolate-cake.webp",
      "/images/products/chocolate-cake.webp",
    ],

    description:
      "Rich chocolate cake layered with smooth chocolate cream and finished with an indulgent chocolate topping. Freshly prepared for birthdays, celebrations and every sweet moment.",

    sizes: [
      {
        label: "Small",
        value: "small",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Large",
        value: "large",
      },
    ],

    messageAvailable: true,

    details: [
      "Freshly made to order",
      "Prepared with carefully selected ingredients",
      "Perfect for celebrations and gifting",
    ],

    storage:
      "Keep refrigerated. For the best taste and texture, allow the cake to sit at room temperature for a short time before serving.",

    allergens:
      "Contains dairy, eggs and wheat. Please contact us before ordering if you have specific allergy concerns.",
  },

  {
    id: 2,
    name: "Strawberry Cupcakes",
    category: "Cupcakes",
    price: 65,

    images: [
      "/images/products/strawberry-cupcakes.webp",
      "/images/products/strawberry-cupcakes.webp",
      "/images/products/strawberry-cupcakes.webp",
    ],

    description:
      "Soft cupcakes topped with creamy strawberry frosting and a delicate strawberry finish.",

    sizes: [],

    messageAvailable: false,

    details: [
      "Freshly made",
      "Soft and creamy",
      "Perfect for celebrations",
    ],

    storage:
      "Keep refrigerated and store in a covered container.",

    allergens:
      "Contains dairy, eggs and wheat.",
  },

  {
    id: 3,
    name: "Chocolate Brownies",
    category: "Brownies",
    price: 55,

    images: [
      "/images/products/brownies.webp",
      "/images/products/brownies.webp",
      "/images/products/brownies.webp",
    ],

    description:
      "Rich and fudgy chocolate brownies with a soft centre and deep chocolate flavour.",

    sizes: [],

    messageAvailable: false,

    details: [
      "Freshly baked",
      "Rich chocolate flavour",
      "Perfect for sharing",
    ],

    storage:
      "Store in a cool, dry place in an airtight container.",

    allergens:
      "Contains dairy, eggs and wheat.",
  },

  {
    id: 4,
    name: "Dessert Box",
    category: "Gift Boxes",
    price: 95,

    images: [
      "/images/products/dessert-box.webp",
      "/images/products/dessert-box.webp",
      "/images/products/dessert-box.webp",
    ],

    description:
      "A carefully prepared dessert selection presented beautifully for gifting, celebrations or simply treating yourself.",

    sizes: [],

    messageAvailable: false,

    details: [
      "Beautifully presented",
      "Fresh dessert selection",
      "Perfect for gifting",
    ],

    storage:
      "Storage depends on the desserts included in the box. Keep refrigerated where required.",

    allergens:
      "May contain dairy, eggs, wheat and nuts.",
  },

  {
    id: 5,
    name: "Lotus Cheesecake",
    category: "Cakes",
    price: 110,

    images: [
      "/images/products/lotus-cheesecake.webp",
      "/images/products/lotus-cheesecake.webp",
      "/images/products/lotus-cheesecake.webp",
    ],

    description:
      "Creamy cheesecake with the unmistakable caramelised flavour of Lotus biscuits and a smooth, indulgent finish.",

    sizes: [
      {
        label: "Small",
        value: "small",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Large",
        value: "large",
      },
    ],

    messageAvailable: true,

    details: [
      "Freshly made",
      "Creamy cheesecake filling",
      "Finished with Lotus biscuit flavour",
    ],

    storage:
      "Keep refrigerated until ready to serve.",

    allergens:
      "Contains dairy, wheat and may contain eggs.",
  },

  {
    id: 6,
    name: "Chocolate Cookies",
    category: "Cookies",
    price: 45,

    images: [
      "/images/products/chocolate-cookies.webp",
      "/images/products/chocolate-cookies.webp",
      "/images/products/chocolate-cookies.webp",
    ],

    description:
      "Freshly baked chocolate cookies with a soft centre and rich chocolate flavour.",

    sizes: [],

    messageAvailable: false,

    details: [
      "Freshly baked",
      "Soft centre",
      "Rich chocolate flavour",
    ],

    storage:
      "Store in an airtight container in a cool, dry place.",

    allergens:
      "Contains dairy, eggs and wheat.",
  },

  {
    id: 7,
    name: "Strawberry Dessert Cup",
    category: "Dessert Cups",
    price: 38,

    images: [
      "/images/products/strawberry-dessert-cup.webp",
      "/images/products/strawberry-dessert-cup.webp",
      "/images/products/strawberry-dessert-cup.webp",
    ],

    description:
      "A light and creamy strawberry dessert cup, prepared fresh for a sweet individual treat.",

    sizes: [],

    messageAvailable: false,

    details: [
      "Freshly prepared",
      "Creamy strawberry flavour",
      "Perfect for an individual treat",
    ],

    storage:
      "Keep refrigerated until ready to enjoy.",

    allergens:
      "Contains dairy, eggs and wheat.",
  },

  {
    id: 8,
    name: "Mini Celebration Cake",
    category: "Cakes",
    price: 85,

    images: [
      "/images/products/mini-celebration-cake.webp",
      "/images/products/mini-celebration-cake.webp",
      "/images/products/mini-celebration-cake.webp",
    ],

    description:
      "A beautifully finished mini cake made for intimate celebrations and sweet special moments.",

    sizes: [],

    messageAvailable: true,

    details: [
      "Freshly made to order",
      "Ideal for small celebrations",
      "Beautifully finished",
    ],

    storage:
      "Keep refrigerated. Let the cake sit at room temperature briefly before serving for the best texture.",

    allergens:
      "Contains dairy, eggs and wheat.",
  },
];

type ProductDetailsProps = {
  productId: string;
};

export default function ProductDetails({
  productId,
}: ProductDetailsProps) {
  const product = products.find(
    (item) => item.id === Number(productId)
  );

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [message, setMessage] =
    useState("");

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[var(--background)] px-5">
        <div className="text-center">
          <h1 className="font-serif text-[28px] font-semibold text-[var(--foreground)]">
            Dessert not found
          </h1>

          <Link
            href="/products"
            className="mt-5 inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-[11px] font-semibold text-white"
          >
            Back to Desserts
          </Link>
        </div>
      </main>
    );
  }

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] pb-[90px] lg:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 py-5 lg:px-10 lg:py-9 xl:px-12">
        {/* Main Product */}
        <div className="mt-5 grid gap-7 lg:mt-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          {/* Gallery */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {/* Main Image */}
            <div
              className="
                relative
                aspect-square
                w-full
                overflow-hidden
                rounded-[22px]
                bg-[var(--surface)]
                sm:aspect-[1.08/1]
                lg:aspect-square
                lg:max-h-[620px]
                lg:rounded-[28px]
              "
            >
              <Image
                src={
                  product.images[
                    selectedImage
                  ]
                }
                alt={product.name}
                fill
                priority
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2.5 lg:mt-4 lg:gap-3">
                {product.images.map(
                  (image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() =>
                        setSelectedImage(
                          index
                        )
                      }
                      aria-label={`View ${product.name} image ${
                        index + 1
                      }`}
                      className={`
                        relative
                        h-[58px]
                        w-[58px]
                        overflow-hidden
                        rounded-[12px]
                        border-2
                        transition-all
                        sm:h-[68px]
                        sm:w-[68px]
                        lg:h-[78px]
                        lg:w-[78px]
                        lg:rounded-[15px]
                        ${
                          selectedImage ===
                          index
                            ? "border-[var(--primary)]"
                            : "border-transparent opacity-65 hover:opacity-100"
                        }
                      `}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            )}

            {/* Desktop Description */}
            <div className="mt-7 hidden lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Description
              </p>

              <p className="mt-3 max-w-[620px] text-[13px] leading-6 text-[var(--foreground)]/65">
                {product.description}
              </p>
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="lg:sticky lg:top-[100px] lg:self-start"
          >
            {/* Category */}
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] lg:text-[11px]">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-1.5 font-serif text-[29px] font-semibold leading-tight text-[var(--foreground)] sm:text-[34px] lg:mt-2 lg:text-[44px]">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-3 text-[20px] font-bold text-[var(--primary)] lg:mt-4 lg:text-[24px]">
              AED {product.price}
            </p>

            {/* Quantity */}
            <div className="mt-5 lg:mt-6">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/55 lg:text-[10px]">
                Quantity
              </p>

              <div
                className="
                  flex
                  h-[44px]
                  w-[132px]
                  items-center
                  justify-between
                  rounded-full
                  border
                  border-[var(--primary)]/15
                  bg-[var(--white)]
                  px-1
                  lg:h-[48px]
                  lg:w-[145px]
                "
              >
                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                  disabled={
                    quantity === 1
                  }
                  aria-label="Decrease quantity"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-[var(--foreground)]
                    transition
                    hover:bg-[var(--surface)]
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    lg:h-10
                    lg:w-10
                  "
                >
                  <Minus
                    size={15}
                    strokeWidth={1.8}
                  />
                </button>

                <span className="text-[12px] font-semibold text-[var(--foreground)] lg:text-[13px]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                  aria-label="Increase quantity"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-[var(--foreground)]
                    transition
                    hover:bg-[var(--surface)]
                    lg:h-10
                    lg:w-10
                  "
                >
                  <Plus
                    size={15}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </div>

            {/* Size + Message */}
            {(product.sizes.length >
              0 ||
              product.messageAvailable) && (
              <div className="mt-5 lg:mt-6">
                {/* Size */}
                {product.sizes.length >
                  0 && (
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/55 lg:text-[10px]">
                      Select Size
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.sizes.map(
                        (size) => {
                          const selected =
                            selectedSize ===
                            size.value;

                          return (
                            <button
                              key={
                                size.value
                              }
                              type="button"
                              onClick={() =>
                                setSelectedSize(
                                  size.value
                                )
                              }
                              className={`
                                flex
                                h-[38px]
                                min-w-[82px]
                                items-center
                                justify-center
                                gap-1.5
                                rounded-full
                                border
                                px-4
                                text-[10px]
                                font-semibold
                                transition-all
                                lg:h-[42px]
                                lg:min-w-[95px]
                                lg:text-[11px]
                                ${
                                  selected
                                    ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--white)]"
                                    : "border-[var(--primary)]/15 bg-[var(--white)] text-[var(--foreground)] hover:border-[var(--primary)]/40"
                                }
                              `}
                            >
                              {selected && (
                                <Check
                                  size={
                                    12
                                  }
                                  strokeWidth={
                                    2
                                  }
                                />
                              )}

                              {
                                size.label
                              }
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                {/* Message */}
                {product.messageAvailable && (
                  <div
                    className={
                      product.sizes
                        .length > 0
                        ? "mt-5"
                        : ""
                    }
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/55 lg:text-[10px]">
                        Message on Cake
                      </p>

                      <span className="text-[9px] text-[var(--foreground)]/35">
                        Optional
                      </span>
                    </div>

                    <input
                      type="text"
                      value={message}
                      maxLength={40}
                      onChange={(
                        event
                      ) =>
                        setMessage(
                          event.target
                            .value
                        )
                      }
                      placeholder="e.g. Happy Birthday Sara"
                      className="
                        mt-3
                        h-[46px]
                        w-full
                        rounded-[14px]
                        border
                        border-[var(--primary)]/15
                        bg-[var(--white)]
                        px-4
                        text-[11px]
                        text-[var(--foreground)]
                        outline-none
                        transition
                        placeholder:text-[var(--foreground)]/30
                        focus:border-[var(--primary)]/40
                        lg:h-[50px]
                        lg:text-[12px]
                      "
                    />

                    <p className="mt-1.5 text-right text-[8px] text-[var(--foreground)]/35">
                      {message.length}
                      /40
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <button
              type="button"
              onClick={() => {
                // Add to cart logic later
              }}
              className="
                mt-5
                flex
                h-[48px]
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[var(--primary)]
                px-6
                text-[11px]
                font-semibold
                text-[var(--white)]
                shadow-sm
                transition-all
                duration-300
                hover:scale-[1.01]
                hover:opacity-90
                lg:mt-6
                lg:h-[54px]
                lg:text-[13px]
              "
            >
              <ShoppingCart
                size={17}
                strokeWidth={1.8}
              />

              Add to Cart
            </button>

            {/* Mobile Description */}
            <div className="mt-6 border-t border-[var(--primary)]/10 pt-5 lg:hidden">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Description
              </p>

              <p className="mt-2 text-[11px] leading-5 text-[var(--foreground)]/65">
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <section className="mt-10 border-t border-[var(--primary)]/10 pt-8 lg:mt-16 lg:pt-10">
          <div className="grid gap-7 md:grid-cols-3 md:gap-8 lg:gap-12">
            {/* Product Details */}
            <div>
              <h2 className="font-serif text-[19px] font-semibold text-[var(--foreground)] lg:text-[22px]">
                Product Details
              </h2>

              <div className="mt-4 space-y-2.5">
                {product.details.map(
                  (detail) => (
                    <div
                      key={detail}
                      className="flex items-start gap-2.5"
                    >
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                      <p className="text-[10px] leading-5 text-[var(--foreground)]/60 lg:text-[12px]">
                        {detail}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Storage */}
            <div>
              <h2 className="font-serif text-[19px] font-semibold text-[var(--foreground)] lg:text-[22px]">
                Storage
              </h2>

              <p className="mt-4 text-[10px] leading-5 text-[var(--foreground)]/60 lg:text-[12px] lg:leading-6">
                {product.storage}
              </p>
            </div>

            {/* Allergens */}
            <div>
              <h2 className="font-serif text-[19px] font-semibold text-[var(--foreground)] lg:text-[22px]">
                Allergens
              </h2>

              <p className="mt-4 text-[10px] leading-5 text-[var(--foreground)]/60 lg:text-[12px] lg:leading-6">
                {product.allergens}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}