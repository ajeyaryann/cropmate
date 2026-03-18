import { useState } from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import "./../index.css";

function MainDashboard() {
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPrediction = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
        }),
      });

      const data = await res.json();

      const crops =
        typeof data.prediction === "string"
          ? data.prediction.split(",")
          : [];

      setPrediction(crops);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>🌱 CropMate AI Dashboard</h1>

        {/* City */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button>Fetch Weather</button>
        </div>

        {/* Inputs */}
        <div className="grid">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label>{key.toUpperCase()}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <button style={{ marginTop: "20px" }} onClick={getPrediction}>
          {loading ? "Predicting..." : "Get Prediction"}
        </button>

        {/* Cards */}
        <div className="grid">
          <Card title="🌾 Top Crop Predictions">
            {prediction.length > 0 ? (
              prediction.map((crop, i) => (
                <p key={i}>{i + 1}. {crop}</p>
              ))
            ) : (
              <p>No prediction yet</p>
            )}
          </Card>

          <Card title="🌤 Weather Insights">
            <p>Temp: {formData.temperature || "--"}°C</p>
            <p>Humidity: {formData.humidity || "--"}%</p>
            <p>Rainfall: {formData.rainfall || "--"} mm</p>
          </Card>

          <Card title="🌱 Soil Health">
            <p>N: {formData.N || "--"}</p>
            <p>P: {formData.P || "--"}</p>
            <p>K: {formData.K || "--"}</p>
          </Card>

          <Card title="📊 AI Insights">
            <p>Best Crop: {prediction[0] || "--"}</p>
            <p>Confidence: High</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;