import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { AuthUser } from "@/types/database";

type AuthSuccess = {
  user: AuthUser;
  supabase: Awaited<ReturnType<typeof createClient>>;
  error?: never;
};

type AuthFailure = {
  user?: never;
  supabase?: never;
  error: NextResponse;
};

export async function requireAuth(): Promise<AuthSuccess | AuthFailure> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      error: NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      ),
    };
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return {
      error: NextResponse.json(
        { error: "User profile not found" },
        { status: 403 }
      ),
    };
  }

  // Get user's organization membership
  const { data: membership, error: memberError } = await supabase
    .from("organization_members")
    .select("role, organizations(*)")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (memberError || !membership) {
    return {
      error: NextResponse.json(
        { error: "No organization membership found" },
        { status: 403 }
      ),
    };
  }

  const org = membership.organizations as unknown as {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
  };

  return {
    user: {
      id: user.id,
      email: profile.email,
      fullName: profile.full_name,
      avatarUrl: profile.avatar_url,
      isSuperAdmin: profile.is_super_admin,
      organization: org,
      role: membership.role,
    },
    supabase,
  };
}
