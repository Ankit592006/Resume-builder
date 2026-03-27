//const fetch = require("node-fetch");

 const callAIModel = async (payload) => {
  try {
    const response = await fetch(
      "https://ai-chat-service-w2yg.onrender.com/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("AI model failed");
  }
};
module.exports = { callAIModel };