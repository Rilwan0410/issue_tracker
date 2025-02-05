"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Box,
  TextField,
  TextArea,
  Flex,
  Button,
  Spinner,
} from "@radix-ui/themes";

export default function NewIssuePage() {
  return (
    <Box maxWidth="400px" gap="3">
      <Flex direction="column" gap="3" className="mb-4">
        <TextField.Root placeholder="Title" size="3" />
        <SimpleMDE placeholder='Description' />
      </Flex>
      <Button>Submit new issue</Button>
    </Box>
  );
}
