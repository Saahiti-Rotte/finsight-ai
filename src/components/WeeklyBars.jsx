import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "W1", spending: 6200 },
  { week: "W2", spending: 8400 },
  { week: "W3", spending: 9100 },
  { week: "W4", spending: 12400 },
];

export default function WeeklyBars() {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "28px",
        marginTop: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "700",
        }}
      >
        Weekly Spending
      </h2>

      <div
        style={{
          width: "100%",
          height: "280px",
          marginTop: "20px",
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="week" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="spending"
              fill="#12122b"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}