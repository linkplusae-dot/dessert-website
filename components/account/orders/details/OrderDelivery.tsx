import {
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

type Props = {
  customer: {
    name: string;
    email: string;
    phone: string;
  };

  address: {
    emirate: string;
    area: string;
    street: string;
    building: string;
    apartment?: string;
    landmark?: string;
    instructions?: string;
  };
};

export default function OrderDelivery({
  customer,
  address,
}: Props) {
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
            h-[36px]
            w-[36px]
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <MapPin size={15} />
        </div>

        <div>
          <p
            className="
              text-[7px]
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
          mt-4
          space-y-3
          rounded-[15px]
          bg-[var(--background)]
          p-4
        "
      >
        <Info
          icon={<UserRound size={13} />}
          value={customer.name}
        />

        <Info
          icon={<Phone size={13} />}
          value={customer.phone}
        />

        {customer.email && <Info icon={<Mail size={13} />} value={customer.email} />}

        <div
          className="
            flex
            items-start
            gap-2.5
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
              text-[8px]
              leading-5
              text-[var(--foreground)]/50
              sm:text-[9px]
            "
          >
            {address.building}

            {address.apartment &&
              `, ${address.apartment}`}

            <br />

            {address.street},{" "}
            {address.area}

            <br />

            {address.emirate}, UAE
          </p>
        </div>

        {address.landmark && (
          <div
            className="
              border-t
              border-[var(--primary)]/8
              pt-3
            "
          >
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-[var(--foreground)]/30
              "
            >
              Landmark
            </p>

            <p
              className="
                mt-1
                text-[8px]
                text-[var(--foreground)]/50
              "
            >
              {address.landmark}
            </p>
          </div>
        )}

        {address.instructions && (
          <div
            className="
              border-t
              border-[var(--primary)]/8
              pt-3
            "
          >
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-[var(--foreground)]/30
              "
            >
              Delivery Instructions
            </p>

            <p
              className="
                mt-1
                text-[8px]
                leading-4
                text-[var(--foreground)]/50
              "
            >
              {address.instructions}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Info({
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
          text-[8px]
          text-[var(--foreground)]/50
          sm:text-[9px]
        "
      >
        {value}
      </span>
    </div>
  );
}

const cardClass = `
  rounded-[20px]
  border
  border-[var(--primary)]/8
  bg-white
  p-4
  shadow-[0_8px_30px_rgba(45,32,32,0.035)]
  sm:rounded-[24px]
  sm:p-6
`;
