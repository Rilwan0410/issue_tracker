import React from "react";
import Link from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

export default function Links({ children, path }) {
  return (
    <Link href={path} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </Link>
  );
}
