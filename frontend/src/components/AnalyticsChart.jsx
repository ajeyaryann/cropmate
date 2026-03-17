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
    <div className="card">
      <h2>📊 Crop Yield Trend</h2>

      <div style={{ overflowX: "auto" }}>
        <LineChart width={400} height={250} data={data}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="yield" stroke="#00aaff" />
        </LineChart>
      </div>
    </div>
  );
}

export default AnalyticsChart;