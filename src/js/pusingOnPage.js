import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getSortedCryptoInfo, fetchCryptoInfo } from './fetchingData.js';

function fetchDateTime() {
  const today = dayjs().format('MMMM DD : hh:mm A');
  return today;
}
document.querySelector('.js-date-time').innerHTML = fetchDateTime();

async function mpaOnPage() {

  const {sortedByPrice, sortedByProfit} = await getSortedCryptoInfo();
  let popularCoinHTML = '';
  
  for (let index = 0; index < 6; index++) {
    const element = sortedByPrice[index];
    popularCoinHTML += coinsHTML(element, 0);
  }
  document.querySelector('.js-popular-coins').innerHTML = popularCoinHTML;


  let profitableCoinHTML = '';

  for (let index = 0; index < 6; index++) {
    const element = sortedByProfit[index];
    profitableCoinHTML += coinsHTML(element, 0);
  }
  document.querySelector('.js-profitable-coins').innerHTML = profitableCoinHTML;


  let allCoinsHTML = '';

  const allCoins = await fetchCryptoInfo();
  allCoins.forEach((element) => {
    allCoinsHTML += coinsHTML(element, 8);
  });

  document.querySelector('.js-more-coins').innerHTML = allCoinsHTML;
}
mpaOnPage();

function coinsHTML(element, marginX) {
  return `
    <div class="md:w-40 w-20 md:h-40 my-2 mx-2 md:mx-0 bg-[white] flex flex-col md:justify-center md:items-center font-mono rounded-lg bg-opacity-50 p-2"
    style="margin-left: ${marginX}px; margin-right: ${marginX}px;">

      <div class="flex  flex-col justify-center items-center">
        <img class=" w-5 md:w-10" src="${element.logo}" alt="logo">
        <p class=" text-sm md:text-xl ml-1 flex flex-wrap">${element.name.length > 7 ? element.symbol : element.name}</p>
      </div>

      <div class="font-semibold text-[10px] md:text-[16px] flex flex-col justify-center items-center">
        <p>$${element.currentPrice}</p>
        <span class="${element.priceChangePercentage24h > 0 ? 'text-green-500' : 'text-red-500'}">
          <p class="">${element.priceChangePercentage24h}%</p>
        </span>
        
      </div>
      <button class="bg-black bg-opacity-50 text-white rounded-md px-1 md:px-8 py-[1px] md:py-[2px] mt-2 mb-1 hover:bg-opacity-80 text-sm">Buy</button>
    </div>
  `;
}

// async function cryptoCoins() {
//   const coinInfo = await fetchCryptoInfo();
//   console.log(coinInfo[0]);

//   let coinsHTML = '';
  
//   coinInfo.forEach((coin) => {
//     coinsHTML += `
//       <div class="crypto-coin">
//         <div class="logo-name">
//           <img src="${coin.logo}" alt="${coin.name} logo" class="coin-logo"/>
//           <p class="name">${coin.name}</p>
//         </div>
//         <div class="other-info">
//           <p class="price">$${coin.currentPrice}</p>
//           <p class="stats">$ ${coin.priceChangePercentage24h}% <span>$</span></p>
//           <button>Buy</button>
//         </div>
        
//       </div>
//     `;
//   });
//   document.querySelector('.js-coins').innerHTML = coinsHTML;
// }
// cryptoCoins();

