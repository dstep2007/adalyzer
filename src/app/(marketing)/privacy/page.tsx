import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Adalyzer",
  description:
    "Adalyzer Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 17, 2026";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {/* ── 1. Introduction ── */}
        <section>
          <h2>1. Introduction</h2>
          <p className="mt-3">
            Adalyzer (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
            operated by Little Thread Co. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            the Adalyzer web application and related services (collectively, the
            &quot;Service&quot;). By accessing or using the Service, you agree to
            the terms of this Privacy Policy. If you do not agree, please do not
            use the Service.
          </p>
        </section>

        {/* ── 2. Information We Collect ── */}
        <section>
          <h2>2. Information We Collect</h2>

          <h3 className="mt-4">2.1 Information You Provide</h3>
          <ul className="mt-2">
            <li>
              <strong>Account information:</strong> name, email address, and
              password when you create an account.
            </li>
            <li>
              <strong>Organization details:</strong> company or team name and
              role information you provide when setting up an organization.
            </li>
            <li>
              <strong>Payment information:</strong> billing details processed by
              our third-party payment processor. We do not store full payment
              card numbers on our servers.
            </li>
            <li>
              <strong>Communications:</strong> information you provide when you
              contact us for support or send us feedback.
            </li>
          </ul>

          <h3 className="mt-4">
            2.2 Information from Meta (Facebook) Integration
          </h3>
          <p className="mt-2">
            When you connect your Meta (Facebook) account through Facebook
            Login, we receive and store the following data in accordance with
            Meta Platform Terms:
          </p>
          <ul className="mt-2">
            <li>
              <strong>Authentication tokens:</strong> OAuth access tokens that
              allow us to access your authorized Meta advertising data on your
              behalf.
            </li>
            <li>
              <strong>Ad account information:</strong> ad account IDs, names,
              and account status.
            </li>
            <li>
              <strong>Campaign and ad data:</strong> campaign names, ad set
              names, ad creative content (text, images, videos), and performance
              metrics (impressions, clicks, spend, conversions, CTR, CPC, CPM,
              ROAS).
            </li>
            <li>
              <strong>Basic profile information:</strong> your Facebook user ID
              and name, as required by Facebook Login.
            </li>
          </ul>
          <p className="mt-2">
            We only request the minimum permissions necessary to provide the
            Service. You can review and revoke these permissions at any time
            through your{" "}
            <a
              href="https://www.facebook.com/settings?tab=business_tools"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Facebook Business Integrations settings
            </a>
            .
          </p>

          <h3 className="mt-4">2.3 Automatically Collected Information</h3>
          <ul className="mt-2">
            <li>
              <strong>Usage data:</strong> pages visited, features used, and
              actions taken within the Service.
            </li>
            <li>
              <strong>Device and browser information:</strong> IP address,
              browser type, operating system, and device identifiers.
            </li>
            <li>
              <strong>Cookies and similar technologies:</strong> we use
              essential cookies for authentication and session management. See
              Section 8 for details.
            </li>
          </ul>
        </section>

        {/* ── 3. How We Use Your Information ── */}
        <section>
          <h2>3. How We Use Your Information</h2>
          <p className="mt-3">
            We use the information we collect for the following purposes:
          </p>
          <ul className="mt-2">
            <li>
              <strong>Provide and operate the Service:</strong> display your ad
              performance data, generate analytics, and produce creative and
              copy analysis.
            </li>
            <li>
              <strong>Authentication and security:</strong> verify your identity,
              maintain session security, and protect against unauthorized access.
            </li>
            <li>
              <strong>Improve the Service:</strong> analyze usage patterns to
              improve features, fix bugs, and optimize performance.
            </li>
            <li>
              <strong>Communicate with you:</strong> send service-related
              notices, respond to support requests, and provide updates about
              changes to the Service.
            </li>
            <li>
              <strong>Comply with legal obligations:</strong> meet applicable
              legal requirements, enforce our terms, and protect our rights.
            </li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> sell your personal information or your
            Meta advertising data to third parties. We do <strong>not</strong>{" "}
            use your Meta data for purposes other than providing the Service to
            you.
          </p>
        </section>

        {/* ── 4. How We Share Your Information ── */}
        <section>
          <h2>4. How We Share Your Information</h2>
          <p className="mt-3">
            We may share your information only in the following circumstances:
          </p>
          <ul className="mt-2">
            <li>
              <strong>Within your organization:</strong> other members of your
              Adalyzer organization can view shared ad data and analytics as
              configured by your organization&apos;s administrators.
            </li>
            <li>
              <strong>Service providers:</strong> we use trusted third-party
              providers for hosting (Vercel), database services (Supabase), and
              payment processing. These providers are contractually bound to
              protect your data and only process it on our behalf.
            </li>
            <li>
              <strong>Legal requirements:</strong> we may disclose information
              if required by law, subpoena, court order, or governmental
              request, or when we believe disclosure is necessary to protect our
              rights, your safety, or the safety of others.
            </li>
            <li>
              <strong>Business transfers:</strong> in connection with a merger,
              acquisition, or sale of assets, your information may be
              transferred to the acquiring entity, subject to the same privacy
              protections described in this policy.
            </li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> share Meta user data with third parties
            for their own independent use, advertising, or data brokerage. All
            Meta data is processed solely for the purpose of delivering the
            Service to you.
          </p>
        </section>

        {/* ── 5. Data from Meta Platform ── */}
        <section>
          <h2>5. Meta Platform Data Use</h2>
          <p className="mt-3">
            Our use of information received from Meta APIs adheres to the{" "}
            <a
              href="https://developers.facebook.com/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Meta Platform Terms
            </a>{" "}
            and{" "}
            <a
              href="https://developers.facebook.com/devpolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Developer Policies
            </a>
            . Specifically:
          </p>
          <ul className="mt-2">
            <li>
              We only request permissions that are necessary to provide our
              Service.
            </li>
            <li>
              We do not sell, license, or otherwise transfer Meta data to any ad
              network, data broker, or other monetization-related service.
            </li>
            <li>
              We do not use Meta data to build or augment user profiles for
              advertising purposes.
            </li>
            <li>
              We do not use Meta data to conduct surveillance or track
              individuals.
            </li>
            <li>
              We store Meta access tokens securely and encrypted in our database.
              Tokens are only used to fetch advertising data you have explicitly
              authorized.
            </li>
            <li>
              Upon disconnection of your Meta account or deletion of your
              Adalyzer account, we delete all stored Meta data, including access
              tokens, within 30 days.
            </li>
            <li>
              You may request deletion of your Meta data at any time by
              contacting us or disconnecting your Meta account through the
              Service settings.
            </li>
          </ul>
        </section>

        {/* ── 6. Data Retention ── */}
        <section>
          <h2>6. Data Retention</h2>
          <ul className="mt-3">
            <li>
              <strong>Account data:</strong> retained for as long as your
              account is active. Upon account deletion, we remove your personal
              data within 30 days, except as required by law.
            </li>
            <li>
              <strong>Meta advertising data:</strong> retained only while your
              Meta account is connected. When you disconnect your Meta account
              or delete your Adalyzer account, all synced Meta data is deleted
              within 30 days.
            </li>
            <li>
              <strong>Usage logs:</strong> retained for up to 12 months for
              security and operational purposes, then deleted or anonymized.
            </li>
            <li>
              <strong>Backups:</strong> residual copies in encrypted backups are
              overwritten within 90 days of deletion.
            </li>
          </ul>
        </section>

        {/* ── 7. Data Security ── */}
        <section>
          <h2>7. Data Security</h2>
          <p className="mt-3">
            We implement appropriate technical and organizational measures to
            protect your data, including:
          </p>
          <ul className="mt-2">
            <li>Encryption of data in transit (TLS/HTTPS) and at rest.</li>
            <li>
              Row-level security (RLS) in our database to ensure strict
              multi-tenant data isolation — your data is only accessible to
              authorized members of your organization.
            </li>
            <li>
              Secure storage of Meta access tokens with restricted access.
            </li>
            <li>
              Regular security reviews and updates of our infrastructure and
              dependencies.
            </li>
          </ul>
          <p className="mt-2">
            While we strive to protect your information, no method of electronic
            transmission or storage is 100% secure. We cannot guarantee absolute
            security.
          </p>
        </section>

        {/* ── 8. Cookies ── */}
        <section>
          <h2>8. Cookies and Tracking Technologies</h2>
          <p className="mt-3">
            We use strictly necessary cookies to operate the Service, including
            authentication session cookies. We do not use third-party tracking
            or advertising cookies. We may use privacy-respecting analytics to
            understand how the Service is used, but we do not track you across
            other websites.
          </p>
        </section>

        {/* ── 9. Your Rights ── */}
        <section>
          <h2>9. Your Rights and Choices</h2>
          <p className="mt-3">
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="mt-2">
            <li>
              <strong>Access:</strong> request a copy of the personal data we
              hold about you.
            </li>
            <li>
              <strong>Correction:</strong> request correction of inaccurate or
              incomplete data.
            </li>
            <li>
              <strong>Deletion:</strong> request deletion of your personal data
              and Meta data.
            </li>
            <li>
              <strong>Data portability:</strong> request your data in a
              structured, machine-readable format.
            </li>
            <li>
              <strong>Withdraw consent:</strong> revoke consent for data
              processing where consent is the legal basis.
            </li>
            <li>
              <strong>Disconnect Meta:</strong> revoke Adalyzer&apos;s access to
              your Meta data at any time through your Service settings or
              Facebook Business Integrations settings.
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:privacy@adalyzer.com"
              className="underline hover:text-foreground"
            >
              privacy@adalyzer.com
            </a>
            .
          </p>
        </section>

        {/* ── 10. International Data Transfers ── */}
        <section>
          <h2>10. International Data Transfers</h2>
          <p className="mt-3">
            Your data may be processed and stored in the United States or other
            countries where our service providers operate. By using the Service,
            you consent to the transfer of your data to these jurisdictions. We
            ensure that appropriate safeguards are in place to protect your data
            in accordance with this Privacy Policy.
          </p>
        </section>

        {/* ── 11. Children's Privacy ── */}
        <section>
          <h2>11. Children&apos;s Privacy</h2>
          <p className="mt-3">
            The Service is not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children. If you
            believe we have inadvertently collected data from a child, please
            contact us and we will promptly delete it.
          </p>
        </section>

        {/* ── 12. Third-Party Links ── */}
        <section>
          <h2>12. Third-Party Links and Services</h2>
          <p className="mt-3">
            The Service may contain links to third-party websites or services,
            including Meta/Facebook. We are not responsible for the privacy
            practices of these third parties. We encourage you to review their
            privacy policies before providing any information.
          </p>
        </section>

        {/* ── 13. Changes ── */}
        <section>
          <h2>13. Changes to This Privacy Policy</h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. When we make
            material changes, we will notify you by updating the &quot;Last
            updated&quot; date at the top of this page and, where required,
            providing additional notice (such as an in-app notification or
            email). Your continued use of the Service after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        {/* ── 14. Contact ── */}
        <section>
          <h2>14. Contact Us</h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy, your data, or your
            rights, please contact us:
          </p>
          <ul className="mt-2">
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
              <strong>Company:</strong> Little Thread Co
            </li>
          </ul>
        </section>

        {/* ── Related ── */}
        <section className="border-t border-border pt-8">
          <p>
            See also our{" "}
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
