import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Funny Scraper Running OK ✔");
});

app.listen(PORT, () => {
  console.log("🚀 Servidor iniciado en puerto", PORT);
});
