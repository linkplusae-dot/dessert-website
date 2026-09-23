import {
  CakeSlice,
  Sparkles,
} from "lucide-react";

type AuthVisualProps = {
  type: "login" | "signup";
};

export default function AuthVisual({
  type,
}: AuthVisualProps) {
  const isLogin = type === "login";

  return (
    <>
      {/* Desktop */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hidden
          overflow-hidden
          lg:block
        "
      >
        <div
          className="
            absolute
            inset-y-0
            right-0
            w-[58%]
            overflow-hidden
            bg-[var(--primary)]
            [clip-path:polygon(34%_0,100%_0,100%_100%,0_100%)]
          "
        >
          <div className="absolute -right-[80px] -top-[100px] h-[330px] w-[330px] rounded-full bg-[var(--accent)]/35" />

          <div className="absolute bottom-[-170px] left-[8%] h-[380px] w-[380px] rounded-full bg-white/[0.06]" />

          <div className="absolute right-[12%] top-[14%] h-[170px] w-[170px] rounded-full border border-white/10" />

          <Sparkles
            size={26}
            strokeWidth={1.3}
            className="absolute right-[7%] top-[12%] text-white/35"
          />

          <div className="absolute inset-0 flex items-center justify-end px-[7%]">
            <div className="max-w-[350px] text-right text-white">
              <div
                className="
                  ml-auto
                  flex
                  h-[56px]
                  w-[56px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                "
              >
                <CakeSlice
                  size={24}
                  strokeWidth={1.4}
                />
              </div>

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/65">
                Sweet moments await
              </p>

              <h2 className="mt-3 font-serif text-[46px] font-semibold leading-[0.98] xl:text-[54px]">
                {isLogin ? (
                  <>
                    Welcome
                    <br />
                    Back.
                  </>
                ) : (
                  <>
                    Join the
                    <br />
                    Sweet Side.
                  </>
                )}
              </h2>

              <p className="ml-auto mt-4 max-w-[285px] text-[11px] leading-5 text-white/60">
                {isLogin
                  ? "Sign in and continue where your sweet journey left off."
                  : "Create your account and make every dessert order a little easier."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className="
          relative
          h-[230px]
          w-full
          overflow-hidden
          bg-[var(--primary)]
          sm:h-[260px]
          lg:hidden
        "
      >
        <div className="absolute -right-[65px] -top-[70px] h-[220px] w-[220px] rounded-full bg-[var(--accent)]/45" />

        <div className="absolute -bottom-[95px] -left-[55px] h-[220px] w-[220px] rounded-full bg-white/[0.08]" />

        <div className="absolute left-[10%] top-[42%] h-[115px] w-[115px] rounded-full border border-white/10" />

        <Sparkles
          size={22}
          strokeWidth={1.3}
          className="absolute right-7 top-7 text-white/40"
        />

        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-8 text-center text-white">
          <div
            className="
              flex
              h-[48px]
              w-[48px]
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
            "
          >
            <CakeSlice
              size={22}
              strokeWidth={1.4}
            />
          </div>

          <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.28em] text-white/65">
            Sweet moments await
          </p>

          <h2 className="mt-2 font-serif text-[34px] font-semibold leading-none sm:text-[38px]">
            {isLogin
              ? "Welcome Back"
              : "Create Account"}
          </h2>
        </div>

        <div
          className="
            absolute
            -bottom-[57px]
            left-1/2
            h-[90px]
            w-[115%]
            -translate-x-1/2
            rounded-[50%]
            bg-[var(--white)]
          "
        />
      </div>
    </>
  );
}