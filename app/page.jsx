import { Flex } from "@radix-ui/themes";
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
  return (
    <Flex direction={"column"} gap="5">
      <IssueSummary
        open={openIssues}
        closed={closedIssues}
        inProgress={inProgressIssues}
      />
      <LatestIssues />
      <IssueChart
        open={openIssues}
        closed={closedIssues}
        inProgress={inProgressIssues}
      />
    </Flex>
  );
}
