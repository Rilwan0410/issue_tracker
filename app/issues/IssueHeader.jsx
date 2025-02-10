import React from "react";
import { Button } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";
import Link from "next/link";

export default function IssueHeader() {
  return (
    <div className="mb-5 flex justify-between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
