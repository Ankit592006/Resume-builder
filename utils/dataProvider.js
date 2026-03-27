 const getUserMentalData = async (userId) => {
  // 👉 Later replace with DB call

  return {
    stress_score: 32,
    risk_level: "LOW",
    sleepHours: 6,
    screenTime: 12,
    stepCount: 8000,
    aqi: 34,
    mood: "neutral",
    chat_history: "",
    summary: "",
  };
};
module.exports = { getUserMentalData };