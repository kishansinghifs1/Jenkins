const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    service: "Jenkins CI/CD Demo",
    version: "v1.0",
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}`);
});
