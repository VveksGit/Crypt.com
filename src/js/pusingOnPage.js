import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { fetchCryptoInfo } from './fetchingData.js';

async function cryptoCoins() {
  const coinInfo = await fetchCryptoInfo();
  console.log(coinInfo[0]);

  let coinsHTML = '';
  
  coinInfo.forEach((coin) => {
    coinsHTML += `
      <div class="crypto-coin">
        <div class="logo-name">
          <img src="${coin.logo}" alt="${coin.name} logo" class="coin-logo"/>
          <p class="name">${coin.name}</p>
        </div>
        <div class="other-info">
          <p class="price">$${coin.currentPrice}</p>
          <p class="stats">$ ${coin.priceChangePercentage24h}% <span>$</span></p>
          <button>Buy</button>
        </div>
        
      </div>
    `;
  });
  document.querySelector('.js-coins').innerHTML = coinsHTML;
}
cryptoCoins();

updateDate();
function updateDate() {
  const today = dayjs().format('MMMM DD');
  document.querySelector('.js-date').innerHTML = today;
}