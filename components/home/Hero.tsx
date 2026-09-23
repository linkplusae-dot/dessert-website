"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    desktop: "/images/hero/hero-desktop1.webp",
    mobile: "/images/hero/hero-mobile1.webp",
  },
  {
    desktop: "/images/hero/hero-desktop2.webp",
    mobile: "/images/hero/hero-mobile2.webp",
  },
  {
    desktop: "/images/hero/hero-desktop3.webp",
    mobile: "/images/hero/hero-mobile3.webp",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[var(--surface)]">
      {/* Desktop */}
      <div className="relative hidden h-[500px] w-full lg:block xl:h-[540px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={`desktop-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].desktop}
              alt="Fresh handcrafted desserts"
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/90 via-[var(--background)]/35 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-8 xl:px-12">
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
              duration: 0.6,
            }}
            className="max-w-[580px]"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Freshly Baked
            </p>

            <h1 className="font-serif text-[52px] font-semibold leading-[1.04] tracking-[-0.025em] text-[var(--foreground)] xl:text-[62px]">
              Life is Sweeter
              <br />
              with{" "}
              <span className="italic text-[var(--accent)]">
                Dessert
              </span>
            </h1>

            <p className="mt-5 max-w-[420px] text-[16px] leading-7 text-[var(--foreground)]/70">
              Handcrafted treats made with love, for your special moments.
            </p>

            <Link
              href="#products"
              className="mt-7 inline-flex h-[52px] items-center gap-3 rounded-full bg-[var(--primary)] px-7 text-sm font-medium text-[var(--white)] transition duration-300 hover:opacity-90"
            >
              Explore Now
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-6 bg-[var(--primary)]"
                  : "w-2.5 bg-[var(--accent)]/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="relative h-[460px] w-full overflow-hidden sm:h-[500px] lg:hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={`mobile-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].mobile}
              alt="Fresh handcrafted desserts"
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="scale-[1.04] object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Explore button */}
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
            duration: 0.5,
          }}
          className="absolute bottom-[2%] left-6 z-20"
        >
          <Link
            href="#products"
            className="inline-flex h-[46px] items-center gap-3 rounded-full bg-[var(--primary)] px-6 text-[13px] font-medium text-[var(--white)] shadow-sm transition hover:opacity-90"
          >
            Explore Now

            <ArrowRight
              size={16}
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-6 bg-[var(--primary)]"
                  : "w-2 bg-[var(--accent)]/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}