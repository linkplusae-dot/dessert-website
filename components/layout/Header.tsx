"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, UserRound, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="relative z-40 w-full bg-[#FFF9F5]">
      {/* Desktop */}
      <div className="mx-auto hidden h-[92px] max-w-[1440px] items-center gap-10 px-8 lg:flex xl:px-12">
        {/* Logo */}
        <Link href="/" className="shrink-0">
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
          <div className="flex h-[48px] items-center gap-3 rounded-full border border-[#D59AA5]/60 bg-white/70 px-5 transition focus-within:border-[#7A4650] focus-within:bg-white">
            <Search
              size={20}
              strokeWidth={1.8}
              className="shrink-0 text-[#7A4650]"
            />

            <input
              type="search"
              placeholder="Search for desserts..."
              className="h-full w-full bg-transparent text-sm text-[#2D2020] outline-none placeholder:text-[#2D2020]/45"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-6">
          <Link
            href="/account"
            aria-label="My account"
            className="text-[#7A4650] transition hover:opacity-70"
          >
            <UserRound size={25} strokeWidth={1.6} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative text-[#7A4650] transition hover:opacity-70"
          >
            <ShoppingBag size={26} strokeWidth={1.6} />

            <span className="absolute -right-2.5 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#7A4650] px-1 text-[10px] font-semibold text-white">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-[76px] items-center justify-center px-5 lg:hidden">
        <Link href="/" aria-label="Home">
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