import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/client";
import EditIssueButton from "./edit/EditIssueButton";
import IssueDetails from "./edit/IssueDetails";
import { Pencil2Icon } from "@radix-ui/react-icons";

export default async function IssueDetailsPage({ params: { id } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box className="mb-4 md:mb-0">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton
          path={`/issues/${id}/edit`}
          text="Edit Issue"
          icon={<Pencil2Icon />}
        />
      </Box>
    </Grid>
  );
}
