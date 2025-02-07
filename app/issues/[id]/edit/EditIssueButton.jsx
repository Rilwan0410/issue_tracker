import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default function EditIssueButton({ text, path, icon }) {
  return (
    <Button>
      <Link href={path}>{text}</Link>
      {icon}
    </Button>
  );
}
