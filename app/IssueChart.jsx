"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, YAxis, XAxis, Bar, BarChart } from "recharts";
import React from "react";

export default function IssueChart({ open, closed, inProgress }) {
  const data = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "In Progress", value: inProgress },
  ];
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{
              fill: "var(--mint-11)",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
