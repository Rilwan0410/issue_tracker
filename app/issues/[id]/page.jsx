import React from "react";
import { prisma } from "../../../prisma/client";
import { notFound } from "next/navigation";
import { Heading, Badge } from "@radix-ui/themes";
import { Text, Card, Theme } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

import IssueStatusBadge from "../../components/IssueStatusBadge";
export default async function IssueDetailsPage({ params: { id } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <div className="flex gap-3 items-center my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>

      <Card mt="4">
        <ReactMarkdown className="prose text-gray-200 prose-strong:text-gray-200 prose-headings:text-gray-200">
          {issue.description}
        </ReactMarkdown>
      </Card>
    </div>
  );
}
