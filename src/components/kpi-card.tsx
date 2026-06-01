"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { MiniSparkline } from "@/components/charts";
import { cn } from "@/lib/utils";

export function KpiCard<S extends object>({
  label,
  value,
  decimals = 0,
  prefix,
  suffix,
  icon: Icon,
  trend,
  spark,
  sparkColor,
}: {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean; note?: string };
  spark?: readonly S[];
  sparkColor?: string;
}) {
  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(16,29,51,0.25)]">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="label-meta text-on-surface-variant">{label}</p>
          <p className="mt-1.5 font-display text-3xl font-bold tracking-tight text-on-surface">
            <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
          </p>
          {trend && (
            <div className="mt-1.5 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-semibold",
                  trend.positive ? "text-success" : "text-error",
                )}
              >
                {trend.positive ? (
                  <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
                ) : (
                  <ArrowDownRight className="size-3.5" strokeWidth={2.2} />
                )}
                {trend.value}
              </span>
              {trend.note && (
                <span className="text-xs text-on-surface-variant">{trend.note}</span>
              )}
            </div>
          )}
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
      </div>
      {spark && (
        <div className="mt-3 -mb-1">
          <MiniSparkline data={spark} dataKey={Object.keys(spark[0])[0]} color={sparkColor} />
        </div>
      )}
    </Card>
  );
}
