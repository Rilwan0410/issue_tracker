import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { prisma } from "../prisma/client";

export default async function Home({ searchParams: { page } }) {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });

  const closedIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const propsObj = {
    open: openIssues,
    closed: closedIssues,
    inProgress: inProgressIssues,
  };
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="9" className="pt-6">
      <Flex
        direction="column"
        justify={{ md: "between" }}
        gap={{ initial: "5", md: "0" }}
      >
        <IssueSummary {...propsObj} />
        <IssueChart {...propsObj} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View summary of project issues",
};
