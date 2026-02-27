import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Image, FileText, Sparkles } from "lucide-react";

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

      {/* Features */}
      <section className="border-t border-border bg-muted/30 py-20">
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
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
