import { Badge } from "@radix-ui/themes";

export default function IssueStatusBadge({ status }) {
  return (
    <Badge
      color={`${
        status === "OPEN"
          ? "red"
          : status === "IN_PROGRESS"
          ? "violet"
          : "green"
      }`}
    >
      {status === "OPEN"
        ? "OPEN"
        : status === "IN_PROGRESS"
        ? "IN PROGRESS"
        : status === "CLOSED"
        ? "CLOSED"
        : ""}
    </Badge>
  );
}
