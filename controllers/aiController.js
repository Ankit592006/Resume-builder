const { callAIModel } = require("../services/aiService");
const { getUserMentalData } = require("../utils/dataProvider");
const makeCall = require("../utils/twilioService");
console.log("🔥 CONTROLLER HIT");

 const handleAIChat = async (req, res) => {
  try {
    console.log("🔥 STEP 1: Controller Hit");

    console.log("👉 BODY:", req.body);

    const { userId, message } = req.body || {};

    console.log("🔥 STEP 2: After destructuring");

    const userData = await getUserMentalData(userId);

    console.log("🔥 STEP 3: userData:", userData);

    const payload = {
      message,
      ...userData,
    };

    console.log("🔥 STEP 4: PAYLOAD:", payload);

    const aiResponse = await callAIModel(payload);

    console.log("🔥 STEP 5: AI RESPONSE:", aiResponse);
    const stressScore = aiResponse?.updated_stress_score ?? 0;

// 🚨 CONDITION
if (stressScore > 9) {
  console.log("🚨 HIGH STRESS DETECTED → TRIGGER CALL");

  // 🔒 Prevent crash if env missing
  if (process.env.CARETAKER_PHONE) {
    await makeCall(process.env.CARETAKER_PHONE);
  } else {
    console.log("⚠️ No phone number configured");
  }
}

    res.json({
      reply: aiResponse?.reply || "fallback",
      updated_stress_score: aiResponse?.updated_stress_score,
      updated_risk_level: aiResponse?.updated_risk_level,
    });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "AI processing failed" });
  }
};
module.exports = { handleAIChat };