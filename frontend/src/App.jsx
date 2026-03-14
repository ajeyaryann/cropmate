import { useState } from "react";

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

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setResult(data.recommended_crop);
  };

  return (
    <div style={{padding:"40px"}}>
      <h1>CropMate 🌱</h1>

      <form onSubmit={handleSubmit}>

        <input name="N" placeholder="Nitrogen" onChange={handleChange}/>
        <input name="P" placeholder="Phosphorus" onChange={handleChange}/>
        <input name="K" placeholder="Potassium" onChange={handleChange}/>
        <input name="temperature" placeholder="Temperature" onChange={handleChange}/>
        <input name="humidity" placeholder="Humidity" onChange={handleChange}/>
        <input name="ph" placeholder="pH" onChange={handleChange}/>
        <input name="rainfall" placeholder="Rainfall" onChange={handleChange}/>

        <br/><br/>

        <button type="submit">Predict Crop</button>

      </form>

      {result && (
        <h2>Recommended Crop: {result}</h2>
      )}

    </div>
  );
}

export default App;