"use client";

import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Issues", path: "/issues" },
  ];
  return (
    <nav className="flex justify-between pl-3  pr-10 py-4 items-center bg-white text-black border-b">
      <Link href="/">
        <AiFillBug size={30} />
      </Link>
      <ul className="flex gap-3">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.path}
            className={`text-zinc-500 ${
              link.path === currentPath ? "text-zinc-900 font-semibold" : ""
            } hover:text-zinc-900  transition ease-in-out text-lg duration-300`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
