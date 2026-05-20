import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SpendTrend({
  data,
}) {
  return (
    <div className="card">
      <div className="card-title">
        Monthly Spend Trend
      </div>

      <div
        style={{
          width: "100%",
          height: "250px",
        }}
      >
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="spending"
              stroke="#1a1a2e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}