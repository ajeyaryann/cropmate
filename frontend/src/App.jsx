import { useState } from "react";

function App() {

  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nitrogen,
        phosphorus,
        potassium
      })
    });

    const data = await response.json();
    setResult(data.recommended_crop);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌱 CropMate</h1>
      <h3>AI Crop Recommendation</h3>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Nitrogen"
          value={nitrogen}
          onChange={(e) => setNitrogen(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Phosphorus"
          value={phosphorus}
          onChange={(e) => setPhosphorus(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Potassium"
          value={potassium}
          onChange={(e) => setPotassium(e.target.value)}
        />

        <br /><br />

        <button type="submit">Predict Crop</button>

      </form>

      {result && (
        <h2>Recommended Crop: {result}</h2>
      )}
    </div>
  );
}

export default App;