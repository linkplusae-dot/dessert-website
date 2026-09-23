import Link from "next/link";
import {
  ChevronRight,
  Home,
  MapPin,
} from "lucide-react";

export default function SavedAddressPreview() {
  return (
    <section className={cardClass}>
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[var(--accent)]
            "
          >
            Delivery
          </p>

          <h2
            className="
              mt-1
              font-serif
              text-[21px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            Saved Address
          </h2>
        </div>

        <Link
          href="/account/addresses"
          className="
            text-[9px]
            font-semibold
            text-[var(--primary)]
            underline
            underline-offset-4
          "
        >
          Manage
        </Link>
      </div>

      <Link
        href="/account/addresses"
        className="
          group
          mt-5
          flex
          items-start
          gap-3
          rounded-[16px]
          bg-[var(--background)]
          p-4
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
          "
        >
          <Home size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Home
            </p>

            <span
              className="
                rounded-full
                bg-[var(--primary)]
                px-2
                py-0.5
                text-[7px]
                font-semibold
                text-white
              "
            >
              Default
            </span>
          </div>

          <div
            className="
              mt-2
              flex
              items-start
              gap-2
            "
          >
            <MapPin
              size={13}
              className="
                mt-0.5
                shrink-0
                text-[var(--primary)]
              "
            />

            <p
              className="
                text-[9px]
                leading-5
                text-[var(--foreground)]/50
              "
            >
              Apartment 804, Marina Residence
              <br />
              Al Marsa Street, Dubai Marina
              <br />
              Dubai, UAE
            </p>
          </div>
        </div>

        <ChevronRight
          size={15}
          className="
            mt-2
            shrink-0
            text-[var(--foreground)]/25
            transition
            group-hover:translate-x-0.5
          "
        />
      </Link>
    </section>
  );
}

const cardClass = `
  rounded-[22px]
  border
  border-[var(--primary)]/8
  bg-white
  p-4
  shadow-[0_10px_40px_rgba(45,32,32,0.04)]
  sm:rounded-[26px]
  sm:p-6
`;