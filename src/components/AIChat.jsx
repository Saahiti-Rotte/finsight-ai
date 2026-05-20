import { useState } from "react";

export default function AIChat({
  transactions,
}) {
  const [messages, setMessages] =
    useState([
      {
        role: "ai",
        text: "Hello! I'm FinSight AI. Ask me about your expenses, subscriptions, budgets, or spending habits.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const generateResponse = (
    question
  ) => {
    const q =
      question.toLowerCase();

    // TOTAL SPENT
    const totalSpent =
      transactions
        .filter((t) => !t.income)
        .reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

    // FOOD
    const foodTotal =
      transactions
        .filter(
          (t) =>
            t.category?.toLowerCase() ===
            "food"
        )
        .reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

    // SUBSCRIPTIONS
    const subTotal =
      transactions
        .filter(
          (t) =>
            t.category?.toLowerCase() ===
            "subscription"
        )
        .reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

    // HIGHEST EXPENSE
    const highest =
      transactions.reduce(
        (max, t) =>
          t.amount > max.amount
            ? t
            : max,
        transactions[0]
      );

    // FOOD ANALYSIS
    if (
      q.includes("food")
    ) {
      return `You spent ₹${foodTotal.toLocaleString(
        "en-IN"
      )} on food-related expenses.`;
    }

    // SUBSCRIPTIONS
    if (
      q.includes(
        "subscription"
      )
    ) {
      return `Your active subscriptions total ₹${subTotal.toLocaleString(
        "en-IN"
      )}.`;
    }

    // SAVINGS
    if (
      q.includes("save") ||
      q.includes("saving")
    ) {
      return `You can reduce spending by limiting food delivery frequency and reviewing recurring subscriptions.`;
    }

    // HIGHEST EXPENSE
    if (
      q.includes("highest") ||
      q.includes("biggest")
    ) {
      return `Your highest transaction was ₹${highest.amount.toLocaleString(
        "en-IN"
      )} spent on ${highest.name}.`;
    }

    // TOTAL SPENDING
    if (
      q.includes("total") ||
      q.includes("spent")
    ) {
      return `Your total tracked spending is ₹${totalSpent.toLocaleString(
        "en-IN"
      )}.`;
    }

    // TRANSACTIONS
    if (
      q.includes(
        "transaction"
      )
    ) {
      return transactions
        .slice(0, 5)
        .map(
          (t) =>
            `${t.name}: ₹${t.amount}`
        )
        .join(" | ");
    }

    // DEFAULT
    return "Your finances appear stable overall. Food and subscription spending are currently your major recurring categories.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    const aiMessage = {
      role: "ai",
      text: generateResponse(
        input
      ),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      aiMessage,
    ]);

    setInput("");
  };

  return (
    <div className="ai-chat">
      <div className="ai-chat-header">
        FinSight AI Assistant
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-msg ${
              msg.role
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="ai-chat-input">
        <input
          type="text"
          placeholder="Ask about your finances..."
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}