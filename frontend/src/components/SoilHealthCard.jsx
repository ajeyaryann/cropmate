import React, { useState, useEffect } from "react";
import axios from "axios";

const SoilHealthCard = ({ formData }) => {
  const [form, setForm] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
  });

  const [result, setResult] = useState(null);

  // 🔥 AUTO-FILL FROM DASHBOARD
  useEffect(() => {
    if (formData) {
      setForm({
        nitrogen: formData.N || "",
        phosphorus: formData.P || "",
        potassium: formData.K || "",
        ph: formData.ph || "",
      });
    }
  }, [formData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyzeSoil = async () => {
    try {
      const res = await axios.post("http://localhost:5000/soil-health", {
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
        ph: Number(form.ph),
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getColor = (score) => {
    if (score < 50) return "red";
    if (score < 80) return "orange";
    return "limegreen";
  };

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <h2 style={{ color: "#38bdf8", marginBottom: "15px" }}>
        🧪 Soil Health Analyzer
      </h2>

      {/* Inputs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <input
          name="nitrogen"
          placeholder="Nitrogen"
          value={form.nitrogen}
          onChange={handleChange}
        />
        <input
          name="phosphorus"
          placeholder="Phosphorus"
          value={form.phosphorus}
          onChange={handleChange}
        />
        <input
          name="potassium"
          placeholder="Potassium"
          value={form.potassium}
          onChange={handleChange}
        />
        <input
          name="ph"
          placeholder="pH Value"
          value={form.ph}
          onChange={handleChange}
        />
      </div>

      {/* Button */}
      <button
        onClick={analyzeSoil}
        style={{ marginTop: "15px", width: "100%" }}
      >
        Analyze Soil
      </button>

      {/* Result */}
     {result && (
  <div style={{ marginTop: "20px" }}>
    <p>
      Health:{" "}
      <span style={{ color: getColor(result.score) }}>
        {result.health}
      </span>
    </p>

    {/* Progress Bar */}
    <div
      style={{
        width: "100%",
        background: "#333",
        borderRadius: "10px",
        height: "10px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${result.score}%`,
          background: getColor(result.score),
          height: "10px",
          borderRadius: "10px",
          transition: "0.5s",
        }}
      />
    </div>

    <p style={{ marginTop: "5px", fontSize: "12px", color: "#aaa" }}>
      Score: {result.score}/100
    </p>

    {/* 🔥 Issues */}
    <div style={{ marginTop: "10px" }}>
      <h4 style={{ color: "#f87171" }}>⚠ Issues:</h4>
      <ul>
        {result.issues.map((i, idx) => (
          <li key={idx}>• {i}</li>
        ))}
      </ul>
    </div>

    {/* 🔥 Fertilizer Recommendations */}
    <div style={{ marginTop: "10px" }}>
      <h4 style={{ color: "#4ade80" }}>🌱 Recommended Fertilizers:</h4>
      <ul>
        {result.fertilizers.map((f, idx) => (
          <li key={idx}>✅ {f}</li>
        ))}
      </ul>
    </div>
  </div>
)}
    </div>
  );
};

export default SoilHealthCard;