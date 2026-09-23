import Link from "next/link";

import {
  ChevronRight,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

const items = [
  {
    title: "Profile Information",
    description:
      "Manage your personal details",
    href: "/account/profile",
    icon: UserRound,
  },
  {
    title: "My Orders",
    description:
      "View and track your orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Saved Addresses",
    description:
      "Manage delivery addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
];

export default function AccountNavigation() {
  return (
    <section
      className="
        rounded-[20px]
        border
        border-[var(--primary)]/8
        bg-white
        p-4
        shadow-[0_8px_30px_rgba(45,32,32,0.035)]
        sm:rounded-[26px]
        sm:p-6
      "
    >
      <p
        className="
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-[var(--accent)]
          sm:text-[8px]
        "
      >
        Account
      </p>

      <h2
        className="
          mt-1
          font-serif
          text-[21px]
          font-semibold
          leading-tight
          text-[var(--foreground)]
          sm:text-[24px]
        "
      >
        Manage Account
      </h2>

      <div
        className="
          mt-4
          space-y-2
          sm:mt-5
          sm:space-y-3
        "
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                group
                flex
                min-h-[66px]
                items-center
                gap-3
                rounded-[16px]
                border
                border-[var(--primary)]/8
                px-3
                py-2.5
                transition
                hover:border-[var(--primary)]/20
                hover:bg-[var(--surface)]/35
                sm:min-h-[78px]
                sm:px-4
                sm:py-3.5
              "
            >
              <div
                className="
                  flex
                  h-[38px]
                  w-[38px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--surface)]
                  text-[var(--primary)]
                  sm:h-[44px]
                  sm:w-[44px]
                "
              >
                <Icon
                  size={16}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[10px]
                    font-semibold
                    text-[var(--foreground)]
                    sm:text-[11px]
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[8px]
                    text-[var(--foreground)]/38
                    sm:text-[9px]
                  "
                >
                  {item.description}
                </p>
              </div>

              <ChevronRight
                size={15}
                className="
                  shrink-0
                  text-[var(--foreground)]/20
                  transition
                  group-hover:translate-x-0.5
                  group-hover:text-[var(--primary)]
                "
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}