"use client";

import {
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ShoppingCart,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useRouter,
} from "next/navigation";

import {
  useCart,
} from "@/context/CartContext";

import CartToast from "@/components/cart/CartToast";

import type {
  Product,
} from "@/types/product";

type BestSellersProps = {
  products: Product[];
};

export default function BestSellers({
  products,
}: BestSellersProps) {
  const router = useRouter();

  const { addItem } =
    useCart();

  const [
    paused,
    setPaused,
  ] = useState(false);

  const [
    toastProduct,
    setToastProduct,
  ] = useState("");

  const toastTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | undefined
    >(undefined);

  const showToast = (
    productName: string
  ) => {
    setToastProduct(
      productName
    );

    if (
      toastTimer.current
    ) {
      clearTimeout(
        toastTimer.current
      );
    }

    toastTimer.current =
      setTimeout(() => {
        setToastProduct("");
      }, 2500);
  };

  const handleAddToCart = (
    product: Product
  ) => {
    /*
     * Do not guess the size.
     * Open details when options
     * need to be selected.
     */
    if (
      product.sizes.length >
      0
    ) {
      router.push(
        `/products/${product.slug}`
      );

      return;
    }

    if (
      product.stock <= 0
    ) {
      return;
    }

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
        product.price,

      quantity: 1,

      stock:
        product.stock,
    });

    showToast(
      product.name
    );
  };

  if (
    products.length === 0
  ) {
    return null;
  }

  return (
    <>
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
                strokeWidth={
                  1.8
                }
              />
            </Link>
          </motion.div>

          {/* Slider */}
          <div
            className="mt-5 w-full overflow-hidden lg:mt-7"
            onMouseEnter={() =>
              setPaused(true)
            }
            onMouseLeave={() =>
              setPaused(false)
            }
          >
            <motion.div
              className="flex w-max gap-3 lg:gap-5"
              animate={{
                x: paused
                  ? undefined
                  : [
                      "0%",
                      "-50%",
                    ],
              }}
              transition={{
                x: {
                  duration: 55,
                  repeat:
                    Infinity,
                  repeatType:
                    "loop",
                  ease: "linear",
                },
              }}
            >
              {/* First Set */}
              <ProductSet
                products={
                  products
                }
                setKey="first"
                onAddToCart={
                  handleAddToCart
                }
              />

              {/* Duplicate Set */}
              <ProductSet
                products={
                  products
                }
                setKey="second"
                onAddToCart={
                  handleAddToCart
                }
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CartToast
        show={
          Boolean(
            toastProduct
          )
        }
        productName={
          toastProduct
        }
        onClose={() =>
          setToastProduct("")
        }
      />
    </>
  );
}

type ProductSetProps = {
  products: Product[];

  setKey: string;

  onAddToCart: (
    product: Product
  ) => void;
};

function ProductSet({
  products,
  setKey,
  onAddToCart,
}: ProductSetProps) {
  return (
    <div className="flex shrink-0 gap-3 pl-3 lg:gap-5 lg:pl-5">
      {products.map(
        (product) => (
          <article
            key={`${setKey}-${product._id}`}
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
              href={`/products/${product.slug}`}
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
                  src={
                    product
                      .images[0] ||
                    "/images/product-placeholder.webp"
                  }
                  alt={
                    product.name
                  }
                  fill
                  sizes="(max-width: 640px) 155px, (max-width: 1024px) 190px, 270px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="pt-2.5">
                <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--accent)] lg:text-[10px]">
                  {
                    product
                      .category
                      .name
                  }
                </p>

                <h3 className="mt-1 line-clamp-1 text-[12px] font-semibold text-[var(--foreground)] lg:text-[15px]">
                  {
                    product.name
                  }
                </h3>

                {/* Price + Cart */}
                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-[12px] font-bold text-[var(--primary)] lg:text-[14px]">
                    AED{" "}
                    {
                      product.price
                    }
                  </p>

                  <button
                    type="button"
                    aria-label={
                      product
                        .sizes
                        .length >
                      0
                        ? `Choose options for ${product.name}`
                        : `Add ${product.name} to cart`
                    }
                    disabled={
                      product.stock <=
                      0
                    }
                    onClick={(
                      event
                    ) => {
                      event.preventDefault();

                      event.stopPropagation();

                      onAddToCart(
                        product
                      );
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
                      size={14}
                      strokeWidth={
                        1.8
                      }
                      className="lg:h-4 lg:w-4"
                    />
                  </button>
                </div>
              </div>
            </Link>
          </article>
        )
      )}
    </div>
  );
}