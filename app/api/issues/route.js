import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";


export async function POST(req) {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue);
}
