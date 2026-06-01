"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartPalette } from "@/lib/design-tokens";

const axisStyle = { fontSize: 11, fill: "var(--on-surface-variant)" } as const;

function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
  formatter?: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-xs shadow-lg">
      {label && <p className="mb-1 font-semibold text-on-surface">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-on-surface-variant">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-semibold text-on-surface">
            {formatter ? formatter(p.value) : p.value}
          </span>
        </p>
      ))}
    </div>
  );
}

export function AreaTrend<T extends object>({
  data,
  dataKey,
  xKey = "mes",
  formatter,
  color = chartPalette[0],
  height = 260,
}: {
  data: readonly T[];
  dataKey: string;
  xKey?: string;
  formatter?: (v: number) => string;
  color?: string;
  height?: number;
}) {
  const id = React.useId().replace(/:/g, "");
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data as T[]} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
        <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip content={<ChartTooltip formatter={formatter} />} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#area-${id})`}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarsChart<T extends object>({
  data,
  dataKey,
  xKey = "mes",
  formatter,
  color = chartPalette[0],
  height = 260,
}: {
  data: readonly T[];
  dataKey: string;
  xKey?: string;
  formatter?: (v: number) => string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data as T[]} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
        <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={44} />
        <Tooltip cursor={{ fill: "var(--surface-low)" }} content={<ChartTooltip formatter={formatter} />} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={42} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  formatter,
  height = 260,
}: {
  data: { name: string; value: number }[];
  formatter?: (v: number) => string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="58%"
          outerRadius="86%"
          paddingAngle={2}
          stroke="var(--surface)"
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip formatter={formatter} />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MiniSparkline<T extends object>({
  data,
  dataKey,
  color = chartPalette[0],
}: {
  data: readonly T[];
  dataKey: string;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data as T[]} margin={{ top: 4, right: 0, left: 0, bottom: 4 }}>
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export const palette = chartPalette;
