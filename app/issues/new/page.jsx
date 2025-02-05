"use client";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Box, TextField, Flex, Button, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { redirect } from "next/navigation";

export default function NewIssuePage() {
  const { register, control, handleSubmit, reset } = useForm();

  return (
    <form
      action=""
      onSubmit={handleSubmit(async (data) => {
        const formSubmit = await axios.post("/api/issues", data);
        redirect("/issues");
      })}
    >
      <Box maxWidth="400px" gap="3">
        <Flex direction="column" gap="3" className="mb-4">
          <TextField.Root placeholder="Title" size="3" {...register("title")} />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
        </Flex>
        <Button>Submit new issue</Button>
      </Box>
    </form>
  );
}
