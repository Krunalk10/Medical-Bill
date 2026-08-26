"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export default function LoginPage() {
  const supabase = createClient();

  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear the field error while the user is correcting it.
    setErrors((current) => ({
      ...current,
      [name]: undefined,
      form: undefined,
    }));
  }

  function validate(): FormErrors {
    const validationErrors: FormErrors = {};

    if (!values.email.trim()) {
      validationErrors.email = "Email is required.";
    }

    if (!values.password) {
      validationErrors.password = "Password is required.";
    }

    return validationErrors;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    // Clear previous form-level error.
    setErrors({});

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });

    if (error) {
      setErrors({
        form: "Invalid email or password.",
      });

      setSubmitting(false);
      return;
    }

    // Authentication succeeded.
    window.location.href = "/dashboard";
  }

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
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[15px] font-semibold"
                style={{ color: "var(--text)" }}
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                disabled={submitting}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 text-xs"
                  style={{ color: "var(--error)" }}
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  disabled={submitting}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className="
                    ledger-input
                    w-full
                    rounded-lg
                    px-4
                    py-3
                    pr-11
                    text-sm
                    font-medium
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-gray-400
                    focus:ring-2
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  disabled={submitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-md
                    p-1
                    transition-colors
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPassword ? (
                    <EyeOff size={17} strokeWidth={2} />
                  ) : (
                    <Eye size={17} strokeWidth={2} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs"
                  style={{ color: "var(--error)" }}
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Authentication Error */}
            {errors.form && (
              <p
                className="rounded-lg px-3 py-2 text-sm"
                style={{
                  color: "var(--error)",
                  background:
                    "color-mix(in srgb, var(--error) 8%, transparent)",
                }}
                role="alert"
              >
                {errors.form}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={submitting}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
            >
              <span>{submitting ? "Signing in..." : "Sign in"}</span>

              {!submitting && <ArrowRight size={16} strokeWidth={2} />}
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
