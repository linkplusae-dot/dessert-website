import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

const credentialsSchema = z.object({
  email: z
    .string()
    .trim()
    .email(),

  password: z
    .string()
    .min(8),
});

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,

  trustHost: true,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      id: "credentials",

      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          const parsed =
            credentialsSchema.safeParse(
              credentials
            );

          if (!parsed.success) {
            return null;
          }

          await connectDB();

          const email =
            parsed.data.email
              .trim()
              .toLowerCase();

          const customer =
            await Customer.findOne({
              email,
              isActive: true,
            }).select(
              "+passwordHash"
            );

          if (!customer) {
            return null;
          }

          if (
            !customer.passwordHash
          ) {
            console.error(
              "Customer password hash is missing"
            );

            return null;
          }

          const passwordMatches =
            await bcrypt.compare(
              parsed.data.password,
              customer.passwordHash
            );

          if (!passwordMatches) {
            return null;
          }

          return {
            id:
              customer._id.toString(),

            name:
              `${customer.firstName} ${customer.lastName}`.trim(),

            email:
              customer.email,

            firstName:
              customer.firstName,

            lastName:
              customer.lastName,

            phone:
              customer.phone,
          };
        } catch (error) {
          console.error(
            "Credentials authorize error:",
            error
          );

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }) {
      if (user) {
        token.id =
          user.id;

        token.firstName =
          user.firstName;

        token.lastName =
          user.lastName;

        token.phone =
          user.phone;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id =
          token.id as string;

        session.user.firstName =
          token.firstName as
            | string
            | undefined;

        session.user.lastName =
          token.lastName as
            | string
            | undefined;

        session.user.phone =
          token.phone as
            | string
            | undefined;
      }

      return session;
    },
  },
});