import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ background: "var(--parchment)" }}
    >
      <div className="w-full max-w-[420px]">
        {/* Login Card */}
        <div className="ledger-card rounded-2xl px-6 py-8 sm:px-8 sm:py-10">
          {/* Header */}
          <div className="mb-8">
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Welcome 
            </p>

            <h1
              className="ledger-display text-[30px] font-semibold leading-tight tracking-[-0.02em] sm:text-[34px]"
              style={{ color: "var(--text)" }}
            >
              Sign in to your account
            </h1>

          </div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-[15px] font-semibold"
                style={{ color: "var(--text)" }}
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                autoComplete="username"
                className="
                  ledger-input
                  w-full
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-gray-400
                  focus:ring-2
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[15px] font-semibold"
                style={{ color: "var(--text)" }}
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="
                  ledger-input
                  w-full
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-gray-400
                  focus:ring-2
                "
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                ledger-btn
                mt-2
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                px-4
                py-3
                text-sm
                font-semibold
                tracking-wide
                transition-all
                duration-200
                hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              <span>Sign in</span>
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="mt-6 text-center text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          Pharmacy Billing Management System
        </p>
      </div>
    </main>
  );
}
