"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthUser } from "@/types/database";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  });

export function useAuth() {
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR<{ user: AuthUser }>(
    "/api/auth/me",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await mutate(undefined, { revalidate: false });
    router.push("/login");
    router.refresh();
  }, [mutate, router]);

  return {
    user: data?.user ?? null,
    organization: data?.user?.organization ?? null,
    role: data?.user?.role ?? null,
    isLoading,
    isError: !!error,
    signOut,
  };
}
