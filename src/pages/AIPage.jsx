import AIChat from "../components/AIChat";

export default function AIPage({
  transactions,
}) {
  return (
    <AIChat
      transactions={transactions}
    />
  );
}