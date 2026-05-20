export default function SmartInsights({
  transactions,
  monthlyIncome,
  totalSpent,
}) {
  // EXPENSES ONLY
  const expenses =
    transactions.filter(
      (t) => !t.income
    );

  // CATEGORY TOTALS
  const categoryTotals = {};

  expenses.forEach((t) => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }

    categoryTotals[t.category] +=
      t.amount;
  });

  // TOP CATEGORY
  let highestCategory =
    "None";

  let highestAmount = 0;

  Object.entries(categoryTotals).forEach(
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

  // SAVINGS RATE
  const savingsRate =
    monthlyIncome > 0
      ? Math.floor(
          ((monthlyIncome -
            totalSpent) /
            monthlyIncome) *
            100
        )
      : 0;

  // SUBSCRIPTIONS
  const subscriptions =
    categoryTotals[
      "Subscription"
    ] || 0;

  // INSIGHTS
  const insights = [];

  // TOP CATEGORY
  if (highestAmount > 0) {
    insights.push(
      `${highestCategory} is your largest spending category at ₹${highestAmount.toLocaleString(
        "en-IN"
      )}.`
    );
  }

  // SAVINGS HEALTH
  if (savingsRate >= 40) {
    insights.push(
      `Your savings rate is excellent at ${savingsRate}%.`
    );
  } else if (
    savingsRate >= 20
  ) {
    insights.push(
      `Your savings rate is moderate at ${savingsRate}%.`
    );
  } else {
    insights.push(
      `Your savings rate is low at ${savingsRate}%. Consider reducing discretionary spending.`
    );
  }

  // SUBSCRIPTIONS
  if (
    subscriptions >
    monthlyIncome * 0.1
  ) {
    insights.push(
      `Subscription spending appears unusually high this month.`
    );
  }

  // OVERSPENDING
  if (
    totalSpent >
    monthlyIncome
  ) {
    insights.push(
      `Warning: Your expenses currently exceed your monthly income.`
    );
  }

  return (
    <div className="card">
      <div className="card-title">
        Smart Financial Insights
      </div>

      <div
        style={{
          display: "flex",

          flexDirection:
            "column",

          gap: "14px",
        }}
      >
        {insights.map(
          (
            insight,
            index
          ) => (
            <div
              key={index}
              style={{
                padding:
                  "14px 16px",

                borderRadius:
                  "16px",

                background:
                  "#f8fafc",

                border:
                  "1px solid #e2e8f0",

                lineHeight:
                  "1.6",

                fontSize:
                  "14px",

                fontWeight:
                  "500",
              }}
            >
              {insight}
            </div>
          )
        )}
      </div>
    </div>
  );
}