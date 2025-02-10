import { Select } from "@radix-ui/themes";

export default function AssigneeSelect({ users }) {
  // console.log(users);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {/* <Select.Item value={1}>Rilwan Etti</Select.Item> */}
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
