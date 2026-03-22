const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Soil Health Route
const soilHealthRoute = require("./src/routes/soilHealth");
app.use("/soil-health", soilHealthRoute);

// Test route
app.get("/", (req, res) => {
  res.send("CropMate Backend Running ✅");
});


// ================================
// 🌱 Crop Prediction Route
// ================================

app.post("/predict", (req, res) => {

  console.log("Received Data:", req.body);

  try {

    const inputData = req.body;

    console.log("Sending to Python:", inputData);

    const pythonPath = path.join(__dirname, "ml", "predict.py");

    const pythonProcess = spawn("python", [
      pythonPath,
      JSON.stringify(inputData),
    ]);

    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {

      if (code !== 0) {

        console.error("Python Error:", error);

        return res.status(500).json({
          error: "Prediction failed",
          details: error,
        });

      }

      return res.json({
        prediction: result.trim(),
      });

    });

  } catch (err) {

    console.error("Server Error:", err);

    res.status(500).json({
      error: "Internal server error"
    });

  }

});



// ================================
// 🌾 Fertilizer Recommendation Route
// ================================

app.post("/fertilizer", (req, res) => {

  try {

    const { nitrogen, phosphorus, potassium } = req.body;

    console.log("Fertilizer Input:", nitrogen, phosphorus, potassium);

    const pythonPath = path.join(
      __dirname,
      "ml",
      "fertilizer_recommendation.py"
    );

    const pythonProcess = spawn("python", [
      pythonPath,
      nitrogen,
      phosphorus,
      potassium
    ]);

    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {

      if (code !== 0) {

        console.error("Python Error:", error);

        return res.status(500).json({
          error: "Fertilizer prediction failed",
          details: error,
        });

      }

      try {

        const parsedResult = eval("(" + result + ")");

        res.json(parsedResult);

      } catch (parseError) {

        res.status(500).json({
          error: "Failed to parse fertilizer result"
        });

      }

    });

  } catch (err) {

    console.error("Server Error:", err);

    res.status(500).json({
      error: "Internal server error"
    });

  }

});



// ================================
// 🚀 Start Server
// ================================

const PORT = 5000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on http://localhost:${PORT}`);

});