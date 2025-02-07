import React from "react";
import ReactMarkdown from "react-markdown";
import IssueStatusBadge from "../../../components/IssueStatusBadge";
import { Heading, Text, Card } from "@radix-ui/themes";
export default function IssueDetails({ issue }) {
  return (
    <>
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
    </>
  );
}
