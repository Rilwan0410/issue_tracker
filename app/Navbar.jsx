"use client";
import { Avatar } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { Box, DropdownMenu, Flex, Spinner, Skeleton } from "@radix-ui/themes";

export default function Navbar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  // console.log(session)

  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Issues", path: "/issues" },
  ];
  return (
    <nav
      className={`flex justify-between pl-3  pr-10 ${
        status === "authenticated" ? "py-[0.7rem]" : "py-4"
      } items-center bg-white text-black border-b`}
    >
      <Flex align="center" gap="6">
        <Link href="/">
          <AiFillBug size={30} className="inline" />
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
      </Flex>
      <Box>
        {status === "loading" && <Spinner />}
        {status === "authenticated" && (
          <>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session?.user.image}
                  fallback="?"
                  className="cursor-pointer "
                  radius="full"
                  alt="User Icon"
                  variant="solid"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="p-2">
                <span>{session?.user.email}</span>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href="/api/auth/signin">Login</Link>
          </>
        )}
      </Box>
    </nav>
  );
}
