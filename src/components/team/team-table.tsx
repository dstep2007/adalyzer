"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ShieldCheck, Shield, User, UserX, UserCheck } from "lucide-react";
import type { TeamMember, OrgRole } from "@/types/database";

const ROLE_CONFIG: Record<OrgRole, { label: string; variant: "default" | "secondary" | "outline" }> = {
  owner: { label: "Owner", variant: "default" },
  admin: { label: "Admin", variant: "secondary" },
  member: { label: "Member", variant: "outline" },
};

function RoleIcon({ role }: { role: OrgRole }) {
  switch (role) {
    case "owner":
      return <ShieldCheck className="h-3.5 w-3.5" />;
    case "admin":
      return <Shield className="h-3.5 w-3.5" />;
    default:
      return <User className="h-3.5 w-3.5" />;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface TeamTableProps {
  members: TeamMember[];
  currentUserId: string;
  currentUserRole: OrgRole;
  onEditRole?: (member: TeamMember) => void;
  onDeactivate?: (member: TeamMember) => void;
  onReactivate?: (member: TeamMember) => void;
}

export function TeamTable({
  members,
  currentUserId,
  currentUserRole,
  onEditRole,
  onDeactivate,
  onReactivate,
}: TeamTableProps) {
  const canManage = currentUserRole === "owner" || currentUserRole === "admin";

  function canActOn(member: TeamMember): boolean {
    if (member.user_id === currentUserId) return false;
    if (currentUserRole === "admin" && member.role === "owner") return false;
    return true;
  }

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            {canManage && <TableHead className="w-[50px]" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            const isYou = member.user_id === currentUserId;
            const roleConfig = ROLE_CONFIG[member.role];
            const actable = canManage && canActOn(member);

            return (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {member.full_name
                        ? member.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : member.email.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {member.full_name || member.email}
                        {isYou && (
                          <span className="ml-1.5 text-xs text-muted-foreground">
                            (you)
                          </span>
                        )}
                      </p>
                      {member.full_name && (
                        <p className="truncate text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={roleConfig.variant} className="gap-1">
                    <RoleIcon role={member.role} />
                    {roleConfig.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {member.is_active ? (
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
                    >
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(member.created_at)}
                </TableCell>
                {canManage && (
                  <TableCell>
                    {actable && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {member.is_active && onEditRole && (
                            <DropdownMenuItem onClick={() => onEditRole(member)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                          )}
                          {member.is_active && onDeactivate && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => onDeactivate(member)}
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            </>
                          )}
                          {!member.is_active && onReactivate && (
                            <DropdownMenuItem onClick={() => onReactivate(member)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Reactivate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
