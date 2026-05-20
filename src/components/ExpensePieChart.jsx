import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 13680 },
  { name: "Shopping", value: 9120 },
  { name: "Transport", value: 5240 },
  { name: "Subscriptions", value: 3940 },
];

const COLORS = [
  "#12122b",
  "#4ade80",
  "#60a5fa",
  "#f59e0b",
];

export default function ExpensePieChart() {
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
        Expense Distribution
      </h2>

      <div
        style={{
          width: "100%",
          height: "300px",
          marginTop: "10px",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}