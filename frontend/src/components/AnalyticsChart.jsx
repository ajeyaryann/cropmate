import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ prediction }) {

  // Create dynamic chart data from predictions
  const data =
    prediction && prediction.length > 0
      ? prediction.slice(0, 3).map((crop, index) => ({
          name: crop,
          score: 100 - index * 25, // visual ranking strength
        }))
      : [
          {
            name: "No Data",
            score: 0,
          },
        ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          
          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Bar
            dataKey="score"
            fill="#38bdf8"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;