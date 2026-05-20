export default function AnomalyCard({
  transactions,
}) {
  const expenses = transactions.filter(
    (t) => !t.income
  );

  // AVERAGE SPENDING
  const avg =
    expenses.reduce(
      (sum, t) => sum + t.amount,
      0
    ) / expenses.length;

  // DETECT ANOMALIES
  const anomalies = expenses.filter(
    (t) => t.amount > avg * 2
  );

  return (
    <div className="card">
      <div className="card-title">
        Spending Anomalies
      </div>

      {anomalies.length === 0 ? (
        <div className="health-text">
          No unusual spending detected.
        </div>
      ) : (
        anomalies.map((a) => (
          <div
            key={a.id}
            className="txn"
          >
            <div>
              <div className="txn-name">
                {a.name}
              </div>

              <div className="txn-cat">
                Unusually high expense
              </div>
            </div>

            <div className="txn-amt">
              ₹
              {a.amount.toLocaleString(
                "en-IN"
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}