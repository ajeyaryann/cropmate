const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const { message } = req.body;

    console.log("User message:", message);

    let reply = "";

    const text = message.toLowerCase();

    if (text.includes("wheat")) {

      reply =
        "For wheat crops, ensure proper irrigation and apply nitrogen fertilizer during early growth.";

    }

    else if (text.includes("dry")) {

      reply =
        "Your crop may be drying due to lack of water. Increase irrigation frequency.";

    }

    else if (text.includes("rice")) {

      reply =
        "Rice crops require standing water during early growth stages.";

    }

    else {

      reply =
        "I understand your question. Please provide more crop details for better advice.";

    }

    res.json({
      reply: reply,
    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "Server error occurred.",
    });

  }
});

module.exports = router;