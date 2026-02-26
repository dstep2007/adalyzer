-- Adalyzer Initial Schema
-- Multi-tenant from day one: every table scoped by organization_id

-- Organizations (tenant boundary)
CREATE TABLE organizations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Meta API Connections (one org can have multiple ad accounts)
CREATE TABLE meta_connections (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  ad_account_id     TEXT NOT NULL,
  access_token      TEXT NOT NULL,
  account_name      TEXT,
  is_active         BOOLEAN DEFAULT true,
  token_expires_at  TIMESTAMPTZ,
  last_synced_at    TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, ad_account_id)
);

-- Campaigns (cached from Meta)
CREATE TABLE campaigns (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  meta_campaign_id  TEXT NOT NULL,
  ad_account_id     TEXT NOT NULL,
  name              TEXT NOT NULL,
  status            TEXT,
  objective         TEXT,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, meta_campaign_id)
);

-- Ad Sets (cached from Meta)
CREATE TABLE ad_sets (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  meta_adset_id     TEXT NOT NULL,
  meta_campaign_id  TEXT NOT NULL,
  name              TEXT NOT NULL,
  status            TEXT,
  targeting_summary JSONB,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, meta_adset_id)
);

-- Ads: core table with denormalized performance metrics
CREATE TABLE ads (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  meta_ad_id        TEXT NOT NULL,
  meta_adset_id     TEXT,
  meta_campaign_id  TEXT,
  ad_account_id     TEXT NOT NULL,

  -- Ad metadata
  name              TEXT,
  status            TEXT,

  -- Creative content
  creative_type     TEXT,
  thumbnail_url     TEXT,
  image_url         TEXT,
  video_url         TEXT,
  creative_meta     JSONB,

  -- Copy content
  primary_text      TEXT,
  headline          TEXT,
  description       TEXT,
  call_to_action    TEXT,
  link_url          TEXT,

  -- Performance metrics (denormalized for fast filter/sort)
  spend             NUMERIC(12,2) DEFAULT 0,
  impressions       BIGINT DEFAULT 0,
  clicks            BIGINT DEFAULT 0,
  ctr               NUMERIC(8,4) DEFAULT 0,
  cpc               NUMERIC(10,4) DEFAULT 0,
  cpm               NUMERIC(10,4) DEFAULT 0,
  roas              NUMERIC(10,4) DEFAULT 0,
  purchases         INTEGER DEFAULT 0,
  purchase_value    NUMERIC(12,2) DEFAULT 0,
  cost_per_purchase NUMERIC(10,4) DEFAULT 0,
  reach             BIGINT DEFAULT 0,
  frequency         NUMERIC(8,4) DEFAULT 0,

  -- Date range the metrics cover
  metrics_start_date DATE,
  metrics_end_date   DATE,

  -- Timestamps
  meta_created_at   TIMESTAMPTZ,
  synced_at         TIMESTAMPTZ DEFAULT now(),
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),

  UNIQUE(organization_id, meta_ad_id)
);

-- Performance query indexes
CREATE INDEX idx_ads_org_spend ON ads(organization_id, spend DESC);
CREATE INDEX idx_ads_org_ctr ON ads(organization_id, ctr DESC);
CREATE INDEX idx_ads_org_roas ON ads(organization_id, roas DESC);
CREATE INDEX idx_ads_org_purchases ON ads(organization_id, purchases DESC);
CREATE INDEX idx_ads_org_status ON ads(organization_id, status);
CREATE INDEX idx_ads_org_creative_type ON ads(organization_id, creative_type);

-- Sync log
CREATE TABLE sync_log (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  ad_account_id     TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'pending',
  started_at        TIMESTAMPTZ DEFAULT now(),
  completed_at      TIMESTAMPTZ,
  ads_synced        INTEGER DEFAULT 0,
  error_message     TEXT,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- Generated prompts
CREATE TABLE generated_prompts (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type              TEXT NOT NULL,
  name              TEXT,
  prompt_text       TEXT NOT NULL,
  source_ad_ids     UUID[],
  config            JSONB,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- Seed a default organization for MVP
INSERT INTO organizations (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'My Organization', 'my-org');
