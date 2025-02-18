import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "../../../../prisma/client";

export default async function EditIssuePage({ params }) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(params.id) } });
  return (
    <IssueForm
      title={issue.title}
      issueId={id}
      description={issue.description}
    />
  );
}
