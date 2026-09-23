import {
  BadgeCheck,
  CalendarDays,
  Mail,
} from "lucide-react";

export default function AccountInformation() {
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
          <BadgeCheck size={15} />
        </div>

        <div>
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-[var(--accent)]
            "
          >
            Account
          </p>

          <h2
            className="
              mt-0.5
              font-serif
              text-[19px]
              font-semibold
              text-[var(--foreground)]
              sm:text-[21px]
            "
          >
            Account Information
          </h2>
        </div>
      </div>

      <div
        className="
          mt-4
          overflow-hidden
          rounded-[15px]
          bg-[var(--background)]
        "
      >
        <InfoRow
          icon={<Mail size={14} />}
          label="Email Status"
          value="Verified"
          verified
        />

        <div
          className="
            mx-4
            h-px
            bg-[var(--primary)]/8
          "
        />

        <InfoRow
          icon={<CalendarDays size={14} />}
          label="Member Since"
          value="September 2026"
        />
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  verified = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  verified?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        px-4
        py-3.5
      "
    >
      <span className="text-[var(--primary)]">
        {icon}
      </span>

      <span
        className="
          flex-1
          text-[8px]
          font-medium
          text-[var(--foreground)]/45
        "
      >
        {label}
      </span>

      <span
        className={`
          flex
          items-center
          gap-1
          text-[8px]
          font-semibold

          ${
            verified
              ? "text-emerald-600"
              : "text-[var(--foreground)]"
          }
        `}
      >
        {verified && (
          <BadgeCheck size={12} />
        )}

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