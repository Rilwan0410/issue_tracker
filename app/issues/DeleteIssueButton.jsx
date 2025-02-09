"use client";
import React from "react";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
export default function DeleteIssueButton({ issue }) {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            Delete Issue <TrashIcon />
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>{issue.title}</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  try {
                    await axios.delete(`/api/jissues/${issue.id}`);
                    router.push("/issues");
                  } catch (error) {
                    setError("This issue could not be deleted.");
                  }
                }}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {error && (
        <AlertDialog.Root open={error}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description size="2">{error}</AlertDialog.Description>
            <Flex mt="4">
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  // color="red"
                  onClick={async () => {
                    setError("");
                  }}
                >
                  OK
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
}
