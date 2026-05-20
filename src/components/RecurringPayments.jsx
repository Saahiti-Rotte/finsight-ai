export default function RecurringPayments({
  transactions,
}) {
  // GROUP TRANSACTIONS
  const grouped = {};

  transactions.forEach((t) => {
    const name =
      t.name.toLowerCase();

    if (!grouped[name]) {
      grouped[name] = [];
    }

    grouped[name].push(t);
  });

  // DETECT RECURRING
  const recurring =
    Object.entries(grouped).filter(
      ([_, items]) =>
        items.length >= 2
    );

  // TOTAL RECURRING
  const recurringTotal =
    recurring.reduce(
      (sum, [_, items]) =>
        sum + items[0].amount,
      0
    );

  return (
    <div className="card">
      <div className="card-title">
        Recurring Payments
      </div>

      <div
        style={{
          marginBottom: "14px",
          fontSize: "13px",
          color: "#555",
        }}
      >
        Estimated recurring monthly
        expenses:
        <strong>
          {" "}
          ₹
          {recurringTotal.toLocaleString(
            "en-IN"
          )}
        </strong>
      </div>

      {recurring.length === 0 ? (
        <div className="health-text">
          No recurring payments detected.
        </div>
      ) : (
        recurring.map(
          ([name, items]) => (
            <div
              key={name}
              className="txn"
            >
              <div>
                <div className="txn-name">
                  {items[0].name}
                </div>

                <div className="txn-cat">
                  Recurring payment
                </div>
              </div>

              <div className="txn-amt">
                ₹
                {items[0].amount.toLocaleString(
                  "en-IN"
                )}
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}