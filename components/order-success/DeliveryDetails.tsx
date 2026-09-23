import {
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

const delivery = {
  name: "Ahmed Daniyal",
  email: "ahmed@example.com",
  phone: "+971 50 000 0000",
  apartment:
    "Apartment 804, Marina Residence",
  street: "Al Marsa Street",
  area: "Dubai Marina",
  emirate: "Dubai",
};

export default function DeliveryDetails() {
  return (
    <section className={cardClass}>
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-[38px]
            w-[38px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <MapPin size={16} />
        </div>

        <div>
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[var(--accent)]
            "
          >
            Delivery
          </p>

          <h2
            className="
              font-serif
              text-[20px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            Delivery Details
          </h2>
        </div>
      </div>

      <div
        className="
          mt-5
          space-y-3
          rounded-[16px]
          bg-[var(--background)]
          p-4
        "
      >
        <Row
          icon={<UserRound size={14} />}
          value={delivery.name}
        />

        <Row
          icon={<Phone size={14} />}
          value={delivery.phone}
        />

        <Row
          icon={<Mail size={14} />}
          value={delivery.email}
        />

        <div
          className="
            flex
            items-start
            gap-2.5
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
            {delivery.apartment}
            <br />
            {delivery.street},{" "}
            {delivery.area}
            <br />
            {delivery.emirate}, UAE
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
      "
    >
      <span className="text-[var(--primary)]">
        {icon}
      </span>

      <span
        className="
          text-[9px]
          text-[var(--foreground)]/55
        "
      >
        {value}
      </span>
    </div>
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