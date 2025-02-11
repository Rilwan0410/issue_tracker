import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { prisma } from "../../prisma/client";
import Links from "../components/Links";
import { Table } from "@radix-ui/themes";
import IssueHeader from "./IssueHeader";
import { ArrowUpIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export default async function IssuesPage({
  searchParams: { filterBy, orderBy, page },
}) {
  const orderByObj =
    (orderBy && orderBy === "status") ||
    orderBy === "title" ||
    orderBy === "createdAt"
      ? { [orderBy]: "asc" }
      : undefined;

  const currentPage = Number(page) || 1;
  const pageSize = 10;

  const issues =
    (filterBy !== "null" && filterBy === "OPEN") ||
    filterBy === "CLOSED" ||
    filterBy === "IN_PROGRESS"
      ? await prisma.issue.findMany({
          where: { status: filterBy },
          orderBy: orderByObj,
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        })
      : await prisma.issue.findMany({
          orderBy: orderByObj,
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });

  const issueCount =
    (filterBy !== "null" && filterBy === "OPEN") ||
    filterBy === "CLOSED" ||
    filterBy === "IN_PROGRESS"
      ? await prisma.issue.count({ where: { status: filterBy } })
      : await prisma.issue.count();
  const columns = [
    { label: "Issue", value: "title", styles: "" },
    { label: "Status", value: "status", styles: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", styles: "hidden md:table-cell" },
  ];
  return (
    <div>
      <IssueHeader />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col, i) => (
              <Table.ColumnHeaderCell key={i} className={col.styles}>
                <Link
                  href={`/issues${
                    !filterBy
                      ? `?orderBy=${col.value}`
                      : `?filterBy=${filterBy}&orderBy=${col.value}`
                  }`}
                >
                  {col.label}
                  {col.value === orderBy && (
                    <ArrowUpIcon className="inline ml-1" />
                  )}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue, i) => {
            return (
              <Table.Row key={i}>
                <Table.RowHeaderCell>
                  <Links path={`/issues/${issue.id}`}>{issue.title}</Links>
                  <div className="md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={issueCount}
      />
    </div>
  );
}
