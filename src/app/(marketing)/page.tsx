import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Image,
  FileText,
  Sparkles,
  TrendingDown,
  EyeOff,
  Hourglass,
  MessageSquareWarning,
  Shuffle,
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
    icon: EyeOff,
    title: "You can't tell which ad copy is actually winning",
    description:
      "Meta Ads Manager buries copy performance across campaigns, ad sets, and ads. You're left scrolling through dozens of tabs, exporting spreadsheets, and manually comparing results. By the time you figure out what's working, you've already wasted budget on underperformers.",
  },
  {
    icon: Hourglass,
    title: "You're spending hours in Ads Manager instead of optimizing",
    description:
      "Every week you spend hours digging through Meta's interface trying to pull insights. Filtering, exporting, cross-referencing — it's a full-time job just to answer \"which ads should I scale?\" That's time you could spend on strategy and creative.",
  },
  {
    icon: MessageSquareWarning,
    title: "Your agency doesn't nail your brand voice",
    description:
      "You've hired an agency to run ads, but the copy they write doesn't sound like your brand. You keep going back and forth on revisions, but without a clear reference for what works, it's hard to give actionable feedback. You need a data-backed style guide, not another subjective opinion.",
  },
  {
    icon: Shuffle,
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
      <section className="hero-bg relative overflow-hidden py-24 sm:py-32">
        {/* Decorative glow orbs */}
        <div className="glow-orb -top-24 left-1/4 h-96 w-96 bg-blue-500/10" />
        <div className="glow-orb -bottom-24 right-1/4 h-80 w-80 bg-purple-500/10" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Meta Ads analytics, simplified
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
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
              <Button size="lg" className="brand-gradient px-8 text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30">
                Get started free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Screenshot / Demo Placeholder */}
      <section className="relative -mt-8 pb-16 sm:-mt-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="gradient-border flex aspect-video items-center justify-center rounded-xl border-0 bg-background shadow-2xl shadow-primary/10">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full brand-gradient shadow-lg shadow-primary/25">
                <Play className="h-7 w-7 text-white" />
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
      <section className="section-gradient-1 relative overflow-hidden py-20">
        <div className="dot-pattern absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
              <TrendingDown className="h-7 w-7 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Sound familiar?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              If you&apos;re running Meta Ads — whether in-house or through an
              agency — you&apos;ve probably hit one of these walls.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {painPoints.map((point) => (
              <Card key={point.title} className="gradient-border border-0 bg-background/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <point.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
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

      {/* Transition — bold gradient banner */}
      <section className="brand-gradient-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA3KSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Meta Ads Manager wasn&apos;t built for this.
            <br />
            <span className="text-white/80">Adalyzer was.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100/80">
            Adalyzer pulls your ad data into a single, clean interface designed
            for one thing: helping you figure out what&apos;s working and do more
            of it. No more spreadsheets. No more guesswork.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="mt-8 px-8 shadow-lg">
              See how it works
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section-gradient-2 relative overflow-hidden py-20">
        <div className="glow-orb -right-32 top-1/2 h-72 w-72 bg-purple-500/8" />
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Everything you need to optimize your ads
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Connect your Meta account and start analyzing in minutes.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="gradient-border border-0 bg-background/80 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="flex gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg brand-gradient shadow-sm shadow-primary/20">
                    <feature.icon className="h-5 w-5 text-white" />
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
          <div className="gradient-border mt-16 flex aspect-video items-center justify-center rounded-xl border-0 bg-background shadow-xl shadow-primary/10">
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
      <section className="relative overflow-hidden border-t border-border py-20">
        <div className="dot-pattern absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Up and running in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            No complex setup. No CSV uploads. Just connect and go.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-6 hidden h-px w-full bg-linear-to-r from-primary/30 to-purple-500/30 sm:block" />
                )}
                <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full brand-gradient font-bold text-white shadow-lg shadow-primary/25">
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
      <section className="section-gradient-1 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Built for{" "}
            <span className="brand-gradient-text">brands</span> and{" "}
            <span className="brand-gradient-text">agencies</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Card className="gradient-border border-0 bg-background/80 backdrop-blur-sm">
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
            <Card className="gradient-border border-0 bg-background/80 backdrop-blur-sm">
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
      <section className="brand-gradient-bg relative overflow-hidden py-20">
        <div className="glow-orb -bottom-20 -left-20 h-60 w-60 bg-white/10" />
        <div className="glow-orb -right-20 -top-20 h-60 w-60 bg-white/10" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to find your winning ads?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-blue-100/80">
            Create your account and connect your Meta Ads in under 5 minutes.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="mt-8 px-8 shadow-lg transition-transform hover:scale-105">
              Create your account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
