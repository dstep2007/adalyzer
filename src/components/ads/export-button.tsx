"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExport } from "@/hooks/use-export";
import { AdFilters } from "@/types/filters";
import { toast } from "sonner";

interface ExportButtonProps {
  filters: AdFilters;
}

export function ExportButton({ filters }: ExportButtonProps) {
  const { exportAds, isExporting } = useExport();

  const handleExport = async () => {
    try {
      await exportAds(filters);
      toast.success("Export downloaded successfully");
    } catch {
      toast.error("Failed to export. Please try again.");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-9 gap-2"
      onClick={handleExport}
      disabled={isExporting}
    >
      <Download className="h-3.5 w-3.5" />
      {isExporting ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
