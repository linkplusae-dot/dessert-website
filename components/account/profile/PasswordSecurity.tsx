import {
  ChevronRight,
  KeyRound,
  LockKeyhole,
} from "lucide-react";

type Props = {
  onChangePassword: () => void;
};

export default function PasswordSecurity({
  onChangePassword,
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
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <LockKeyhole size={15} />
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
            Security
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
            Password & Security
          </h2>
        </div>
      </div>

      <button
        type="button"
        onClick={onChangePassword}
        className="
          mt-4
          flex
          w-full
          items-center
          gap-3
          rounded-[15px]
          bg-[var(--background)]
          p-3
          text-left
          transition
          hover:bg-[var(--surface)]/55
          sm:p-4
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
            bg-white
            text-[var(--primary)]
          "
        >
          <KeyRound size={14} />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="
              text-[9px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            Password
          </p>

          <p
            className="
              mt-1
              text-[8px]
              tracking-[0.18em]
              text-[var(--foreground)]/35
            "
          >
            ••••••••••••
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-1
            text-[8px]
            font-semibold
            text-[var(--primary)]
          "
        >
          Change

          <ChevronRight size={13} />
        </div>
      </button>
    </section>
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