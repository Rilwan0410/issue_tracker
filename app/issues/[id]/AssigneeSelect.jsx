"use client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AssigneeSelect({ users, issue }) {
  const router = useRouter();
  async function updateUser(userId) {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId,
      });
      // router.push("/issues");
      if (userId !== null) toast("Succesfully assigned issue");
      else toast("Succesfully unassigned issue");
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => updateUser(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={null}>Unassign</Select.Item>
            {users.map((user, i) => {
              return (
                <Select.Item key={i} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}
