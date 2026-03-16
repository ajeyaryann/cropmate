const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CropMate API running");
});

app.post("/predict", (req, res) => {

  const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

  console.log("Received Data:", req.body);

  const command = `python ml/predict.py ${N} ${P} ${K} ${temperature} ${humidity} ${ph} ${rainfall}`;

  exec(command, (error, stdout, stderr) => {

    if (error) {
      console.error("Python Error:", error);
      return res.status(500).json({ error: "Prediction failed" });
    }

    try {

      // extract JSON from python output
      const jsonStart = stdout.indexOf("{");
      const jsonString = stdout.slice(jsonStart);

      const result = JSON.parse(jsonString);

      console.log("Prediction Result:", result);

      res.json(result);

    } catch (err) {

      console.error("Parse Error:", stdout);
      res.status(500).json({ error: "Invalid ML output" });

    }

  });

});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});