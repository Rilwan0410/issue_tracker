"use client";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

import {
  Box,
  TextField,
  Flex,
  Button,
  Spinner,
  Callout,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchema";
import ErrorMessage from "../../components/ErrorMessage";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
export default function IssueForm({ title, description, issueId }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
            setSubmitting(true);
            if (title || description)
              await axios.patch(`/api/issues/${issueId}`, data);
            else await axios.post("/api/issues", data);

            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("An Unexpected Error Has Occurred.");
          }
        })}
      >
        <Box gap="3">
          <Flex direction="column" gap="3" className="mb-4">
            <TextField.Root
              placeholder="Title"
              size="3"
              defaultValue={title}
              {...register("title")}
            />

            <ErrorMessage text={errors?.title?.message} />
            <Controller
              name="description" 
              control={control}
              defaultValue={description} 
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
            />

            <ErrorMessage
              text={errors?.description?.message}
              style={"mt-[-25px]"}
            />
          </Flex>

          {title || description ? (
            <Button>Update issue {submitting && <Spinner />}</Button>
          ) : (
            <Button>Submit new issue {submitting && <Spinner />}</Button>
          )}
        </Box>
      </form>
    </div>
  );
}
