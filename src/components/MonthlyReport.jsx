export default function MonthlyReport({
  transactions,
}) {
  // EXPENSES ONLY
  const expenses = transactions.filter(
    (t) => !t.income
  );

  // TOTAL SPENT
  const totalSpent = expenses.reduce(
    (sum, t) => sum + t.amount,
    0
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
  const topCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

  // HIGHEST TRANSACTION
  const highest =
    expenses.reduce(
      (max, t) =>
        t.amount > max.amount
          ? t
          : max,
      expenses[0]
    );

  // SUBSCRIPTIONS
  const subscriptions = expenses
    .filter(
      (t) =>
        t.category ===
        "Subscription"
    )
    .reduce((sum, t) => sum + t.amount, 0);

  // AI RECOMMENDATION
  let recommendation =
    "Your spending habits appear balanced.";

  if (
    topCategory &&
    topCategory[0] === "Food"
  ) {
    recommendation =
      "Food delivery spending is significantly high. Reducing online ordering frequency may improve savings.";
  }

  if (subscriptions > 2000) {
    recommendation =
      "Your subscription burden is high. Review recurring services for optimization.";
  }

  return (
    <div className="card">
      <div className="card-title">
        Monthly Financial Report
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* TOTAL */}
        <div>
          <div className="txn-cat">
            Total Spending
          </div>

          <div
            style={{
              marginTop: "4px",
              fontWeight: "700",
            }}
          >
            ₹
            {totalSpent.toLocaleString(
              "en-IN"
            )}
          </div>
        </div>

        {/* TOP CATEGORY */}
        <div>
          <div className="txn-cat">
            Top Category
          </div>

          <div
            style={{
              marginTop: "4px",
              fontWeight: "700",
            }}
          >
            {topCategory?.[0] || "N/A"}
          </div>
        </div>

        {/* LARGEST EXPENSE */}
        <div>
          <div className="txn-cat">
            Largest Expense
          </div>

          <div
            style={{
              marginTop: "4px",
              fontWeight: "700",
            }}
          >
            {highest?.name} — ₹
            {highest?.amount?.toLocaleString(
              "en-IN"
            )}
          </div>
        </div>

        {/* SUBSCRIPTIONS */}
        <div>
          <div className="txn-cat">
            Subscription Burden
          </div>

          <div
            style={{
              marginTop: "4px",
              fontWeight: "700",
            }}
          >
            ₹
            {subscriptions.toLocaleString(
              "en-IN"
            )}
          </div>
        </div>

        {/* AI INSIGHT */}
        <div>
          <div className="txn-cat">
            AI Recommendation
          </div>

          <div
            className="health-text"
            style={{
              marginTop: "6px",
            }}
          >
            {recommendation}
          </div>
        </div>
      </div>
    </div>
  );
}