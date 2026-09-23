"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const moments = [
  {
    title: "Birthdays",
    subtitle: "Make their day sweeter",
    image: "/images/moments/birthdays.webp",
  },
  {
    title: "Celebrations",
    subtitle: "Sweeten every milestone",
    image: "/images/moments/celebrations.webp",
  },
  {
    title: "Gifting",
    subtitle: "A little box of happiness",
    image: "/images/moments/gifting.webp",
  },
  {
    title: "Just Because",
    subtitle: "No occasion needed",
    image: "/images/moments/just-because.webp",
  },
];

export default function Moments() {
  return (
    <section className="w-full bg-[var(--background)] py-7 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10 xl:px-12">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-5 lg:mb-7"
        >
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] lg:text-xs">
            Sweeten The Occasion
          </p>

          <h2 className="font-serif text-[25px] font-semibold leading-tight text-[var(--foreground)] lg:text-[36px]">
            Made for Every Moment
          </h2>
        </motion.div>

        {/* Moments */}
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
              }}
              className="
                relative
                h-[180px]
                overflow-hidden
                rounded-[18px]
                sm:h-[210px]
                lg:h-[330px]
                lg:rounded-[24px]
              "
            >
              {/* Image */}
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-3 lg:p-5">
                <h3 className="font-serif text-[17px] font-semibold text-white lg:text-[24px]">
                  {moment.title}
                </h3>

                <p className="mt-0.5 text-[9px] text-white/80 lg:mt-1 lg:text-[12px]">
                  {moment.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}