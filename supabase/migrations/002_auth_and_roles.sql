-- Authentication, User Profiles, and Role-Based Access Control
-- Extends the existing multi-tenant schema with Supabase Auth integration

-- User profiles (linked 1:1 to auth.users)
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT,
  avatar_url      TEXT,
  is_super_admin  BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Organization members (join table: users <-> organizations with roles)
CREATE TABLE organization_members (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id           UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  role              TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX idx_org_members_user ON organization_members(user_id);
CREATE INDEX idx_org_members_org ON organization_members(organization_id);

-- Trigger: auto-create user_profile when a new auth.users row is inserted
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Row Level Security
-- ============================================================

-- Helper: get the user's organization IDs
CREATE OR REPLACE FUNCTION public.user_org_ids()
RETURNS SETOF UUID AS $$
  SELECT organization_id
  FROM public.organization_members
  WHERE user_id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper: check if the current user is a super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (SELECT is_super_admin FROM public.user_profiles WHERE id = auth.uid()),
    false
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper: get user's role in a specific org
CREATE OR REPLACE FUNCTION public.user_role_in_org(org_id UUID)
RETURNS TEXT AS $$
  SELECT role
  FROM public.organization_members
  WHERE user_id = auth.uid() AND organization_id = org_id;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ============================================================
-- Enable RLS on all tables
-- ============================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_prompts ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- user_profiles policies
-- ============================================================

CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  USING (id = auth.uid() OR public.is_super_admin());

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ============================================================
-- organizations policies
-- ============================================================

CREATE POLICY "Users can read their organizations"
  ON organizations FOR SELECT
  USING (id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "Authenticated users can create organizations"
  ON organizations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Org owners can update their organization"
  ON organizations FOR UPDATE
  USING (
    public.user_role_in_org(id) IN ('owner') OR public.is_super_admin()
  );

-- ============================================================
-- organization_members policies
-- ============================================================

CREATE POLICY "Users can read members of their orgs"
  ON organization_members FOR SELECT
  USING (
    organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin()
  );

CREATE POLICY "Org owners/admins can add members"
  ON organization_members FOR INSERT
  WITH CHECK (
    public.user_role_in_org(organization_id) IN ('owner', 'admin')
    OR public.is_super_admin()
    -- Allow self-insert during org creation (user_id must match auth.uid)
    OR (user_id = auth.uid() AND NOT EXISTS (
      SELECT 1 FROM organization_members WHERE organization_id = organization_members.organization_id
    ))
  );

CREATE POLICY "Org owners can remove members"
  ON organization_members FOR DELETE
  USING (
    public.user_role_in_org(organization_id) = 'owner' OR public.is_super_admin()
  );

CREATE POLICY "Org owners can update member roles"
  ON organization_members FOR UPDATE
  USING (
    public.user_role_in_org(organization_id) = 'owner' OR public.is_super_admin()
  );

-- ============================================================
-- Org-scoped data table policies (same pattern for all)
-- ============================================================

-- meta_connections
CREATE POLICY "Users can read their org meta_connections"
  ON meta_connections FOR SELECT
  USING (organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "Org owners/admins can manage meta_connections"
  ON meta_connections FOR ALL
  USING (
    public.user_role_in_org(organization_id) IN ('owner', 'admin') OR public.is_super_admin()
  );

-- campaigns
CREATE POLICY "Users can read their org campaigns"
  ON campaigns FOR SELECT
  USING (organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "System can manage campaigns"
  ON campaigns FOR ALL
  USING (
    public.user_role_in_org(organization_id) IN ('owner', 'admin') OR public.is_super_admin()
  );

-- ad_sets
CREATE POLICY "Users can read their org ad_sets"
  ON ad_sets FOR SELECT
  USING (organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "System can manage ad_sets"
  ON ad_sets FOR ALL
  USING (
    public.user_role_in_org(organization_id) IN ('owner', 'admin') OR public.is_super_admin()
  );

-- ads
CREATE POLICY "Users can read their org ads"
  ON ads FOR SELECT
  USING (organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "System can manage ads"
  ON ads FOR ALL
  USING (
    public.user_role_in_org(organization_id) IN ('owner', 'admin') OR public.is_super_admin()
  );

-- sync_log
CREATE POLICY "Users can read their org sync_log"
  ON sync_log FOR SELECT
  USING (organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "System can manage sync_log"
  ON sync_log FOR ALL
  USING (
    public.user_role_in_org(organization_id) IN ('owner', 'admin') OR public.is_super_admin()
  );

-- generated_prompts
CREATE POLICY "Users can read their org generated_prompts"
  ON generated_prompts FOR SELECT
  USING (organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "Users can create prompts in their org"
  ON generated_prompts FOR INSERT
  WITH CHECK (organization_id IN (SELECT public.user_org_ids()) OR public.is_super_admin());

CREATE POLICY "Org owners/admins can manage prompts"
  ON generated_prompts FOR DELETE
  USING (
    public.user_role_in_org(organization_id) IN ('owner', 'admin') OR public.is_super_admin()
  );
