"use client";

import { useStore } from "@/store";
import { ProgressChartProps } from "@/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function ProgressChart({ progress, className }: ProgressChartProps) {
  const { user } = useStore();

  const data = [
    {
      name: "Progress",
      value: progress,
    },
  ];

  return (
    <ResponsiveContainer className={className}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}