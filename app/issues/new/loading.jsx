import React from "react";
import { Skeleton, Box, Flex } from "@radix-ui/themes";

export default function LoadingNewIssuePage() {
  return (
    <Box className="max-w-sm">
      <Flex direction={"column"} gap="4">
        <Skeleton height="2rem" />
        <Skeleton height="23rem" />
        <Skeleton height="2rem" mt="4" width="9rem" />
      </Flex>
    </Box>
  );
}
