const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const cron = require("node-cron");
const app = express();
const port = 3000;

app.use(cors());

let cryptoData = null;

cron.schedule("*/60 * * * *", () => {
  const apiKey = "";
  const symbols = "BTC,ETH,ATOM,TIA";
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}&CMC_PRO_API_KEY=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cryptoData = data;
    })
    .catch((err) => console.error(err));
});

app.get("/cryptocurrency", (req, res) => {
  if (cryptoData) {
    res.json(cryptoData);
  } else {
    res.status(500).json({ error: "Data not yet available" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
