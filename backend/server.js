require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Route imports
const authRoute = require("./routes/authRoutes");
const sessionRoute = require("./routes/sessionRoutes");
const questionRoute = require("./routes/questionRoutes");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");
// const { protect } = require("./middleware/authMiddleware");
// const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Connect to database
connectDB();

// API routes
app.use("/api/auth", authRoute);
app.use("/api/Session", sessionRoute);
app.use("/api/questions", questionRoute);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
