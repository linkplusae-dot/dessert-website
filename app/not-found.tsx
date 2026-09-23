import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center px-5 py-12 sm:px-8">
      <section className="w-full max-w-md text-center">
        <Link
          href="/"
          aria-label="Dessert home"
          className="mx-auto mb-10 block w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
        >
          <Image
            src="/logo/logo.png"
            alt="Dessert"
            width={150}
            height={60}
            priority
            className="h-auto w-[135px]"
          />
        </Link>

        <p className="text-7xl font-semibold tracking-tight text-[var(--primary)] sm:text-8xl">
          404
        </p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-[var(--foreground)]/70">
          The page you&apos;re looking for may have moved, or it may no longer be available.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-[var(--white)] transition-colors hover:bg-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
        >
          Return to homepage
        </Link>
      </section>
    </main>
  );
}
