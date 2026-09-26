"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/** Sample canary latency series — spike past threshold triggers throttle. */
const chartData = [
  { t: "0s", latency: 28, threshold: 84 },
  { t: "2s", latency: 30, threshold: 84 },
  { t: "4s", latency: 32, threshold: 84 },
  { t: "6s", latency: 34, threshold: 84 },
  { t: "8s", latency: 36, threshold: 84 },
  { t: "10s", latency: 40, threshold: 84 },
  { t: "12s", latency: 98, threshold: 84 },
  { t: "14s", latency: 112, threshold: 84 },
  { t: "16s", latency: 52, threshold: 84 },
  { t: "18s", latency: 38, threshold: 84 },
  { t: "20s", latency: 34, threshold: 84 },
];

const chartConfig = {
  latency: {
    label: "Canary p95",
    color: "var(--foreground)",
  },
  threshold: {
    label: "+300% threshold",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig;

const THROTTLE_POINT = chartData.find((d) => d.latency > d.threshold)!;

export function CanaryLatencyChart() {
  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="aspect-[2.5/1] min-h-[160px] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="t"
            tickLine={false}
            axisLine={false}
            tickMargin={6}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={40}
            tickMargin={4}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            tickFormatter={(v) => `${v}`}
          />
          <ChartTooltip
            cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(_, payload) => {
                  const row = payload?.[0]?.payload as { t?: string } | undefined;
                  return row?.t ? `t=${row.t}` : "Canary";
                }}
                formatter={(value, name) => (
                  <div className="flex w-full justify-between gap-4">
                    <span className="text-muted-foreground">
                      {name === "latency" ? "p95" : "threshold"}
                    </span>
                    <span className="font-mono nums">{value}ms</span>
                  </div>
                )}
              />
            }
          />
          <ReferenceLine
            y={84}
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            strokeWidth={1}
            label={{
              value: "+300%",
              position: "insideTopRight",
              fill: "var(--muted-foreground)",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
            }}
          />
          <Line
            type="monotone"
            dataKey="latency"
            stroke="var(--color-latency)"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: "var(--foreground)", strokeWidth: 0 }}
          />
          <ReferenceDot
            x={THROTTLE_POINT.t}
            y={THROTTLE_POINT.latency}
            r={4}
            fill="var(--foreground)"
            stroke="var(--background)"
            strokeWidth={1}
          />
        </LineChart>
      </ChartContainer>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        Throttled +300% · 85ms backoff · marker at {THROTTLE_POINT.t}
      </p>
    </div>
  );
}
