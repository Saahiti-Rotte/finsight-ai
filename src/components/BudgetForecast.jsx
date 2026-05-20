export default function BudgetForecast({
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

  // ASSUME CURRENT DAY = 20
  const currentDay = 20;

  // DAYS IN MONTH
  const totalDays = 30;

  // DAILY AVG
  const dailyAverage =
    totalSpent / currentDay;

  // PROJECTED SPEND
  const projectedSpend =
    Math.round(
      dailyAverage * totalDays
    );

  // BUDGET
  const budget = 50000;

  // STATUS
  const overBudget =
    projectedSpend > budget;

  // SAVINGS
  const projectedSavings =
    budget - projectedSpend;

  return (
    <div className="card">
      <div className="card-title">
        Budget Forecast
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div>
          <div className="txn-cat">
            Projected Month-End Spend
          </div>

          <div className="health-score">
            ₹
            {projectedSpend.toLocaleString(
              "en-IN"
            )}
          </div>
        </div>

        <div>
          <div className="txn-cat">
            Forecast Status
          </div>

          <div
            style={{
              marginTop: "6px",
              fontWeight: "700",
              color: overBudget
                ? "#c0392b"
                : "#1a7a4a",
            }}
          >
            {overBudget
              ? "Over Budget Risk"
              : "Budget Stable"}
          </div>
        </div>

        <div>
          <div className="txn-cat">
            Projected Savings
          </div>

          <div
            style={{
              marginTop: "6px",
              fontWeight: "700",
            }}
          >
            ₹
            {projectedSavings.toLocaleString(
              "en-IN"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}