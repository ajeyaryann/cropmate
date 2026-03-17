import { useState } from "react";
import Card from "./Card";
import Sidebar from "./Sidebar";
import AnalyticsChart from "./AnalyticsChart";

function Dashboard() {
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  // 🌦 Fetch Weather Data (FIXED)
  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91e4a870583e96a4acac8021894d9ae7&units=metric`
      );

      const data = await res.json();

      console.log("Response from backend:", data);

      // Safety check
      if (!data.main) {
        alert("City not found or API error");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        rainfall: data.rain ? data.rain["1h"] || 0 : 0,
      }));
    } catch (err) {
      console.error("Weather error:", err);
    }
  };

  // 🔥 Prediction API
  const getPrediction = async () => {
    try {
      setLoading(true);
      console.log("Sending Data:", formData);
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      const crops = data.prediction.split(",");
      setPrediction(crops);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setPrediction(["Error fetching prediction"]);
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1 className="title">🌱 CropMate AI Dashboard</h1>

        {/* 🌍 CITY INPUT */}
        <div className="city-box">
          <input
            type="text"
            placeholder="Enter City (e.g. Lucknow)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Fetch Weather</button>
        </div>

        {/* 📥 INPUT FORM */}
        <div className="form">
          {Object.keys(formData).map((key) => (
            <div key={key} className="input-group">
              <label>{key.toUpperCase()}</label>
              <input
                type="number"
                name={key}
                placeholder={`Enter ${key}`}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <button onClick={getPrediction} className="predict-btn">
          {loading ? "Predicting..." : "Get Prediction"}
        </button>

        <div className="grid">
          <Card title="🌾 Top Crop Predictions">
            {prediction.length > 0 ? (
              prediction.map((crop, index) => (
                <p key={index} className="highlight">
                  {index + 1}. {crop}
                </p>
              ))
            ) : (
              <p>Enter values</p>
            )}
          </Card>

          <Card title="🌤 Weather Insights">
            <p>Temperature: {formData.temperature || "--"}°C</p>
            <p>Humidity: {formData.humidity || "--"}%</p>
            <p>Rainfall: {formData.rainfall || "--"} mm</p>
          </Card>

          <Card title="🧪 Soil Health">
            <p>N: {formData.N || "--"}</p>
            <p>P: {formData.P || "--"}</p>
            <p>K: {formData.K || "--"}</p>
          </Card>

          <Card title="📊 AI Insights">
            <p>Best Crop: {prediction[0] || "--"}</p>
            <p>Confidence: High</p>
          </Card>

          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;