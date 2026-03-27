const express = require("express");
const { handleAIChat } = require("../controllers/aiController");
console.log("✅ AI ROUTES LOADED");
const router = express.Router();

router.post("/chat", handleAIChat);
module.exports = router;