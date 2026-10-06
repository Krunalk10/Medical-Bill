import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Pharmacy Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          You are successfully authenticated.
        </p>

        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}