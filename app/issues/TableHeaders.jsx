'use client'
import React from "react";
import { Table } from "@radix-ui/themes";

export default function TableHeaders({ columns }) {
  return (
    <>
      {columns.map((col, i) => (
        <Table.ColumnHeaderCell
          key={i}
          className={col.styles}
          onClick={() => console.log(col.value)}
        >
          {col.label}
        </Table.ColumnHeaderCell>
      ))}
    </>
  );
}
