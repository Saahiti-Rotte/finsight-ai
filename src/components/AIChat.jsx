import { useState } from "react";

export default function AIChat({
  transactions,
}) {
  const [messages, setMessages] =
    useState([
      {
        role: "ai",
        text: "Hello! I'm FinSight AI. I can analyze your spending habits, savings trends, subscriptions, and financial behavior.",
      },
    ]);

  const [input, setInput] =
    useState("");

  // AI ENGINE
  const generateResponse = (
    question
  ) => {
    const q =
      question.toLowerCase();

    // EXPENSES ONLY
    const expenses =
      transactions.filter(
        (t) => !t.income
      );

    // TOTAL SPENT
    const totalSpent =
      expenses.reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

    // CATEGORY TOTALS
    const categoryTotals = {};

    expenses.forEach((t) => {
      if (
        !categoryTotals[
          t.category
        ]
      ) {
        categoryTotals[
          t.category
        ] = 0;
      }

      categoryTotals[
        t.category
      ] += t.amount;
    });

    // TOP CATEGORY
    let highestCategory =
      "";

    let highestAmount = 0;

    Object.entries(
      categoryTotals
    ).forEach(
      ([category, amount]) => {
        if (
          amount >
          highestAmount
        ) {
          highestAmount =
            amount;

          highestCategory =
            category;
        }
      }
    );

    // BIGGEST TRANSACTION
    const biggest =
      expenses.reduce(
        (max, t) =>
          t.amount >
          max.amount
            ? t
            : max,
        expenses[0] || {
          amount: 0,
        }
      );

    // SUBSCRIPTIONS
    const subscriptions =
      categoryTotals[
        "Subscription"
      ] || 0;

    // FOOD
    const food =
      categoryTotals["Food"] ||
      0;

    // SHOPPING
    const shopping =
      categoryTotals[
        "Shopping"
      ] || 0;

    /* ---------------- */
    /* RESPONSES */
    /* ---------------- */

    // TOTAL SPENDING
    if (
      q.includes("total") ||
      q.includes("spent")
    ) {
      return `Your total tracked expenses are ₹${totalSpent.toLocaleString(
        "en-IN"
      )}.`;
    }

    // BIGGEST CATEGORY
    if (
      q.includes(
        "category"
      ) ||
      q.includes("most")
    ) {
      return `${highestCategory} is currently your highest spending category at ₹${highestAmount.toLocaleString(
        "en-IN"
      )}.`;
    }

    // BIGGEST EXPENSE
    if (
      q.includes("highest") ||
      q.includes("biggest")
    ) {
      return `Your biggest expense was ₹${biggest.amount.toLocaleString(
        "en-IN"
      )} spent on ${biggest.name}.`;
    }

    // FOOD
    if (
      q.includes("food")
    ) {
      return `You spent ₹${food.toLocaleString(
        "en-IN"
      )} on food expenses. Consider reducing delivery frequency if you want to improve savings.`;
    }

    // SHOPPING
    if (
      q.includes(
        "shopping"
      )
    ) {
      return `Your shopping expenses total ₹${shopping.toLocaleString(
        "en-IN"
      )}.`;
    }

    // SUBSCRIPTIONS
    if (
      q.includes(
        "subscription"
      )
    ) {
      return `Your subscription expenses currently total ₹${subscriptions.toLocaleString(
        "en-IN"
      )}.`;
    }

    // SAVINGS
    if (
      q.includes("save") ||
      q.includes("saving")
    ) {
      return `Your strongest savings opportunities appear in discretionary categories like food delivery, shopping, and recurring subscriptions.`;
    }

    // TRANSACTIONS
    if (
      q.includes(
        "transaction"
      )
    ) {
      return expenses
        .slice(0, 5)
        .map(
          (t) =>
            `${t.name}: ₹${t.amount}`
        )
        .join(" | ");
    }

    // ADVICE
    if (
      q.includes("advice") ||
      q.includes("improve")
    ) {
      return `Your spending appears concentrated in ${highestCategory}. Reducing that category by even 15-20% could significantly improve monthly savings.`;
    }

    // DEFAULT
    return `Your financial profile suggests that ${highestCategory} is your dominant expense category. Maintaining controlled discretionary spending and monitoring subscriptions would improve long-term savings stability.`;
  };

  // SEND MESSAGE
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
      {/* HEADER */}
      <div className="ai-chat-header">
        FinSight AI Assistant
      </div>

      {/* MESSAGES */}
      <div className="ai-chat-messages">
        {messages.map(
          (msg, index) => (
            <div
              key={index}
              className={`chat-msg ${msg.role}`}
            >
              {msg.text}
            </div>
          )
        )}
      </div>

      {/* INPUT */}
      <div className="ai-chat-input">
        <input
          type="text"
          placeholder="Ask about your finances..."
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              sendMessage();
            }
          }}
        />

        <button
          className="txn-btn"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}