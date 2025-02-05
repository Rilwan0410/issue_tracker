import { Text } from "@radix-ui/themes";

function ErrorMessage({ text, style }) {
  if (!text) return null;
  return (
    <Text className={`${style}`} color="red">
      {text}
    </Text>
  );
}

export default ErrorMessage;
