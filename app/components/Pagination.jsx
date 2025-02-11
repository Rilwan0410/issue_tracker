"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({ itemCount, pageSize, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  function changePage(page) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  }
  return (
    <div className="flex py-5 gap-3 item-center">
      <span className="flex items-center text-sm">
        page {currentPage} of {pageCount}
      </span>
      <Button disabled={Number(currentPage) === 1} onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        disabled={Number(currentPage) === 1}
        onClick={() => changePage(Number(currentPage) - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        disabled={Number(currentPage) === pageCount}
        onClick={() => changePage((Number(currentPage) + 1))}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        disabled={Number(currentPage) === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
}
