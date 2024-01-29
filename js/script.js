const url = `http://localhost:3000/cryptocurrency`;

const ETH = "ETH";
const BTC = "BTC";
const ATOM = "ATOM";
const TIA = "TIA";
const writingData = document.getElementById("crypto");
const button = document.getElementById("afficher");

document.addEventListener("DOMContentLoaded", (event) => {
  const dateElement = document.getElementById("date");
  const currentDate = new Date();
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  dateElement.textContent = `${day} ${month}`;
});

function getPercentageClass(percentage) {
  return percentage >= 0
    ? { class: "positive", symbol: "▲" }
    : { class: "negative", symbol: "▼;" };
}

function fetchData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        const cosmos = data.data[ATOM];
        const floorCosmos = parseFloat(cosmos.quote.USD.price.toFixed(2));
        const cosmosChange1h = parseFloat(
          cosmos.quote.USD.percent_change_1h.toFixed(2)
        );
        const ethereum = data.data[ETH];
        const floorEthereum = parseFloat(ethereum.quote.USD.price.toFixed(2));
        const ethereumChange1h = parseFloat(
          ethereum.quote.USD.percent_change_1h.toFixed(2)
        );
        const bitcoin = data.data[BTC];
        const floorBitcoin = parseFloat(bitcoin.quote.USD.price.toFixed(2));
        const bitcoinChange1h = parseFloat(
          bitcoin.quote.USD.percent_change_1h.toFixed(2)
        );
        const tia = data.data[TIA];
        const floorTia = parseFloat(tia.quote.USD.price.toFixed(2));
        const tiaChange1h = parseFloat(
          tia.quote.USD.percent_change_1h.toFixed(2)
        );

        if (cosmos) {
          console.log(`Le prix d'Atom est de ${floorCosmos} USD.`);
          console.log(`La variation d'Atom sur 1h est de ${cosmosChange1h}%`);
        } else {
          console.log("Atom non trouvé dans les données.");
        }
        if (ethereum) {
          console.log(`Le prix d'Ethereum est de ${floorEthereum} USD.`);
          console.log(
            `La variation d'Ethereum sur 1h est de ${ethereumChange1h}%`
          );
        } else {
          console.log("Ethereum non trouvé dans les données.");
        }
        if (bitcoin) {
          console.log(`Le prix de Bitcoin est de ${floorBitcoin} USD.`);
          console.log(
            `La variation de Bitcoin sur 1h est de ${bitcoinChange1h}%`
          );
        } else {
          console.log("Bitcoin non trouvé dans les données.");
        }
        if (tia) {
          console.log(`Le prix de Tia est de ${floorTia} USD.`);
          console.log(`La variation de Tia sur 1h est de ${tiaChange1h}%`);
        } else {
          console.log("Tia non trouvé dans les données.");
        }
        const cosmosClassAndSymbol = getPercentageClass(cosmosChange1h);
        const ethereumClassAndSymbol = getPercentageClass(ethereumChange1h);
        const bitcoinClassAndSymbol = getPercentageClass(bitcoinChange1h);
        const tiaClassAndSymbol = getPercentageClass(tiaChange1h);

        writingData.innerHTML = `<div id="crypto1"><div class="contnairLogo"><img class="logoCrypto" src="src/cosmos-atom-logo.png"></img></div><p class="cryptoName">Atom</p> <p class="price">${floorCosmos}</p> <p class="percentage ${cosmosClassAndSymbol.class}">${cosmosClassAndSymbol.symbol} ${cosmosChange1h}% en 1H</p></div>
        <div id="crypto2"><div class="contnairLogo"><img class="logoCrypto" src="src/eth.png"></img></div><p class="cryptoName">Ethereum</p> <p class="price">${floorEthereum}</p>   <p class="percentage ${ethereumClassAndSymbol.class}">${ethereumClassAndSymbol.symbol} ${ethereumChange1h}% en 1H</p></div>
        <div id="crypto3"><div class="contnairLogo"><img class="logoCrypto" src="src/bitcoin-btc-logo.png"></img></div><p class="cryptoName">Bitcoin</p> <p class="price">${floorBitcoin}</p>  <p class="percentage ${bitcoinClassAndSymbol.class}">${bitcoinClassAndSymbol.symbol} ${bitcoinChange1h}% en 1H</p></div>
        <div id="crypto4"><div class="contnairLogo"><img class="logoCrypto" src="src/celestia.png"></img></div><p class="cryptoName">Tia</p> <p class="price">${floorTia}</p>  <p class="percentage ${tiaClassAndSymbol.class}">${tiaClassAndSymbol.symbol} ${tiaChange1h}% en 1H</p></div>`;
      } else {
        console.log("Data not found");
      }
    })
    .catch((err) => console.error("Erreur :", err));
}
fetchData();
setInterval(fetchData, 30000); //30 secondes
