"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/types/database";

interface DeactivateConfirmDialogProps {
  member: TeamMember | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (member: TeamMember) => Promise<void>;
}

export function DeactivateConfirmDialog({
  member,
  onOpenChange,
  onConfirm,
}: DeactivateConfirmDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleConfirm() {
    if (!member) return;
    setIsSubmitting(true);
    try {
      await onConfirm(member);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={!!member} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deactivate Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to deactivate{" "}
            <span className="font-medium text-foreground">
              {member?.full_name || member?.email}
            </span>
            ? They will lose access to the organization immediately. Their data
            will be preserved, and you can reactivate them later.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deactivating..." : "Deactivate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
