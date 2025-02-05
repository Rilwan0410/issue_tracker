"use client";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Box,
  TextField,
  Flex,
  Button,
  Spinner,
  Callout,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";

export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
console.log(errors)
  return (
    <div className="max-w-[400px]">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        action=""
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            redirect("/issues");
          } catch (error) {
            setError("An Unexpected Error Has Occurred.");
          }
        })}
      >
        <Box gap="3">
          <Flex direction="column" gap="3" className="mb-4">
            <TextField.Root
              placeholder="Title"
              size="3"
              {...register("title")}
            />
            {errors.title && <Text color='red'>{errors.title.message}</Text>}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
              />
              {errors.description && <Text className="mt-[-25px]" color='red'>{errors.description.message}</Text>}
          </Flex>
          <Button>Submit new issue</Button>
        </Box>
      </form>
    </div>
  );
}
