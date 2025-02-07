import React from "react";
import { Skeleton, Card, Box, Flex } from "@radix-ui/themes";

export default function LoadingIssueDetailPage() {
  return (
    <Box className="max-w-xl">
      <Skeleton height="1rem" />

      <Flex className="flex gap-3 items-center my-2">
        <Skeleton width={"2rem"} height="1rem" />
        <Skeleton width={"8rem"} height="1rem" />
      </Flex>

      <Card mt="4">
        <Flex gap="3" direction={"column"}>
          <Skeleton height='1rem'/>
          <Skeleton height='1rem'/>
          <Skeleton height='1rem'/>
        </Flex>
      </Card>
    </Box>
  );
}
