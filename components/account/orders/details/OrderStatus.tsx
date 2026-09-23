import {
  Check,
  ChefHat,
  PackageCheck,
  Truck,
} from "lucide-react";

const steps = [
  {
    key: "confirmed",
    label: "Confirmed",
    icon: Check,
  },
  {
    key: "preparing",
    label: "Preparing",
    icon: ChefHat,
  },
  {
    key: "delivery",
    label: "Out for Delivery",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: PackageCheck,
  },
];

type Props = {
  currentStep: number;
};

export default function OrderStatus({
  currentStep,
}: Props) {
  return (
    <section className={cardClass}>
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
          Order Status
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
          Track Your Order
        </h2>
      </div>

      {/* Mobile */}
      <div className="mt-5 space-y-0 sm:hidden">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed =
            index < currentStep;

          const active =
            index === currentStep;

          return (
            <div
              key={step.key}
              className="
                flex
                gap-3
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                "
              >
                <div
                  className={`
                    flex
                    h-[32px]
                    w-[32px]
                    items-center
                    justify-center
                    rounded-full
                    border

                    ${
                      completed || active
                        ? `
                          border-[var(--primary)]
                          bg-[var(--primary)]
                          text-white
                        `
                        : `
                          border-[var(--primary)]/15
                          bg-white
                          text-[var(--foreground)]/25
                        `
                    }
                  `}
                >
                  {completed ? (
                    <Check size={13} />
                  ) : (
                    <Icon size={13} />
                  )}
                </div>

                {index <
                  steps.length - 1 && (
                  <div
                    className={`
                      h-[32px]
                      w-px

                      ${
                        index < currentStep
                          ? "bg-[var(--primary)]"
                          : "bg-[var(--primary)]/12"
                      }
                    `}
                  />
                )}
              </div>

              <div className="pt-2">
                <p
                  className={`
                    text-[9px]
                    font-semibold

                    ${
                      completed || active
                        ? "text-[var(--foreground)]"
                        : "text-[var(--foreground)]/30"
                    }
                  `}
                >
                  {step.label}
                </p>

                {active && (
                  <p
                    className="
                      mt-1
                      text-[7px]
                      text-[var(--primary)]
                    "
                  >
                    Current status
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <div
        className="
          mt-7
          hidden
          items-start
          sm:flex
        "
      >
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed =
            index < currentStep;

          const active =
            index === currentStep;

          return (
            <div
              key={step.key}
              className="
                flex
                flex-1
                items-start
              "
            >
              <div
                className="
                  flex
                  min-w-[70px]
                  flex-col
                  items-center
                  text-center
                "
              >
                <div
                  className={`
                    flex
                    h-[38px]
                    w-[38px]
                    items-center
                    justify-center
                    rounded-full
                    border

                    ${
                      completed || active
                        ? `
                          border-[var(--primary)]
                          bg-[var(--primary)]
                          text-white
                        `
                        : `
                          border-[var(--primary)]/15
                          bg-white
                          text-[var(--foreground)]/25
                        `
                    }
                  `}
                >
                  {completed ? (
                    <Check size={14} />
                  ) : (
                    <Icon size={14} />
                  )}
                </div>

                <p
                  className={`
                    mt-2
                    text-[8px]
                    font-semibold

                    ${
                      completed || active
                        ? "text-[var(--foreground)]"
                        : "text-[var(--foreground)]/30"
                    }
                  `}
                >
                  {step.label}
                </p>
              </div>

              {index <
                steps.length - 1 && (
                <div
                  className={`
                    mt-[19px]
                    h-px
                    flex-1

                    ${
                      index < currentStep
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--primary)]/12"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
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