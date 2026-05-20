import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#1a1a2e",
  "#1a7a4a",
  "#1d4ed8",
  "#b45309",
  "#c0392b",
];

export default function CategoryChart({
  data,
}) {
  return (
    <div className="card">
      <div className="card-title">
        Spending Categories
      </div>

      <div
        style={{
          width: "100%",
          height: "250px",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
              label
            >
              {data.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}