import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../prisma/client";
import ActionButton from "./edit/actionButton";
import IssueDetails from "./edit/IssueDetails";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
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
          <ActionButton
            path={`/issues/${id}/edit`}
            text="Edit Issue"
            icon={<Pencil2Icon />}
          />
          <ActionButton
            action={async () => {
              "use server";
              await axios.delete(`/api/issues/${id}`);
              redirect("/issues");
            }}
            path={""}
            text="Delete Issue"
            icon={<TrashIcon />}
            color="red"
          />
        </Flex>
      </Box>
    </Grid>
  );
}
