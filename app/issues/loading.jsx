import React from "react";
import { Skeleton } from "@radix-ui/themes";
import IssueHeader from './IssueHeader'
import { Table } from "@radix-ui/themes";

export default function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5];
  return (
    <>
    <IssueHeader/>
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue, i) => {
          return (
            <Table.Row key={i}>
              <Table.RowHeaderCell>
                <Skeleton className='bg-gray-500' />
                <div className="md:hidden">
                  <Skeleton />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
    </>
  );
}
