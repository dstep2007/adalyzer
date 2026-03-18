"use client";

import useSWR from "swr";
import { TeamMember } from "@/types/database";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch team members");
  return res.json();
};

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<{ members: TeamMember[] }>(
    "/api/users",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    members: data?.members ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
