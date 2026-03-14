const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {

  const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

  const command = `python ml/crop_model.py ${N} ${P} ${K} ${temperature} ${humidity} ${ph} ${rainfall}`;

  exec(command, (error, stdout, stderr) => {

    if (error) {
      console.error(error);
      return res.status(500).send("Prediction error");
    }

    res.json({
      recommended_crop: stdout.trim()
    });

  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});