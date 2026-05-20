import KPICard from "./KPICard";

export default function KPIRow({
  totalSpent,
  budgetLeft,
  savingsScore,
  subscriptions,
}) {
  return (
    <div className="kpi-row">
      <KPICard
        title="Total Spent"
        value={`₹${totalSpent.toLocaleString(
          "en-IN"
        )}`}
        subtitle="+12.4% vs Apr"
      />

      <KPICard
        title="Budget Left"
        value={`₹${budgetLeft.toLocaleString(
          "en-IN"
        )}`}
        subtitle="23% left"
      />

      <KPICard
        title="Savings Score"
        value={`${savingsScore}/100`}
        subtitle="+5 pts"
      />

      <KPICard
        title="Subscriptions"
        value={`₹${subscriptions}`}
        subtitle="2 detected"
      />
    </div>
  );
}