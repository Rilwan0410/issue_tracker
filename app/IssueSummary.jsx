import Link from "next/link";
import { Card, Flex, Text } from "@radix-ui/themes";

export default function IssueSummary({ open, inProgress, closed }) {
  const statuses = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "in-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="5">
      {statuses.map((status, i) => (
        <Card key={i}>
          <Flex direction="column">
            <Link className='text-sm font-medium cursor-pointer' href={`/issues?filterBy=${status.status}`}>
              {status.label}
            </Link>
            <Text size='5' className="font-bold">{status.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
