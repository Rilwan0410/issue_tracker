import { NextResponse } from "next/server";
import { createIssueSchema } from "../../../validationSchema";
import { prisma } from "../../../../prisma/client";
export async function PATCH(req, { params: { id } }) {
  const body = await req.json();
  console.log(body);

  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 201 });

  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  if (!issue)
    return NextResponse.json(
      { error: "no issue with that id exists." },
      { status: 400 }
    );

  const editedIssue = await prisma.issue.update({
    where: { id: Number(id) },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(editedIssue, { status: 201 });
}
