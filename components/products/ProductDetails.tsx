"use client";

import {
  useState,
} from "react";

import Image from "next/image";

import {
  Check,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useCart,
} from "@/context/CartContext";

import type {
  Product,
} from "@/types/product";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const { addItem } = useCart();

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(0);

  const [
    selectedSize,
    setSelectedSize,
  ] = useState("");

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    sizeError,
    setSizeError,
  ] = useState(false);

  const [
    addedToCart,
    setAddedToCart,
  ] = useState(false);

  const selectedSizeData =
    product.sizes.find(
      (size) =>
        size.label ===
        selectedSize
    );

  const displayPrice =
    selectedSizeData?.price ??
    product.price;

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(
        1,
        current - 1
      )
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(
        product.stock,
        current + 1
      )
    );
  };

  const handleSizeSelect = (
    size: string
  ) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      return;
    }

    if (
      product.sizes.length >
        0 &&
      !selectedSize
    ) {
      setSizeError(true);

      return;
    }

    setSizeError(false);

    addItem({
      productId:
        product._id,

      name:
        product.name,

      slug:
        product.slug,

      image:
        product.images[0] ||
        "",

      price:
        displayPrice,

      quantity,

      stock:
        product.stock,

      selectedSize:
        selectedSize ||
        undefined,

      message:
        message.trim() ||
        undefined,
    });

    setAddedToCart(true);

    window.setTimeout(() => {
      setAddedToCart(false);
    }, 1800);
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
                  ] ||
                  "/images/product-placeholder.webp"
                }
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length >
              1 && (
              <div className="mt-3 flex gap-2.5 lg:mt-4 lg:gap-3">
                {product.images.map(
                  (
                    image,
                    index
                  ) => (
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
                {
                  product.description
                }
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
              {
                product.category
                  .name
              }
            </p>

            {/* Name */}
            <h1 className="mt-1.5 font-serif text-[29px] font-semibold leading-tight text-[var(--foreground)] sm:text-[34px] lg:mt-2 lg:text-[44px]">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-3 text-[20px] font-bold text-[var(--primary)] lg:mt-4 lg:text-[24px]">
              AED{" "}
              {displayPrice}
            </p>

            {/* Stock */}
            <p
              className={`mt-1.5 text-[10px] font-medium ${
                product.stock >
                0
                  ? "text-[var(--foreground)]/45"
                  : "text-red-500"
              }`}
            >
              {product.stock >
              0
                ? "Available"
                : "Sold Out"}
            </p>

            {/* Quantity */}
            {product.stock >
              0 && (
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
                      strokeWidth={
                        1.8
                      }
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
                    disabled={
                      quantity >=
                      product.stock
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
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                      lg:h-10
                      lg:w-10
                    "
                  >
                    <Plus
                      size={15}
                      strokeWidth={
                        1.8
                      }
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Options */}
            {(product.sizes
              .length > 0 ||
              product.allowMessage) && (
              <div className="mt-5 lg:mt-6">
                {/* Size */}
                {product.sizes
                  .length > 0 && (
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/55 lg:text-[10px]">
                      Select Size
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.sizes.map(
                        (size) => {
                          const selected =
                            selectedSize ===
                            size.label;

                          return (
                            <button
                              key={
                                size.label
                              }
                              type="button"
                              onClick={() =>
                                handleSizeSelect(
                                  size.label
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

                              <span>
                                {
                                  size.label
                                }
                              </span>

                              <span className="opacity-70">
                                AED{" "}
                                {
                                  size.price
                                }
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* Size Error */}
                    {sizeError && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -3,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="mt-2 text-[9px] font-medium text-red-500 lg:text-[10px]"
                      >
                        Please select
                        a size.
                      </motion.p>
                    )}
                  </div>
                )}

                {/* Message */}
                {product.allowMessage && (
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
                      value={
                        message
                      }
                      maxLength={
                        40
                      }
                      onChange={(
                        event
                      ) =>
                        setMessage(
                          event
                            .target
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
                      {
                        message.length
                      }
                      /40
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <button
              type="button"
              onClick={
                handleAddToCart
              }
              disabled={
                product.stock <=
                0
              }
              className={`
                mt-5
                flex
                h-[48px]
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-full
                px-6
                text-[11px]
                font-semibold
                text-[var(--white)]
                shadow-sm
                transition-all
                duration-300
                hover:scale-[1.01]
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-40
                lg:mt-6
                lg:h-[54px]
                lg:text-[13px]
                ${
                  addedToCart
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--primary)]"
                }
              `}
            >
              {addedToCart ? (
                <Check
                  size={17}
                  strokeWidth={2}
                />
              ) : (
                <ShoppingCart
                  size={17}
                  strokeWidth={
                    1.8
                  }
                />
              )}

              {product.stock <=
              0
                ? "Sold Out"
                : addedToCart
                  ? "Added to Cart"
                  : "Add to Cart"}
            </button>

            {/* Mobile Description */}
            <div className="mt-6 border-t border-[var(--primary)]/10 pt-5 lg:hidden">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Description
              </p>

              <p className="mt-2 text-[11px] leading-5 text-[var(--foreground)]/65">
                {
                  product.description
                }
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Information */}
        {(product.details
          .length > 0 ||
          product.storage) && (
          <section className="mt-10 border-t border-[var(--primary)]/10 pt-8 lg:mt-16 lg:pt-10">
            <div className="grid gap-7 md:grid-cols-2 md:gap-10 lg:gap-16">
              {/* Product Details */}
              {product.details
                .length > 0 && (
                <div>
                  <h2 className="font-serif text-[19px] font-semibold text-[var(--foreground)] lg:text-[22px]">
                    Product
                    Details
                  </h2>

                  <div className="mt-4 space-y-2.5">
                    {product.details.map(
                      (
                        detail
                      ) => (
                        <div
                          key={
                            detail
                          }
                          className="flex items-start gap-2.5"
                        >
                          <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                          <p className="text-[10px] leading-5 text-[var(--foreground)]/60 lg:text-[12px]">
                            {
                              detail
                            }
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Storage */}
              {product.storage && (
                <div>
                  <h2 className="font-serif text-[19px] font-semibold text-[var(--foreground)] lg:text-[22px]">
                    Storage
                  </h2>

                  <p className="mt-4 text-[10px] leading-5 text-[var(--foreground)]/60 lg:text-[12px] lg:leading-6">
                    {
                      product.storage
                    }
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}