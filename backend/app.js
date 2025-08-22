const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin:
      "https://ai-powered-resume-analyzer-3h2qg62tv-rajyagur-nayans-projects.vercel.app/",
    credentials: true,
  })
);

// other middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/templates", express.static(path.join(__dirname, "templates")));

// routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/signup", require("./src/routes/user/signup.js"));
app.use("/login", require("./src/routes/user/login.js"));
app.use("/history", require("./src/routes/history/analyze.js"));
app.use("/profile", require("./src/routes/profile/profile.js"));
app.use("/analyze", require("./src/routes/analyzer/analyze.js"));
app.use("/templates", require("./src/routes/templates.js"));
app.use("/chat", require("./src/routes/chat/chat.js"));

module.exports = app;
