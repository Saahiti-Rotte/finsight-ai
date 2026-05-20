export default function AIPanel({
  closePanel,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "380px",
        height: "100vh",
        background: "white",
        borderLeft:
          "1px solid rgba(0,0,0,0.08)",
        padding: "24px",
        zIndex: 100,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          FinSight AI
        </h2>

        <button
          onClick={closePanel}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div className="card">
          <div className="card-title">
            AI Recommendation
          </div>

          <div className="health-text">
            Your food expenses are 18%
            above monthly average.
            Reducing weekend delivery
            orders could save ~₹2,100/mo.
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            Subscription Detection
          </div>

          <div className="health-text">
            Detected unused streaming
            subscriptions worth ₹1,200/mo.
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            Budget Alert
          </div>

          <div className="health-text">
            You have used 76% of your
            monthly budget.
          </div>
        </div>
      </div>
    </div>
  );
}