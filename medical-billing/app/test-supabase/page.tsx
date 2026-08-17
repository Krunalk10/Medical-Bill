import { createClient } from "@/lib/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div>
        <h1 className="text-2xl font-bold">Supabase Connection Test</h1>

        <pre className="mt-4 rounded-lg bg-gray-100 p-4 text-sm">
          {JSON.stringify(
            {
              connected: !error,
              sessionExists: !!data.session,
              error: error?.message ?? null,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </main>
  );
}
