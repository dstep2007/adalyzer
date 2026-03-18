"use client";

import { useState, useCallback } from "react";
import { Users, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingTable } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useUsers } from "@/hooks/use-users";
import { TeamTable } from "./team-table";
import { InviteUserDialog } from "./invite-user-dialog";
import { EditRoleDialog } from "./edit-role-dialog";
import { DeactivateConfirmDialog } from "./deactivate-confirm-dialog";
import type { TeamMember } from "@/types/database";

export function TeamContent() {
  const { user, role } = useAuth();
  const { members, isLoading, mutate } = useUsers();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamMember | null>(null);
  const [deactivateTarget, setDeactivateTarget] = useState<TeamMember | null>(
    null
  );

  const canManage = role === "owner" || role === "admin";
  const activeCount = members.filter((m) => m.is_active).length;

  const handleReactivate = useCallback(
    async (member: TeamMember) => {
      try {
        const res = await fetch(`/api/users/${member.id}/reactivate`, {
          method: "POST",
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to reactivate member");
        }
        toast.success(`${member.full_name || member.email} has been reactivated`);
        mutate();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to reactivate member");
      }
    },
    [mutate]
  );

  const handleResetPassword = useCallback(
    async (member: TeamMember) => {
      try {
        const res = await fetch(`/api/users/${member.id}/reset-password`, {
          method: "POST",
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to send password reset");
        }
        toast.success(`Password reset email sent to ${member.email}`);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to send password reset"
        );
      }
    },
    []
  );

  const handleDeactivate = useCallback(
    async (member: TeamMember) => {
      try {
        const res = await fetch(`/api/users/${member.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to deactivate member");
        }
        toast.success(`${member.full_name || member.email} has been deactivated`);
        setDeactivateTarget(null);
        mutate();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to deactivate member");
      }
    },
    [mutate]
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <LoadingTable />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <PageHeader
        title="Team"
        description={`${activeCount} active member${activeCount !== 1 ? "s" : ""}`}
      >
        {canManage && (
          <Button onClick={() => setInviteOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        )}
      </PageHeader>

      {members.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members"
          description="Invite your team to start collaborating."
          action={
            canManage ? (
              <Button onClick={() => setInviteOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            ) : undefined
          }
        />
      ) : (
        <TeamTable
          members={members}
          currentUserId={user?.id ?? ""}
          currentUserRole={role ?? "member"}
          onEditRole={canManage ? setEditTarget : undefined}
          onResetPassword={canManage ? handleResetPassword : undefined}
          onDeactivate={canManage ? setDeactivateTarget : undefined}
          onReactivate={canManage ? handleReactivate : undefined}
        />
      )}

      <InviteUserDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        currentUserRole={role ?? "member"}
        onSuccess={() => {
          mutate();
          setInviteOpen(false);
        }}
      />

      <EditRoleDialog
        member={editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        currentUserRole={role ?? "member"}
        onSuccess={() => {
          mutate();
          setEditTarget(null);
        }}
      />

      <DeactivateConfirmDialog
        member={deactivateTarget}
        onOpenChange={(open) => !open && setDeactivateTarget(null)}
        onConfirm={handleDeactivate}
      />
    </div>
  );
}
