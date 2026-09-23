"use client";

import Image from "next/image";
import {
  AtSign,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const {
    phone,
    whatsapp,
    email,
    instagram,
  } = siteConfig.contact;

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className="w-full bg-[var(--primary)] text-white">
      {/* Main */}
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.15,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          mx-auto
          flex
          max-w-[1440px]
          flex-col
          items-center
          px-5
          pb-12
          pt-14
          text-center
          lg:pb-14
          lg:pt-[80px]
        "
      >
        {/* Logo */}
        <div
          className="
            relative
            h-[140px]
            w-[140px]
            overflow-hidden
            rounded-full
            bg-white
            lg:h-[188px]
            lg:w-[188px]
          "
        >
          <Image
            src="/logo.png"
            alt="Dessert Brand"
            fill
            sizes="(max-width: 1024px) 140px, 188px"
            className="object-contain"
          />
        </div>

        {/* Tagline */}
     <h2
  className="
    mt-8
    text-[36px]
    font-medium
    leading-[1.05]
    text-white
    lg:text-[54px]
  "
  style={{
    fontFamily: "cursive",
  }}
>
  Life is Sweeter
  <br />
  with Dessert
</h2>
      </motion.div>

      {/* Contact */}
      <div className="border-y border-white/20">
        <div
          className="
            mx-auto
            max-w-[1440px]
            px-5
            py-9
            lg:px-10
            lg:py-9
            xl:px-12
          "
        >
          {/* Desktop */}
          <div className="hidden items-center justify-center gap-14 lg:flex xl:gap-20">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[18px] text-white/80 transition-colors hover:text-white"
            >
              <AtSign
                size={27}
                strokeWidth={1.7}
              />
              Instagram
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[18px] text-white/80 transition-colors hover:text-white"
            >
              <MessageCircle
                size={27}
                strokeWidth={1.7}
              />
              WhatsApp
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-[18px] text-white/80 transition-colors hover:text-white"
            >
              <Phone
                size={27}
                strokeWidth={1.7}
              />
              {phone}
            </a>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-[18px] text-white/80 transition-colors hover:text-white"
            >
              <Mail
                size={27}
                strokeWidth={1.7}
              />
              {email}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex flex-col items-center lg:hidden">
            <div className="flex w-full items-center justify-center gap-9">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[16px] text-white/80"
              >
                <AtSign
                  size={25}
                  strokeWidth={1.6}
                />
                Instagram
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[16px] text-white/80"
              >
                <MessageCircle
                  size={25}
                  strokeWidth={1.6}
                />
                WhatsApp
              </a>
            </div>

            <a
              href={`tel:${phone}`}
              className="mt-8 flex items-center gap-3 text-[16px] text-white/80"
            >
              <Phone
                size={25}
                strokeWidth={1.6}
              />
              {phone}
            </a>

            <a
              href={`mailto:${email}`}
              className="mt-8 flex items-center gap-3 text-[16px] text-white/80"
            >
              <Mail
                size={25}
                strokeWidth={1.6}
              />
              {email}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="
          px-5
          pb-[105px]
          pt-7
          text-center
          lg:pb-7
        "
      >
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-white/65
            lg:text-[12px]
            lg:tracking-[0.2em]
          "
        >
          © {new Date().getFullYear()} Dessert · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}