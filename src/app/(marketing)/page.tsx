import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Image,
  FileText,
  Sparkles,
  Search,
  Clock,
  Users,
  Megaphone,
  ArrowRight,
  Play,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track ROAS, CTR, CPC, and 10+ metrics across all your Meta ads. Filter and sort to find winners instantly.",
  },
  {
    icon: Image,
    title: "Creative Analysis",
    description:
      "Visual gallery of all your ad creatives ranked by performance. See what visual styles drive results.",
  },
  {
    icon: FileText,
    title: "Copy Analysis",
    description:
      "Analyze ad copy performance side-by-side. Discover which headlines and messaging convert best.",
  },
  {
    icon: Sparkles,
    title: "AI Prompt Generation",
    description:
      "Generate AI prompts from your top-performing ads. Build brand guidelines based on what actually works.",
  },
];

const painPoints = [
  {
    icon: Search,
    title: "You can't tell which ad copy is actually winning",
    description:
      "Meta Ads Manager buries copy performance across campaigns, ad sets, and ads. You're left scrolling through dozens of tabs, exporting spreadsheets, and manually comparing results. By the time you figure out what's working, you've already wasted budget on underperformers.",
  },
  {
    icon: Clock,
    title: "You're spending hours in Ads Manager instead of optimizing",
    description:
      "Every week you spend hours digging through Meta's interface trying to pull insights. Filtering, exporting, cross-referencing — it's a full-time job just to answer \"which ads should I scale?\" That's time you could spend on strategy and creative.",
  },
  {
    icon: Megaphone,
    title: "Your agency doesn't nail your brand voice",
    description:
      "You've hired an agency to run ads, but the copy they write doesn't sound like your brand. You keep going back and forth on revisions, but without a clear reference for what works, it's hard to give actionable feedback. You need a data-backed style guide, not another subjective opinion.",
  },
  {
    icon: Users,
    title: "You manage multiple brands and can't context-switch fast enough",
    description:
      "As an agency, you juggle ad accounts across multiple clients. Each brand has its own voice, audience, and winning formula. Switching between them is mentally exhausting, and it's easy to accidentally write copy that sounds like the wrong brand.",
  },
];

const steps = [
  {
    step: "1",
    title: "Connect your Meta account",
    description:
      "Securely link your Meta Ads account in a few clicks. We pull in all your campaigns, ad sets, and ads automatically.",
  },
  {
    step: "2",
    title: "See what's working instantly",
    description:
      "Browse your ads ranked by the metrics that matter — ROAS, CTR, CPC, and more. Filter by date, status, or campaign to zero in on winners.",
  },
  {
    step: "3",
    title: "Generate prompts and scale",
    description:
      "Turn your top-performing ads into AI prompts and brand guidelines. Create more of what works without starting from scratch.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Analyze your Meta Ads.
            <br />
            <span className="brand-gradient-text">Scale what works.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Adalyzer connects to your Meta Ads account and gives you deep
            performance insights on every creative and copy variant. Find your
            winners, generate AI prompts, and build brand guidelines from data.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                Get started free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Screenshot / Demo Placeholder */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-muted/50 shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Play className="h-7 w-7 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Product demo video
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Replace with a screenshot or walkthrough video
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Sound familiar?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            If you&apos;re running Meta Ads — whether in-house or through an
            agency — you&apos;ve probably hit one of these walls.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {painPoints.map((point) => (
              <Card key={point.title} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    <point.icon className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Meta Ads Manager wasn&apos;t built for this.
            <br />
            <span className="brand-gradient-text">Adalyzer was.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Adalyzer pulls your ad data into a single, clean interface designed
            for one thing: helping you figure out what&apos;s working and do more
            of it. No more spreadsheets. No more guesswork.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Everything you need to optimize your ads
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Connect your Meta account and start analyzing in minutes.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50">
                <CardContent className="flex gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Screenshot Placeholder */}
          <div className="mt-16 flex aspect-video items-center justify-center rounded-xl border border-border bg-muted/50 shadow-sm">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Dashboard screenshot
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Replace with a screenshot of the analytics dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Up and running in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            No complex setup. No CSV uploads. Just connect and go.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Built for brands and agencies
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold">For brands & DTC teams</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    See which ad copy and creatives are driving real results
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Give your agency a data-backed creative brief
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Generate AI prompts from your top performers to create more winners
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Stop wasting ad spend on underperforming creative
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold">For agencies</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Manage multiple client ad accounts from one workspace
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Quickly switch between brand voices with generated style guides
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Show clients exactly what&apos;s working with clear performance data
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Produce on-brand copy faster with AI prompts built from real data
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to find your winning ads?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Create your account and connect your Meta Ads in under 5 minutes.
          </p>
          <Link href="/signup">
            <Button size="lg" className="mt-8 px-8">
              Create your account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
