"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  FileText,
  Sparkles,
  Wand2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Creatives",
    href: "/creatives",
    icon: Image,
  },
  {
    label: "Ad Copy",
    href: "/copy",
    icon: FileText,
  },
  {
    label: "Creative Prompts",
    href: "/prompts/creative",
    icon: Sparkles,
  },
  {
    label: "Copy Prompts",
    href: "/prompts/copy",
    icon: Wand2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden h-screen border-r border-border bg-sidebar transition-all duration-300 md:flex md:flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <Logo collapsed={collapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        {!collapsed && (
          <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3">
            <p className="text-xs font-medium text-muted-foreground">
              Adalyzer v1.0
            </p>
            <p className="text-xs text-muted-foreground/70">
              Meta Ads Analytics
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
