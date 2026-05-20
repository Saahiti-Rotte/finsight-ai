export default function HealthScore({
  savingsScore,
}) {
  return (
    <div className="card">
      <div className="card-title">
        Financial Health
      </div>

      <div className="health-score">
        {savingsScore}
      </div>

      <div className="health-text">
        Your spending habits are aligned
        with your current budget goals.
      </div>
    </div>
  );
}