"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { TeamMember, OrgRole } from "@/types/database";

interface EditRoleDialogProps {
  member: TeamMember | null;
  onOpenChange: (open: boolean) => void;
  currentUserRole: OrgRole;
  onSuccess: () => void;
}

export function EditRoleDialog({
  member,
  onOpenChange,
  currentUserRole,
  onSuccess,
}: EditRoleDialogProps) {
  const [role, setRole] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (member) {
      setRole(member.role);
    }
  }, [member]);

  const isOwner = currentUserRole === "owner";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!member || role === member.role) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/users/${member.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update role");
      }

      toast.success(
        `${member.full_name || member.email} is now ${role === "owner" ? "an" : "a"} ${role}`
      );
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={!!member} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
          <DialogDescription>
            Update the role for {member?.full_name || member?.email}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="edit-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {isOwner && (
                  <SelectItem value="owner">
                    Owner — full permissions
                  </SelectItem>
                )}
                <SelectItem value="admin">
                  Admin — can manage everything except owners
                </SelectItem>
                <SelectItem value="member">
                  Member — can view and use all features
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || role === member?.role}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
