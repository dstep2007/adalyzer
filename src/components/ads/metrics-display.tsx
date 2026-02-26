import { Badge } from "@/components/ui/badge";
import { formatMetric, getMetricColor } from "@/lib/utils";
import { MetricField, METRIC_LABELS } from "@/types/filters";

interface MetricsDisplayProps {
  metrics: Partial<Record<MetricField, number>>;
  fields?: MetricField[];
  size?: "sm" | "default";
}

const DEFAULT_FIELDS: MetricField[] = ["spend", "roas", "ctr", "purchases"];

export function MetricsDisplay({
  metrics,
  fields = DEFAULT_FIELDS,
  size = "default",
}: MetricsDisplayProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {fields.map((field) => {
        const value = metrics[field];
        if (value === undefined || value === null) return null;

        return (
          <Badge
            key={field}
            variant="secondary"
            className={`${size === "sm" ? "text-xs px-1.5 py-0" : "text-xs px-2 py-0.5"} ${getMetricColor(field, value)}`}
          >
            {METRIC_LABELS[field]}: {formatMetric(value, field)}
          </Badge>
        );
      })}
    </div>
  );
}
