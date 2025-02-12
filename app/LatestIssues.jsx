import React from "react";
import IssueStatusBadge from "./components/IssueStatusBadge";
import { prisma } from "../prisma/client";
import { Table, Flex, Avatar, Card, Heading } from "@radix-ui/themes";
import Link from "next/link";
import Links from "./components/Links";

export default async function LatestIssues() {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assingedToUser: true },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction="column" gap="2">
                    <Links path={`/issues/${issue.id}`}>{issue.title}</Links>
                    <div>
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar
                      src={issue.assingedToUser.image}
                      radius="full"
                      fallback={"?"}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
