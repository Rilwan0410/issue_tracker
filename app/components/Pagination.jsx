import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

export default function Pagination({ itemCount, pageSize, currentPage }) {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <div className="flex  gap-3 item-center">
      <span className="flex items-center text-sm">page {currentPage} of {pageCount}</span>
      <Button disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>

      <Button disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>

      <Button disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>

      <Button disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
}
