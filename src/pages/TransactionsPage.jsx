export default function TransactionsPage({
  transactions,
}) {
  return (
    <div className="card">
      <div className="card-title">
        All Transactions
      </div>

      {transactions.map((t) => (
        <div
          className="txn"
          key={t.id}
        >
          <div>
            <div className="txn-name">
              {t.name}
            </div>

            <div className="txn-cat">
              {t.category} • {t.date}
            </div>
          </div>

          <div className="txn-amt">
            {t.income ? "+" : "-"}₹
            {t.amount.toLocaleString(
              "en-IN"
            )}
          </div>
        </div>
      ))}
    </div>
  );
}