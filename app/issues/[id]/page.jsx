import { Box, Card, Grid, Heading, Text, Button } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { prisma } from "../../../prisma/client";
import Link from "next/link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import { Pencil2Icon } from "@radix-ui/react-icons";
export default async function IssueDetailsPage({ params: { id } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box className="mb-4 md:mb-0">
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
      </Box>
      <Box>
        <Button>
          <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
          <Pencil2Icon />
        </Button>
      </Box>
    </Grid>
  );
}
