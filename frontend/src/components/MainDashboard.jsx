import { useState } from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import SoilHealthCard from "./SoilHealthCard";
import AnalyticsChart from "./AnalyticsChart";
import "../styles/Dashboard.css";

function MainDashboard() {
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  // 🌾 Fertilizer State
  const [fertilizerData, setFertilizerData] = useState(null);

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

  // 🌤 WEATHER FUNCTION
  const fetchWeather = async () => {
    try {
      if (!city) {
        alert("Enter city first");
        return;
      }

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91e4a870583e96a4acac8021894d9ae7&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        alert("City not found");
        return;
      }

      // Auto-fill weather
      setFormData((prev) => ({
        ...prev,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        rainfall: data.rain ? data.rain["1h"] || 0 : 0,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 🌾 Fertilizer API Function
  const getFertilizerRecommendation = async () => {
    try {
      const res = await fetch("http://localhost:5000/fertilizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nitrogen: Number(formData.N),
          phosphorus: Number(formData.P),
          potassium: Number(formData.K),
        }),
      });

      const data = await res.json();

      setFertilizerData(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🌱 Crop Prediction Function
  const getPrediction = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      // 🌾 Call Fertilizer API after prediction
      await getFertilizerRecommendation();

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
        <h1 style={{ marginBottom: "10px" }}>
          🌱 CropMate AI Dashboard
        </h1>

        {/* 🌍 CITY SECTION */}
        <div className="card" style={{ marginTop: "10px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Enter City (e.g. Lucknow)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button
              onClick={fetchWeather}
              style={{ minWidth: "150px" }}
            >
              🌤 Fetch Weather
            </button>
          </div>
        </div>

        {/* 🔥 INPUT PANEL */}
        <div className="card" style={{ marginTop: "20px" }}>
          <div className="grid">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key.toUpperCase()}
              />
            ))}
          </div>

          <button
            style={{
              marginTop: "20px",
              width: "100%",
              fontSize: "16px",
              padding: "14px",
            }}
            onClick={getPrediction}
          >
            {loading
              ? "⏳ Predicting..."
              : "🚀 Get AI Crop Prediction"}
          </button>
        </div>

        {/* 📊 DASHBOARD CARDS */}
        <div className="grid" style={{ marginTop: "30px" }}>
          
          {/* 🌾 Crop Predictions */}
          <Card title="🌾 Top Crop Predictions">
            {prediction.length > 0 ? (
              prediction.map((crop, i) => (
                <p key={i}>
                  <span
                    style={{
                      color: "#38bdf8",
                      fontWeight: "bold",
                    }}
                  >
                    {i + 1}.
                  </span>{" "}
                  {crop}
                </p>
              ))
            ) : (
              <p>No prediction yet</p>
            )}
          </Card>

          {/* 🌤 Weather */}
          <Card title="🌤 Weather Insights">
            <p>
              Temp: {formData.temperature || "--"}°C
            </p>
            <p>
              Humidity: {formData.humidity || "--"}%
            </p>
            <p>
              Rainfall: {formData.rainfall || "--"} mm
            </p>
          </Card>

          {/* 🌱 Soil */}
          <Card title="🌱 Soil Data">
            <p>N: {formData.N || "--"}</p>
            <p>P: {formData.P || "--"}</p>
            <p>K: {formData.K || "--"}</p>
          </Card>

          {/* 📊 AI Insights */}
          <Card title="📊 AI Insights">
            <p>Best Crop: {prediction[0] || "--"}</p>
            <p style={{ color: "#22c55e" }}>
              Confidence: High
            </p>
          </Card>

          {/* 🌾 NEW Fertilizer Card */}
          <Card title="🌾 Fertilizer Recommendation">
            {fertilizerData ? (
              <>
                <p>
                  <strong
                    style={{ color: "#38bdf8" }}
                  >
                    Recommended:
                  </strong>{" "}
                  {fertilizerData.fertilizer}
                </p>

                <p style={{ marginTop: "10px" }}>
                  <strong>Reason:</strong>
                </p>

                <p style={{ color: "#94a3b8" }}>
                  {fertilizerData.reason}
                </p>
              </>
            ) : (
              <p>No fertilizer suggestion yet</p>
            )}
          </Card>

        </div>

        {/* 🧪 SOIL HEALTH */}
        <div style={{ marginTop: "30px" }}>
          <SoilHealthCard formData={formData} />
        </div>

        {/* 📈 ANALYTICS */}
        <div style={{ marginTop: "30px" }}>
          <Card title="📊 Crop Yield Trend">
            <AnalyticsChart />
          </Card>
        </div>

      </div>
    </div>
  );
}

export default MainDashboard;