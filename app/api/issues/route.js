import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req) {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });


  return NextResponse.json(newIssue)
}
