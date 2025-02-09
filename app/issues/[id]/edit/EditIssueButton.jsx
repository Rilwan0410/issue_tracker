import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";

export default function EditIssueButton({ issue }) {
  return (
    <Button>
      <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
      <Pencil2Icon />
    </Button>
  );
}
