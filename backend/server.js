import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CropMate API Running");
});

// Crop recommendation route
app.post("/predict", (req, res) => {
  const { nitrogen, phosphorus, potassium } = req.body;

  let crop = "Rice";

  if (nitrogen > 50 && phosphorus > 40) {
    crop = "Wheat";
  } else if (potassium > 50) {
    crop = "Sugarcane";
  }

  res.json({
    recommended_crop: crop,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});