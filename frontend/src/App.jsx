import { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [topCrops, setTopCrops] = useState([]);

  const apiKey = "91e4a870583e96a4acac8021894d9ae7";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getWeather = async () => {

    try {

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      setFormData(prev => ({
        ...prev,
        temperature: data.main.temp,
        humidity: data.main.humidity
      }));

    } catch (error) {

      console.error("Weather error:", error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log("Prediction:", data);

      setResult(data.prediction);
      setTopCrops(data.top3);

    } catch (error) {

      console.error("Prediction error:", error);

    }

  };

  return (

    <div className="container">

      <h1>🌱 CropMate AI</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="button" onClick={getWeather}>
          Get Weather
        </button>

        <input
          type="number"
          name="N"
          placeholder="Nitrogen"
          value={formData.N}
          onChange={handleChange}
        />

        <input
          type="number"
          name="P"
          placeholder="Phosphorus"
          value={formData.P}
          onChange={handleChange}
        />

        <input
          type="number"
          name="K"
          placeholder="Potassium"
          value={formData.K}
          onChange={handleChange}
        />

        <input
          type="number"
          name="temperature"
          placeholder="Temperature"
          value={formData.temperature}
          onChange={handleChange}
        />

        <input
          type="number"
          name="humidity"
          placeholder="Humidity"
          value={formData.humidity}
          onChange={handleChange}
        />

        <input
          type="number"
          name="ph"
          placeholder="Soil pH"
          value={formData.ph}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rainfall"
          placeholder="Rainfall"
          value={formData.rainfall}
          onChange={handleChange}
        />

        <button type="submit">
          Predict Crop
        </button>

      </form>

      {result && (

        <div className="result-card">

          <h2>🌾 Recommended Crop</h2>
          <h3>{result}</h3>

          <h2>📊 Top 3 Crop Recommendations</h2>

          {topCrops.map((crop, index) => (

            <p key={index}>
              {crop.crop} — {(crop.probability * 100).toFixed(2)}%
            </p>

          ))}

          <div className="soil-info">
            <p>🌡 Temperature: {formData.temperature} °C</p>
            <p>💧 Humidity: {formData.humidity} %</p>
            <p>🌧 Rainfall: {formData.rainfall} mm</p>
            <p>🧪 Soil pH: {formData.ph}</p>
          </div>

        </div>

      )}

    </div>

  );

}

export default App;