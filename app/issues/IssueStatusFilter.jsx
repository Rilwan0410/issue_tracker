"use client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";

export default function IssueStatusFilter() {
  const router = useRouter();
  const statuses = [
    { label: "All", value: null },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  return (
    <Select.Root
      onValueChange={(val) => {
        router.push("/issues?filterBy=" + val);
      }}
    >
      <Select.Trigger placeholder="Filter By Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {statuses.map((status, i) => (
            <Select.Item key={i} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
