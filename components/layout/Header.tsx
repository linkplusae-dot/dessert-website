"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Search,
  UserRound,
  ShoppingBag,
} from "lucide-react";

import {
  useCart,
} from "@/context/CartContext";

export default function Header() {
  const {
    cartCount,
    isLoaded,
  } = useCart();

  return (
    <header className="relative z-40 w-full bg-[var(--background)]">
      {/* Desktop */}
      <div className="mx-auto hidden h-[92px] max-w-[1440px] items-center gap-10 px-8 lg:flex xl:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0"
        >
          <Image
            src="/logo/logo.png"
            alt="Dessert brand"
            width={150}
            height={60}
            priority
            className="h-auto w-[135px] object-contain"
          />
        </Link>

        {/* Search */}
        <div className="mx-auto w-full max-w-[620px]">
          <div className="flex h-[48px] items-center gap-3 rounded-full border border-[var(--accent)]/60 bg-white/70 px-5 transition focus-within:border-[var(--primary)] focus-within:bg-white">
            <Search
              size={20}
              strokeWidth={1.8}
              className="shrink-0 text-[var(--primary)]"
            />

            <input
              type="search"
              placeholder="Search for desserts..."
              className="h-full w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--foreground)]/45"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-6">
          <Link
            href="/account"
            aria-label="My account"
            className="text-[var(--primary)] transition hover:opacity-70"
          >
            <UserRound
              size={25}
              strokeWidth={1.6}
            />
          </Link>

          <Link
            href="/cart"
            aria-label={`Shopping cart${
              isLoaded && cartCount > 0
                ? `, ${cartCount} items`
                : ""
            }`}
            className="relative text-[var(--primary)] transition hover:opacity-70"
          >
            <ShoppingBag
              size={26}
              strokeWidth={1.6}
            />

            {isLoaded &&
              cartCount > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-semibold text-[var(--white)]">
                  {cartCount >
                  99
                    ? "99+"
                    : cartCount}
                </span>
              )}
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-[76px] items-center justify-center px-5 lg:hidden">
        <Link
          href="/"
          aria-label="Home"
        >
          <Image
            src="/logo/logo.png"
            alt="Dessert brand"
            width={130}
            height={52}
            priority
            className="h-auto w-[115px] object-contain"
          />
        </Link>
      </div>
    </header>
  );
}