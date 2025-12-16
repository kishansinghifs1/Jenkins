const express = require("express");
const path = require("path");
const https = require("https");

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

app.get("/api/joke", (req, res) => {
  const url = "https://v2.jokeapi.dev/joke/Any";

  https.get(url, (apiRes) => {
    let data = "";
    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", () => {
      try {
        const parsedData = JSON.parse(data);
        res.json(parsedData);
      } catch (error) {
        res.status(500).json({ error: "Failed to parse external API response" });
      }
    });
  }).on("error", (err) => {
    res.status(500).json({ error: "Error fetching data from external API", details: err.message });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}`);
});
