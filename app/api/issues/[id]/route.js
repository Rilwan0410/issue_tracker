import { NextResponse } from "next/server";
import { createIssueSchema, patchIssueSchema } from "../../../validationSchema";
import { prisma } from "../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  console.log(body);

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 201 });

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user)
      return NextResponse({ error: "User does not exist" }, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({ where: { id: Number(params.id) } });

  if (!issue)
    return NextResponse.json(
      { error: "no issue with that id exists." },
      { status: 400 }
    );

  const editedIssue = await prisma.issue.update({
    where: { id: Number(params.id) },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(editedIssue, { status: 201 });
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({ where: { id: Number(params.id) } });
  if (!issue)
    return NextResponse.json(
      { error: "issue with that Id doesn't exist" },
      { status: 400 }
    );
  const issueToDelete = await prisma.issue.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(issueToDelete, { status: 200 });
}
