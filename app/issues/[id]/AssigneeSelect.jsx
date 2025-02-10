"use client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AssigneeSelect({ users, issue }) {
  const router = useRouter();
  async function updateUser(userId) {
    await axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId });
    router.push("/issues");
  }

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ''}
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
  );
}
