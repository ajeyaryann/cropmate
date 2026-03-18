const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { nitrogen, phosphorus, potassium, ph } = req.body;

  let score = 100;
  let suggestions = [];
  let fertilizers = [];

  // Nitrogen
  if (nitrogen < 50) {
    score -= 20;
    suggestions.push("Low Nitrogen");
    fertilizers.push("Urea / Ammonium Nitrate");
  }

  // Phosphorus
  if (phosphorus < 30) {
    score -= 20;
    suggestions.push("Low Phosphorus");
    fertilizers.push("DAP / Bone Meal");
  }

  // Potassium
  if (potassium < 40) {
    score -= 20;
    suggestions.push("Low Potassium");
    fertilizers.push("MOP (Muriate of Potash)");
  }

  // pH
  if (ph < 5.5) {
    score -= 20;
    suggestions.push("Soil too acidic");
    fertilizers.push("Add Lime");
  } else if (ph > 7.5) {
    score -= 20;
    suggestions.push("Soil too alkaline");
    fertilizers.push("Add Gypsum");
  }

  let health = "Good";
  if (score < 50) health = "Poor";
  else if (score < 80) health = "Moderate";

  res.json({
    score,
    health,
    issues: suggestions,
    fertilizers,
  });
});

module.exports = router;