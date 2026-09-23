import {
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import Link from "next/link";

type Props = {
  fullName: string;
  email: string;
  phone: string;
};

export default function ProfileInformation({
  fullName,
  email,
  phone,
}: Props) {
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
            Personal Details
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
            Profile Information
          </h2>
        </div>

        <Link
          href="/account/profile"
          className="
            text-[9px]
            font-semibold
            text-[var(--primary)]
            underline
            underline-offset-4
          "
        >
          Edit
        </Link>
      </div>

      <div
        className="
          mt-5
          grid
          gap-3
          sm:grid-cols-3
        "
      >
        <Detail
          icon={<UserRound size={15} />}
          label="Full Name"
          value={fullName}
        />

        <Detail
          icon={<Mail size={15} />}
          label="Email"
          value={email}
        />

        <Detail
          icon={<Phone size={15} />}
          label="Mobile"
          value={phone}
        />
      </div>
    </section>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[15px]
        bg-[var(--background)]
        p-3.5
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-[var(--primary)]
        "
      >
        {icon}

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.1em]
            text-[var(--foreground)]/35
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          truncate
          text-[10px]
          font-semibold
          text-[var(--foreground)]
        "
      >
        {value}
      </p>
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