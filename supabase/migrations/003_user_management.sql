-- User Management: soft-delete, updated RLS policies, cross-org profile visibility
-- Adds is_active/deactivated_at columns, updates helper functions to respect active status,
-- and allows admins to manage non-owner members.

-- ============================================================
-- 1. Add soft-delete columns to organization_members
-- ============================================================

ALTER TABLE organization_members
  ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN deactivated_at TIMESTAMPTZ;

CREATE INDEX idx_org_members_active ON organization_members(organization_id, is_active);

-- ============================================================
-- 2. Update helper functions to respect is_active
-- ============================================================

-- user_org_ids(): only return orgs where membership is active
CREATE OR REPLACE FUNCTION public.user_org_ids()
RETURNS SETOF UUID AS $$
  SELECT organization_id
  FROM public.organization_members
  WHERE user_id = auth.uid() AND is_active = true;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- user_role_in_org(): only return role if membership is active
CREATE OR REPLACE FUNCTION public.user_role_in_org(org_id UUID)
RETURNS TEXT AS $$
  SELECT role
  FROM public.organization_members
  WHERE user_id = auth.uid() AND organization_id = org_id AND is_active = true;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ============================================================
-- 3. Update RLS policies on organization_members
-- ============================================================

-- Drop existing write policies (read policy stays unchanged)
DROP POLICY "Org owners/admins can add members" ON organization_members;
DROP POLICY "Org owners can remove members" ON organization_members;
DROP POLICY "Org owners can update member roles" ON organization_members;

-- INSERT: owners and admins can add members
CREATE POLICY "Org owners/admins can add members"
  ON organization_members FOR INSERT
  WITH CHECK (
    public.user_role_in_org(organization_id) IN ('owner', 'admin')
    OR public.is_super_admin()
    -- Allow self-insert during org creation (no existing members yet)
    OR (user_id = auth.uid() AND NOT EXISTS (
      SELECT 1 FROM organization_members om WHERE om.organization_id = organization_members.organization_id
    ))
  );

-- UPDATE: owners can update anyone; admins can update non-owners
CREATE POLICY "Org owners/admins can update members"
  ON organization_members FOR UPDATE
  USING (
    public.user_role_in_org(organization_id) = 'owner'
    OR (
      public.user_role_in_org(organization_id) = 'admin'
      AND role != 'owner'
    )
    OR public.is_super_admin()
  );

-- DELETE: owners can delete anyone; admins can delete non-owners
-- (We use soft-delete in the app, but keep this policy correct for safety)
CREATE POLICY "Org owners/admins can remove members"
  ON organization_members FOR DELETE
  USING (
    public.user_role_in_org(organization_id) = 'owner'
    OR (
      public.user_role_in_org(organization_id) = 'admin'
      AND role != 'owner'
    )
    OR public.is_super_admin()
  );

-- ============================================================
-- 4. Allow org members to read each other's profiles
-- ============================================================

CREATE POLICY "Users can read profiles of org members"
  ON user_profiles FOR SELECT
  USING (
    id IN (
      SELECT om.user_id FROM organization_members om
      WHERE om.organization_id IN (SELECT public.user_org_ids())
    )
    OR id = auth.uid()
    OR public.is_super_admin()
  );
