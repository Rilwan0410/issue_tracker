import { NextResponse } from "next/server";
import { createIssueSchema } from "../../../validationSchema";
import { prisma } from "../../../../prisma/client";
import { getServerSession } from "next-auth";

export async function PATCH(req, { params: { id } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
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

export async function DELETE(req, { params: { id } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  if (!issue)
    return NextResponse.json(
      { error: "issue with that Id doesn't exist" },
      { status: 400 }
    );
  const issueToDelete = await prisma.issue.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json(issueToDelete, { status: 200 });
}
