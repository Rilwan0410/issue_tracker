import React from "react";
import { prisma } from "../../../prisma/client";
import { notFound } from "next/navigation";
import { Heading, Badge } from "@radix-ui/themes";
import { Text, Card } from "@radix-ui/themes";

export default async function IssueDetailsPage({ params: { id } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <div className="flex gap-3 items-center my-2">
        <Badge>{issue.status}</Badge>
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>

      <Card>{issue.description}</Card>
    </div>
  );
}
