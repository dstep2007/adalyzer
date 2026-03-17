import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Deletion | Adalyzer",
  description:
    "How to request deletion of your data from Adalyzer, including Meta (Facebook) data.",
};

export default function DataDeletionPage() {
  const lastUpdated = "March 17, 2026";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        Data Deletion Instructions
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
        <section>
          <p>
            Adalyzer is committed to giving you full control over your data. You
            can request deletion of your data at any time using any of the
            methods described below.
          </p>
        </section>

        {/* ── 1. Delete Your Account ── */}
        <section>
          <h2>1. Delete Your Adalyzer Account</h2>
          <p className="mt-3">
            Deleting your account permanently removes all of your personal
            information and associated data from Adalyzer. To delete your
            account:
          </p>
          <ol className="mt-3">
            <li>
              Sign in to your Adalyzer account at{" "}
              <a
                href="https://adalyzer.com/login"
                className="underline hover:text-foreground"
              >
                adalyzer.com/login
              </a>
              .
            </li>
            <li>
              Navigate to{" "}
              <strong>Settings</strong>.
            </li>
            <li>
              Scroll to the <strong>Danger Zone</strong> section.
            </li>
            <li>
              Click <strong>Delete Account</strong> and confirm the deletion.
            </li>
          </ol>
          <p className="mt-3">When you delete your account, we will delete:</p>
          <ul className="mt-2">
            <li>Your profile information (name, email, password hash).</li>
            <li>Your organization membership and role data.</li>
            <li>
              All Meta (Facebook) data associated with your account, including
              access tokens, ad account data, campaign data, ad creatives, and
              performance metrics.
            </li>
            <li>Usage logs associated with your account.</li>
          </ul>
          <p className="mt-3">
            All data is removed within <strong>30 days</strong> of the deletion
            request. Residual copies in encrypted backups are overwritten within
            90 days.
          </p>
        </section>

        {/* ── 2. Disconnect Meta ── */}
        <section>
          <h2>2. Disconnect Your Meta (Facebook) Account</h2>
          <p className="mt-3">
            If you want to remove only your Meta advertising data while keeping
            your Adalyzer account active, you can disconnect your Meta
            connection:
          </p>

          <h3 className="mt-4">Option A: From Adalyzer</h3>
          <ol className="mt-2">
            <li>Sign in to your Adalyzer account.</li>
            <li>
              Navigate to <strong>Settings</strong>.
            </li>
            <li>
              In the <strong>Meta Connection</strong> section, click{" "}
              <strong>Disconnect</strong>.
            </li>
          </ol>

          <h3 className="mt-4">Option B: From Facebook</h3>
          <ol className="mt-2">
            <li>
              Go to your{" "}
              <a
                href="https://www.facebook.com/settings?tab=business_tools"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Facebook Business Integrations settings
              </a>
              .
            </li>
            <li>Find Adalyzer in your list of connected apps.</li>
            <li>
              Click <strong>Remove</strong> to revoke Adalyzer&apos;s access.
            </li>
          </ol>

          <p className="mt-3">
            When you disconnect your Meta account through either method, we
            will delete all stored Meta data within <strong>30 days</strong>,
            including:
          </p>
          <ul className="mt-2">
            <li>Meta OAuth access tokens.</li>
            <li>Ad account information (IDs, names, status).</li>
            <li>
              Campaign, ad set, and ad data (names, creative content,
              performance metrics).
            </li>
            <li>Any cached or synced Meta advertising data.</li>
          </ul>
        </section>

        {/* ── 3. Email Request ── */}
        <section>
          <h2>3. Request Deletion via Email</h2>
          <p className="mt-3">
            If you are unable to access your account or prefer to submit a
            deletion request manually, you can email us directly:
          </p>
          <ul className="mt-3">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacy@adalyzer.com"
                className="underline hover:text-foreground"
              >
                privacy@adalyzer.com
              </a>
            </li>
            <li>
              <strong>Subject:</strong> Data Deletion Request
            </li>
          </ul>
          <p className="mt-3">
            Please include the email address associated with your Adalyzer
            account so we can locate and process your request. We will confirm
            receipt within <strong>5 business days</strong> and complete the
            deletion within <strong>30 days</strong>.
          </p>
        </section>

        {/* ── 4. What We Delete ── */}
        <section>
          <h2>4. What Data Is Deleted</h2>
          <p className="mt-3">
            Regardless of the deletion method you choose, we delete the
            following categories of data:
          </p>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 font-medium text-foreground">
                    Data Category
                  </th>
                  <th className="px-4 py-2.5 font-medium text-foreground">
                    Deletion Timeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-2.5">
                    Account profile (name, email)
                  </td>
                  <td className="px-4 py-2.5">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Meta access tokens</td>
                  <td className="px-4 py-2.5">
                    Immediately revoked, deleted within 30 days
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">
                    Ad account and campaign data
                  </td>
                  <td className="px-4 py-2.5">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">
                    Ad creatives and performance metrics
                  </td>
                  <td className="px-4 py-2.5">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Organization membership</td>
                  <td className="px-4 py-2.5">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Usage logs</td>
                  <td className="px-4 py-2.5">Within 30 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Encrypted backup copies</td>
                  <td className="px-4 py-2.5">Within 90 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5. Data We May Retain ── */}
        <section>
          <h2>5. Data We May Retain</h2>
          <p className="mt-3">
            In limited circumstances, we may retain certain data after a
            deletion request as required by law or legitimate business need:
          </p>
          <ul className="mt-2">
            <li>
              <strong>Legal compliance:</strong> records required to comply with
              applicable laws, regulations, or legal proceedings.
            </li>
            <li>
              <strong>Fraud prevention:</strong> minimal information necessary
              to prevent fraud or enforce our Terms of Service.
            </li>
            <li>
              <strong>Aggregated or anonymized data:</strong> data that has been
              fully anonymized and can no longer identify you may be retained
              for analytics purposes.
            </li>
          </ul>
        </section>

        {/* ── 6. Confirmation ── */}
        <section>
          <h2>6. Deletion Confirmation</h2>
          <p className="mt-3">
            Once your data has been deleted, we will send a confirmation to your
            email address (if the deletion was requested via email). For
            in-app deletions, the action takes effect immediately and you will
            be signed out of the Service.
          </p>
        </section>

        {/* ── 7. Questions ── */}
        <section>
          <h2>7. Questions</h2>
          <p className="mt-3">
            If you have questions about data deletion or need assistance,
            contact us at{" "}
            <a
              href="mailto:privacy@adalyzer.com"
              className="underline hover:text-foreground"
            >
              privacy@adalyzer.com
            </a>
            .
          </p>
        </section>

        {/* ── Related ── */}
        <section className="border-t border-border pt-8">
          <p>
            See also our{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
