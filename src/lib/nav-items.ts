import {
  LayoutDashboard,
  Image,
  FileText,
  Sparkles,
  Wand2,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { OrgRole } from "@/types/database";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: OrgRole[];
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Creatives", href: "/creatives", icon: Image },
  { label: "Ad Copy", href: "/copy", icon: FileText },
  { label: "Creative Prompts", href: "/prompts/creative", icon: Sparkles },
  { label: "Copy Prompts", href: "/prompts/copy", icon: Wand2 },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Team", href: "/settings/team", icon: Users, roles: ["owner", "admin"] },
];
