import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../prisma/client";
import EditIssueButton from "./edit/EditIssueButton";
import IssueDetails from "./edit/IssueDetails";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import DeleteIssueButton from "../DeleteIssueButton";
import axios from "axios";

export default async function IssueDetailsPage({ params: { id } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "6" }} gap="5">
      <Box className="mb-4 md:mb-0 md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="col-span-2">
        <Flex direction="column" gap="4">
          <EditIssueButton issue={issue} />
          <DeleteIssueButton issue={issue} />
        </Flex>
      </Box>
    </Grid>
  );
}
