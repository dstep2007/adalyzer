import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Adalyzer",
  description: "Adalyzer Terms of Service — rules and conditions for using our platform.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "March 17, 2026";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1">
        {/* ── 1. Agreement ── */}
        <section>
          <h2>1. Agreement to Terms</h2>
          <p className="mt-3">
            These Terms of Service (&quot;Terms&quot;) constitute a legally
            binding agreement between you (&quot;you&quot; or &quot;User&quot;)
            and Little Thread Co (&quot;Company,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;), governing your access to and use
            of the Adalyzer web application and related services (the
            &quot;Service&quot;). By creating an account or using the Service,
            you agree to be bound by these Terms and our{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            . If you do not agree, do not use the Service.
          </p>
          <p className="mt-2">
            If you are using the Service on behalf of an organization, you
            represent and warrant that you have the authority to bind that
            organization to these Terms, and &quot;you&quot; refers to both you
            individually and the organization.
          </p>
        </section>

        {/* ── 2. Description of Service ── */}
        <section>
          <h2>2. Description of the Service</h2>
          <p className="mt-3">
            Adalyzer is a software-as-a-service (SaaS) platform that helps
            advertisers and agencies analyze the performance of their Meta
            (Facebook/Instagram) advertising campaigns. The Service provides:
          </p>
          <ul className="mt-2">
            <li>Integration with Meta Ads Manager via authorized OAuth connection.</li>
            <li>Syncing and display of ad performance metrics and creative data.</li>
            <li>Analytics dashboards for performance, creative, and copy analysis.</li>
            <li>AI prompt generation tools based on ad performance data.</li>
            <li>Multi-tenant organization management with role-based access.</li>
          </ul>
        </section>

        {/* ── 3. Account Registration ── */}
        <section>
          <h2>3. Account Registration and Security</h2>
          <p className="mt-3">
            To use the Service, you must create an account by providing accurate
            and complete information. You are responsible for:
          </p>
          <ul className="mt-2">
            <li>
              Maintaining the confidentiality of your account credentials.
            </li>
            <li>All activities that occur under your account.</li>
            <li>
              Promptly notifying us of any unauthorized access or use of your
              account.
            </li>
          </ul>
          <p className="mt-2">
            We reserve the right to suspend or terminate accounts that provide
            false information, violate these Terms, or pose a security risk.
          </p>
        </section>

        {/* ── 4. Meta Platform Integration ── */}
        <section>
          <h2>4. Meta Platform Integration</h2>
          <p className="mt-3">
            The Service integrates with Meta platforms through Facebook Login
            and the Meta Marketing API. By connecting your Meta account, you
            acknowledge and agree that:
          </p>
          <ul className="mt-2">
            <li>
              You authorize Adalyzer to access your Meta ad account data as
              described in our{" "}
              <Link
                href="/privacy"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </Link>
              .
            </li>
            <li>
              Your use of Meta data through the Service is subject to{" "}
              <a
                href="https://www.facebook.com/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Meta&apos;s Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://developers.facebook.com/terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Meta Platform Terms
              </a>
              .
            </li>
            <li>
              You are solely responsible for ensuring you have the necessary
              rights and permissions to access the ad accounts you connect.
            </li>
            <li>
              You may revoke Adalyzer&apos;s access at any time through the
              Service settings or your{" "}
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
            <li>
              We do not control Meta&apos;s services, and we are not liable for
              any disruptions, changes, or limitations imposed by Meta on API
              access.
            </li>
          </ul>
        </section>

        {/* ── 5. Acceptable Use ── */}
        <section>
          <h2>5. Acceptable Use</h2>
          <p className="mt-3">You agree not to:</p>
          <ul className="mt-2">
            <li>
              Use the Service for any unlawful purpose or in violation of any
              applicable laws or regulations.
            </li>
            <li>
              Access or attempt to access ad accounts or data you are not
              authorized to view.
            </li>
            <li>
              Reverse engineer, decompile, or disassemble any part of the
              Service.
            </li>
            <li>
              Interfere with or disrupt the Service, servers, or networks
              connected to the Service.
            </li>
            <li>
              Use automated means (bots, scrapers) to access the Service except
              through our documented APIs.
            </li>
            <li>
              Resell, redistribute, or sublicense access to the Service or any
              data obtained through it without our prior written consent.
            </li>
            <li>
              Use Meta data obtained through the Service in any manner that
              violates Meta&apos;s policies, including using it for surveillance,
              discrimination, or unauthorized profiling.
            </li>
            <li>
              Upload malicious code, viruses, or any material designed to
              damage or impair the Service.
            </li>
          </ul>
          <p className="mt-2">
            Violation of these restrictions may result in immediate termination
            of your account and legal action.
          </p>
        </section>

        {/* ── 6. Intellectual Property ── */}
        <section>
          <h2>6. Intellectual Property</h2>
          <h3 className="mt-4">6.1 Our Intellectual Property</h3>
          <p className="mt-2">
            The Service, including its design, features, code, documentation,
            logos, and trademarks, is owned by Little Thread Co and protected by
            intellectual property laws. These Terms do not grant you any right,
            title, or interest in the Service except the limited right to use it
            in accordance with these Terms.
          </p>

          <h3 className="mt-4">6.2 Your Data</h3>
          <p className="mt-2">
            You retain all rights to the data you provide to the Service,
            including your Meta advertising data. By using the Service, you
            grant us a limited, non-exclusive license to process, store, and
            display your data solely for the purpose of providing and improving
            the Service.
          </p>

          <h3 className="mt-4">6.3 Feedback</h3>
          <p className="mt-2">
            If you provide suggestions, ideas, or feedback about the Service,
            you grant us a non-exclusive, royalty-free, perpetual license to
            use, modify, and incorporate such feedback into the Service without
            obligation to you.
          </p>
        </section>

        {/* ── 7. Fees and Payment ── */}
        <section>
          <h2>7. Fees and Payment</h2>
          <ul className="mt-3">
            <li>
              The Service may include free and paid tiers. Pricing and feature
              availability are described on our website and may change with
              reasonable notice.
            </li>
            <li>
              Paid subscriptions are billed in advance on a recurring basis
              (monthly or annually). You authorize us to charge your payment
              method for all applicable fees.
            </li>
            <li>
              All fees are non-refundable except as required by law or
              explicitly stated otherwise.
            </li>
            <li>
              If payment fails, we may suspend your access to paid features
              until the outstanding balance is resolved.
            </li>
          </ul>
        </section>

        {/* ── 8. Termination ── */}
        <section>
          <h2>8. Termination</h2>
          <h3 className="mt-4">8.1 By You</h3>
          <p className="mt-2">
            You may stop using the Service and delete your account at any time
            through the account settings. Upon deletion, we will remove your
            data in accordance with our{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>

          <h3 className="mt-4">8.2 By Us</h3>
          <p className="mt-2">
            We may suspend or terminate your account at any time if you violate
            these Terms, engage in fraudulent activity, or if continued provision
            of the Service becomes impractical due to legal, technical, or
            business reasons. Where possible, we will provide reasonable notice
            before termination.
          </p>

          <h3 className="mt-4">8.3 Effect of Termination</h3>
          <p className="mt-2">
            Upon termination, your right to use the Service ceases immediately.
            We will delete your data within 30 days, except as required to
            comply with legal obligations, resolve disputes, or enforce our
            agreements. Sections 6, 9, 10, 11, 12, and 13 survive termination.
          </p>
        </section>

        {/* ── 9. Disclaimers ── */}
        <section>
          <h2>9. Disclaimers</h2>
          <p className="mt-3">
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p className="mt-2">Without limiting the foregoing, we do not warrant that:</p>
          <ul className="mt-2">
            <li>The Service will be uninterrupted, error-free, or secure.</li>
            <li>
              Data synced from Meta will be complete, accurate, or current —
              data accuracy depends on Meta&apos;s API and your ad account
              configuration.
            </li>
            <li>
              The analytics, insights, or prompt suggestions provided by the
              Service will produce specific advertising outcomes or results.
            </li>
            <li>
              The Service will be compatible with all devices, browsers, or
              third-party services.
            </li>
          </ul>
          <p className="mt-2">
            You acknowledge that advertising performance depends on many
            factors outside our control, and you use the Service&apos;s analytics
            and recommendations at your own discretion and risk.
          </p>
        </section>

        {/* ── 10. Limitation of Liability ── */}
        <section>
          <h2>10. Limitation of Liability</h2>
          <p className="mt-3">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
            SHALL LITTLE THREAD CO, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR
            AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
            LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, ARISING
            OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE,
            EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="mt-2">
            OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF
            OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE
            GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS
            PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100).
          </p>
          <p className="mt-2">
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
            CERTAIN DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO
            YOU.
          </p>
        </section>

        {/* ── 11. Indemnification ── */}
        <section>
          <h2>11. Indemnification</h2>
          <p className="mt-3">
            You agree to indemnify, defend, and hold harmless Little Thread Co
            and its officers, directors, employees, and agents from and against
            any claims, liabilities, damages, losses, and expenses (including
            reasonable attorneys&apos; fees) arising out of or related to:
          </p>
          <ul className="mt-2">
            <li>Your use of the Service.</li>
            <li>Your violation of these Terms.</li>
            <li>
              Your violation of any third-party rights, including Meta&apos;s
              terms and policies.
            </li>
            <li>
              Your advertising content or campaigns analyzed through the
              Service.
            </li>
          </ul>
        </section>

        {/* ── 12. Dispute Resolution ── */}
        <section>
          <h2>12. Dispute Resolution</h2>
          <p className="mt-3">
            Any dispute arising out of or relating to these Terms or the Service
            shall first be attempted to be resolved through good-faith
            negotiation. If the dispute cannot be resolved within 30 days, it
            shall be resolved through binding arbitration administered under the
            rules of the American Arbitration Association, conducted in the
            state where Little Thread Co is headquartered. Each party bears its
            own costs and attorneys&apos; fees unless the arbitrator determines
            otherwise.
          </p>
          <p className="mt-2">
            YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED
            ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR
            REPRESENTATIVE ACTION. You may opt out of this arbitration
            agreement by notifying us in writing within 30 days of first
            agreeing to these Terms.
          </p>
        </section>

        {/* ── 13. General Provisions ── */}
        <section>
          <h2>13. General Provisions</h2>

          <h3 className="mt-4">13.1 Governing Law</h3>
          <p className="mt-2">
            These Terms are governed by the laws of the State of Delaware,
            United States, without regard to its conflict of laws provisions.
          </p>

          <h3 className="mt-4">13.2 Entire Agreement</h3>
          <p className="mt-2">
            These Terms, together with the Privacy Policy, constitute the
            entire agreement between you and us regarding the Service and
            supersede all prior agreements and understandings.
          </p>

          <h3 className="mt-4">13.3 Severability</h3>
          <p className="mt-2">
            If any provision of these Terms is held invalid or unenforceable,
            that provision will be modified to the minimum extent necessary, and
            the remaining provisions will continue in full force and effect.
          </p>

          <h3 className="mt-4">13.4 Waiver</h3>
          <p className="mt-2">
            Our failure to enforce any right or provision of these Terms does
            not constitute a waiver of that right or provision.
          </p>

          <h3 className="mt-4">13.5 Assignment</h3>
          <p className="mt-2">
            You may not assign or transfer these Terms or your rights under
            them without our prior written consent. We may assign our rights
            and obligations without restriction.
          </p>

          <h3 className="mt-4">13.6 Changes to Terms</h3>
          <p className="mt-2">
            We may modify these Terms at any time. Material changes will be
            communicated by updating the &quot;Last updated&quot; date and, where
            appropriate, providing additional notice. Continued use of the
            Service after changes take effect constitutes acceptance.
          </p>
        </section>

        {/* ── 14. Contact ── */}
        <section>
          <h2>14. Contact Us</h2>
          <p className="mt-3">
            For questions about these Terms, please contact us:
          </p>
          <ul className="mt-2">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:legal@adalyzer.com"
                className="underline hover:text-foreground"
              >
                legal@adalyzer.com
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
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
