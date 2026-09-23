"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

import {
  siteConfig,
} from "@/config/site";

type ConnectMenuProps = {
  open: boolean;
};

function InstagramIcon({
  size = 20,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ConnectMenu({
  open,
}: ConnectMenuProps) {
  const {
    phone,
    whatsapp,
    email,
    instagram,
  } = siteConfig.contact;

  const cleanWhatsApp =
    whatsapp.replace(/\D/g, "");

  const options = [
    {
      label: "Call",
      href: `tel:${phone}`,
      icon: Phone,
      external: false,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${cleanWhatsApp}`,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Email",
      href: `mailto:${email}`,
      icon: Mail,
      external: false,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 14,
            scale: 0.94,
          }}
          transition={{
            duration: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            bottom-[88px]
            right-3
            z-50
            w-[220px]
            origin-bottom-right
            rounded-[24px]
            border
            border-[#F0D7D8]
            bg-white
            p-4
            shadow-[0_18px_50px_rgba(79,40,45,0.18)]
          "
        >
          <div className="grid grid-cols-2 gap-3">
            {options.map((option, index) => {
              const Icon = option.icon;

              return (
                <motion.a
                  key={option.label}
                  href={option.href}
                  target={
                    option.external
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    option.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 6,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.04,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  className="
                    flex
                    min-h-[72px]
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-[#FFF9F5]
                    text-[#2D2020]
                    transition-colors
                    duration-200
                    hover:bg-[#F8E9E7]
                  "
                >
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F8E9E7]
                      text-[#7A4650]
                    "
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="text-[11px] font-medium">
                    {option.label}
                  </span>
                </motion.a>
              );
            })}

            {/* Instagram */}

            <motion.a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 6,
                scale: 0.96,
              }}
              transition={{
                duration: 0.2,
                delay: 0.12,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="
                flex
                min-h-[72px]
                flex-col
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#FFF9F5]
                text-[#2D2020]
                transition-colors
                duration-200
                hover:bg-[#F8E9E7]
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F8E9E7]
                  text-[#7A4650]
                "
              >
                <InstagramIcon size={19} />
              </span>

              <span className="text-[11px] font-medium">
                Instagram
              </span>
            </motion.a>
          </div>

          {/* Pointer */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.15,
            }}
            className="
              absolute
              -bottom-2
              right-8
              h-4
              w-4
              rotate-45
              border-b
              border-r
              border-[#F0D7D8]
              bg-white
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}