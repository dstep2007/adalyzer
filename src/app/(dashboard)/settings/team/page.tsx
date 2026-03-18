"use client";

import { Suspense } from "react";
import { Topbar } from "@/components/layout/topbar";
import { TeamContent } from "@/components/team/team-content";
import { LoadingTable } from "@/components/shared/loading-state";

function TeamPageContent() {
  return (
    <div className="flex flex-col">
      <Topbar title="Team Management" />
      <TeamContent />
    </div>
  );
}

export default function TeamPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <LoadingTable />
        </div>
      }
    >
      <TeamPageContent />
    </Suspense>
  );
}
