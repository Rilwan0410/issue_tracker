import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "../../../../prisma/client";

export default async function EditIssuePage({ params: { id } }) {
  const issue = await prisma.issue.findUnique({where:{id:Number(id)}})
  return <IssueForm title={issue.title} description={issue.description} />;
}
