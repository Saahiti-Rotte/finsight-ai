import SpendTrend from "../components/SpendTrend";
import CategoryChart from "../components/CategoryChart";

export default function AnalyticsPage({
  spendTrendData,
  categoryData,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <SpendTrend
        data={spendTrendData}
      />

      <CategoryChart
        data={categoryData}
      />
    </div>
  );
}