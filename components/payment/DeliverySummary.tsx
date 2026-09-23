import Link from "next/link";
import {
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

const delivery = {
  name: "Ahmed Daniyal",
  phone: "+971 50 000 0000",
  address:
    "Apartment 804, Marina Residence",
  street: "Al Marsa Street",
  area: "Dubai Marina",
  emirate: "Dubai",
};

export default function DeliverySummary() {
  return (
    <section className={cardClass}>
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="flex gap-3">
          <div
            className="
              flex
              h-[40px]
              w-[40px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--surface)]
              text-[var(--primary)]
            "
          >
            <MapPin size={17} />
          </div>

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
              Delivering To
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-[20px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              Delivery Address
            </h2>
          </div>
        </div>

        <Link
          href="/checkout"
          className="
            text-[9px]
            font-semibold
            text-[var(--primary)]
            underline
            underline-offset-4
          "
        >
          Change
        </Link>
      </div>

      <div
        className="
          mt-5
          rounded-[16px]
          bg-[var(--background)]
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <UserRound
            size={14}
            className="text-[var(--primary)]"
          />

          <p
            className="
              text-[11px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            {delivery.name}
          </p>
        </div>

        <div
          className="
            mt-3
            flex
            items-start
            gap-2
          "
        >
          <MapPin
            size={14}
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
              text-[var(--foreground)]/55
            "
          >
            {delivery.address}
            <br />
            {delivery.street},{" "}
            {delivery.area}
            <br />
            {delivery.emirate}, UAE
          </p>
        </div>

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
          "
        >
          <Phone
            size={14}
            className="text-[var(--primary)]"
          />

          <p
            className="
              text-[9px]
              text-[var(--foreground)]/55
            "
          >
            {delivery.phone}
          </p>
        </div>
      </div>
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
  lg:p-7
`;