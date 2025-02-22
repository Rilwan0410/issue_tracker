import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/client";
import { authOptions } from "../../api/auth/authOptions";
import DeleteIssueButton from "../DeleteIssueButton";
import EditIssueButton from "./edit/EditIssueButton";
import IssueDetails from "./edit/IssueDetails";
import AssigneeSelect from "./AssigneeSelect";

export default async function IssueDetailsPage({ params }) {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  // console.log(users)

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "6" }} gap="5">
      <Box className="mb-4 md:mb-0 md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="col-span-2">
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect users={users} issue={issue} />
            <EditIssueButton issue={issue} />
            <DeleteIssueButton issue={issue} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
}

export async function generateMetadata({ params }) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(params.id) } });
  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}
