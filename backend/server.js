// ================================
// CropMate Backend Server
// Optimized Mistral AI + ML
// ================================

const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const { spawn } = require("child_process");

const app = express();

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());

// ================================
// Soil Health Route (Safe Load)
// ================================

try {

  const soilHealthRoute =
    require("./src/routes/soilHealth");

  app.use(
    "/soil-health",
    soilHealthRoute
  );

}
catch (err) {

  console.log(
    "Soil health route not found"
  );

}

// ================================
// Root Test Route
// ================================

app.get("/", (req, res) => {

  res.send(
    "CropMate Backend Running ✅"
  );

});

// ================================
// 🤖 AI CHAT ROUTE (Optimized)
// ================================

app.post("/api/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {

      return res.json({

        reply:
          "Please type a message."

      });

    }

    console.log(
      "AI Message:",
      message
    );

    // Short optimized prompt

    const prompt = `
You are a farming expert.

Give short practical advice.

Question:
${message}
`;

    // Call Ollama API

    const response =
      await axios.post(

        "http://localhost:11434/api/generate",

        {

          model: "mistral",

          prompt: prompt,

          stream: false,

          options: {

            num_predict: 200,
            temperature: 0.7

          }

        },

        {

          timeout: 120000

        }

      );

    const aiReply =
      response.data.response;

    console.log(
      "AI Response Generated"
    );

    res.json({

      reply:
        aiReply

    });

  }

  catch (error) {

    console.error(
      "AI Chat Error:",
      error.message
    );

    res.status(500).json({

      reply:
        "AI service temporarily unavailable."

    });

  }

});

// ================================
// 🌱 Crop Prediction Route
// ================================

app.post("/predict", (req, res) => {

  try {

    const inputData =
      req.body;

    const pythonPath =
      path.join(

        __dirname,
        "ml",
        "predict.py"

      );

    const pythonProcess =
      spawn(

        "python",

        [

          pythonPath,

          JSON.stringify(
            inputData
          )

        ]

      );

    let result = "";
    let error = "";

    pythonProcess.stdout.on(
      "data",

      (data) => {

        result +=
          data.toString();

      }

    );

    pythonProcess.stderr.on(
      "data",

      (data) => {

        error +=
          data.toString();

      }

    );

    pythonProcess.on(
      "close",

      (code) => {

        if (code !== 0) {

          console.error(
            "Prediction Error:",
            error
          );

          return res
            .status(500)
            .json({

              error:
                "Prediction failed"

            });

        }

        res.json({

          prediction:
            result.trim()

        });

      }

    );

  }

  catch (err) {

    console.error(
      "Server Error:",
      err
    );

    res.status(500).json({

      error:
        "Internal server error"

    });

  }

});

// ================================
// 🌾 Fertilizer Route
// ================================

app.post("/fertilizer", (req, res) => {

  try {

    const {

      nitrogen,
      phosphorus,
      potassium

    } = req.body;

    const pythonPath =
      path.join(

        __dirname,
        "ml",
        "fertilizer_recommendation.py"

      );

    const pythonProcess =
      spawn(

        "python",

        [

          pythonPath,

          nitrogen,
          phosphorus,
          potassium

        ]

      );

    let result = "";
    let error = "";

    pythonProcess.stdout.on(
      "data",

      (data) => {

        result +=
          data.toString();

      }

    );

    pythonProcess.stderr.on(
      "data",

      (data) => {

        error +=
          data.toString();

      }

    );

    pythonProcess.on(
      "close",

      (code) => {

        if (code !== 0) {

          console.error(
            "Fertilizer Error:",
            error
          );

          return res
            .status(500)
            .json({

              error:
                "Fertilizer failed"

            });

        }

        res.json({

          recommendation:
            result.trim()

        });

      }

    );

  }

  catch (err) {

    console.error(
      "Server Error:",
      err
    );

    res.status(500).json({

      error:
        "Internal server error"

    });

  }

});

// ================================
// Server Start
// ================================

const PORT = 5000;

app.listen(

  PORT,

  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }

);

// ================================
// 🔥 AI Warm-Up (Speed Boost)
// ================================

setTimeout(async () => {

  try {

    await axios.post(

      "http://localhost:11434/api/generate",

      {

        model: "mistral",

        prompt: "Hello",

        stream: false,

        options: {

          num_predict: 20

        }

      }

    );

    console.log(
      "AI Warmed Up ✅"
    );

  }

  catch (err) {

    console.log(
      "Warmup failed"
    );

  }

}, 5000);