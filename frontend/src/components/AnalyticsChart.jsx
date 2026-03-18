import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AnalyticsChart() {
  const data = [
    { name: "Jan", yield: 30 },
    { name: "Feb", yield: 45 },
    { name: "Mar", yield: 60 },
    { name: "Apr", yield: 50 },
    { name: "May", yield: 70 },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <LineChart width={500} height={280} data={data}>
        <CartesianGrid stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="yield"
          stroke="#38bdf8"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </div>
  );
}

export default AnalyticsChart;