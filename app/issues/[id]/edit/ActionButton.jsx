"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default function ActionButton({ text, path, icon, color, action }) {
  return (
    <Button color={color} onClick={() => action}>
      <Link href={path}>{text}</Link>
      {icon}
    </Button>
  );
}
