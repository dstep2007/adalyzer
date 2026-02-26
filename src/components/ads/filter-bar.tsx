"use client";

import { useState } from "react";
import { Filter, X, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AdFilters, MetricField, MetricFilter, METRIC_LABELS, SortDirection } from "@/types/filters";
import { ExportButton } from "./export-button";

interface FilterBarProps {
  filters: AdFilters;
  onFilterChange: (updates: Partial<AdFilters>) => void;
  onReset: () => void;
  showExport?: boolean;
}

const SORTABLE_FIELDS: MetricField[] = [
  "spend", "roas", "ctr", "cpc", "cpm", "purchases",
  "purchase_value", "cost_per_purchase", "impressions", "clicks", "reach", "frequency",
];

const FILTERABLE_FIELDS: MetricField[] = [
  "spend", "roas", "ctr", "cpc", "cpm", "purchases",
  "impressions", "clicks", "reach",
];

const LIMIT_OPTIONS = [25, 50, 100, 250, 500];

export function FilterBar({
  filters,
  onFilterChange,
  onReset,
  showExport = true,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterCount = filters.metrics.length + (filters.status ? 1 : 0) + (filters.creativeType ? 1 : 0);

  const updateMetricFilter = (field: MetricField, key: "min" | "max", value: string) => {
    const existing = filters.metrics.filter((m) => m.field !== field);
    const current = filters.metrics.find((m) => m.field === field);

    const updated: MetricFilter = {
      field,
      min: key === "min" ? (value ? parseFloat(value) : undefined) : current?.min,
      max: key === "max" ? (value ? parseFloat(value) : undefined) : current?.max,
    };

    if (updated.min !== undefined || updated.max !== undefined) {
      onFilterChange({ metrics: [...existing, updated] });
    } else {
      onFilterChange({ metrics: existing });
    }
  };

  const getMetricFilterValue = (field: MetricField, key: "min" | "max"): string => {
    const filter = filters.metrics.find((m) => m.field === field);
    if (!filter) return "";
    const val = key === "min" ? filter.min : filter.max;
    return val !== undefined ? String(val) : "";
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Sort controls */}
      <div className="flex items-center gap-2">
        <Select
          value={filters.sortBy}
          onValueChange={(value) => onFilterChange({ sortBy: value as MetricField })}
        >
          <SelectTrigger className="w-[160px] h-9">
            <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORTABLE_FIELDS.map((field) => (
              <SelectItem key={field} value={field}>
                {METRIC_LABELS[field]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          className="h-9 px-2.5"
          onClick={() =>
            onFilterChange({
              sortDir: filters.sortDir === "desc" ? "asc" : "desc",
            })
          }
        >
          {filters.sortDir === "desc" ? "High to Low" : "Low to High"}
        </Button>
      </div>

      {/* Result limit */}
      <Select
        value={String(filters.limit)}
        onValueChange={(value) => onFilterChange({ limit: parseInt(value) })}
      >
        <SelectTrigger className="w-[100px] h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LIMIT_OPTIONS.map((limit) => (
            <SelectItem key={limit} value={String(limit)}>
              {limit} results
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search */}
      <Input
        placeholder="Search ads..."
        className="w-[200px] h-9"
        value={filters.search || ""}
        onChange={(e) => onFilterChange({ search: e.target.value || undefined })}
      />

      {/* Metric filters (sheet) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Filter className="h-3.5 w-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] overflow-auto">
          <SheetHeader>
            <SheetTitle>Filter Ads</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Status filter */}
            <div className="space-y-2">
              <Label>Ad Status</Label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  onFilterChange({ status: value === "all" ? undefined : value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="PAUSED">Paused</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Creative type filter */}
            <div className="space-y-2">
              <Label>Creative Type</Label>
              <Select
                value={filters.creativeType || "all"}
                onValueChange={(value) =>
                  onFilterChange({ creativeType: value === "all" ? undefined : value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Metric range filters */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold">Metric Ranges</Label>
              {FILTERABLE_FIELDS.map((field) => (
                <div key={field} className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    {METRIC_LABELS[field]}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="h-8"
                      value={getMetricFilterValue(field, "min")}
                      onChange={(e) => updateMetricFilter(field, "min", e.target.value)}
                    />
                    <span className="text-muted-foreground text-xs">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      className="h-8"
                      value={getMetricFilterValue(field, "max")}
                      onChange={(e) => updateMetricFilter(field, "max", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <Button
              variant="outline"
              onClick={() => {
                onReset();
                setIsOpen(false);
              }}
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              Reset All Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Active filter badges */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" className="h-9 text-xs text-muted-foreground" onClick={onReset}>
          Clear all
          <X className="ml-1 h-3 w-3" />
        </Button>
      )}

      {/* Export */}
      {showExport && (
        <div className="ml-auto">
          <ExportButton filters={filters} />
        </div>
      )}
    </div>
  );
}
