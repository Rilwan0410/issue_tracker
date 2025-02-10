import { Select } from "@radix-ui/themes";

export default function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={1}>Rilwan Etti</Select.Item>
          <Select.Item value={2}>John Smith</Select.Item>
          <Select.Item value={3}>Jane Witherspoon</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
