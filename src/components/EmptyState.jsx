export default function EmptyState() {
  return (
    <div
      className="card"
      style={{
        padding: "40px",

        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "28px",

          fontWeight: "700",

          marginBottom: "12px",
        }}
      >
        Welcome to FinSight AI
      </div>

      <div
        style={{
          color: "#666",

          fontSize: "14px",

          marginBottom: "24px",
        }}
      >
        Start by adding your first
        transaction to unlock AI
        insights, analytics,
        forecasting, anomaly
        detection, and financial
        reports.
      </div>

      <div
        style={{
          display: "flex",

          justifyContent: "center",

          gap: "16px",

          flexWrap: "wrap",
        }}
      >
        <div className="user-pill">
          AI Insights
        </div>

        <div className="user-pill">
          Forecasting
        </div>

        <div className="user-pill">
          Cloud Sync
        </div>

        <div className="user-pill">
          PDF Reports
        </div>
      </div>
    </div>
  );
}