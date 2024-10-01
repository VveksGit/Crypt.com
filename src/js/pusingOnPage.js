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
    popularCoinHTML += `
      <div class="w-40 h-40 my-2 bg-[white] flex flex-col justify-center items-center font-mono rounded-lg bg-opacity-50">

        <div class="flex  flex-col justify-center items-center">
          <img class="w-10" src="${element.logo}" alt="logo">
          <p class=" text-xl">${element.name}</p>
        </div>
    
        <div class="font-semibold text-[16px] flex flex-col justify-center items-center">
          <p>$${element.currentPrice}</p>
          <span class="${element.priceChangePercentage24h > 0 ? 'text-green-500' : 'text-red-500'}">
            <p class="">${element.priceChangePercentage24h}%</p>
          </span>
          <button class="bg-black bg-opacity-50 text-white rounded-md px-8 py-[2px] mt-2 hover:bg-opacity-80">Buy</button>
        </div>
      </div>
    `;
  }

  document.querySelector('.js-popular-coins').innerHTML = popularCoinHTML;

  let profitableCoinHTML = '';

  for (let index = 0; index < 6; index++) {
    const element = sortedByProfit[index];
    profitableCoinHTML += `
      <div class="w-40 h-40 my-2 bg-[white] flex flex-col justify-center items-center font-mono rounded-lg bg-opacity-50">

        <div class="flex  flex-col justify-center items-center">
          <img class="w-10" src="${element.logo}" alt="logo">
          <p class=" text-xl">${element.name}</p>
        </div>
    
        <div class="font-semibold text-[16px] flex flex-col justify-center items-center">
          <p>$${element.currentPrice}</p>
          <span class="${element.priceChangePercentage24h > 0 ? 'text-green-500' : 'text-red-500'}">
            <p class="">${element.priceChangePercentage24h}%</p>
          </span>
          <button class="bg-black bg-opacity-50 text-white rounded-md px-8 py-[2px] mt-2 hover:bg-opacity-80">Buy</button>
        </div>
      </div>
    `;
  }
  document.querySelector('.js-profitable-coins').innerHTML = profitableCoinHTML;

  let allCoinsHTML = '';

  const allCoins = await fetchCryptoInfo();

  allCoins.forEach((element) => {
    allCoinsHTML += `
    <div class="w-40 mx-2 h-40 my-2 bg-[white] flex flex-col justify-center items-center font-mono rounded-lg bg-opacity-50">

        <div class="flex  flex-col justify-center items-center">
          <img class="w-10" src="${element.logo}" alt="logo">
          <p class=" text-xl">${element.name}</p>
        </div>
    
        <div class="font-semibold text-[16px] flex flex-col justify-center items-center">
          <p>$${element.currentPrice}</p>
          <span class="${element.priceChangePercentage24h > 0 ? 'text-green-500' : 'text-red-500'}">
            <p class="">${element.priceChangePercentage24h}%</p>
          </span>
          <button class="bg-black bg-opacity-50 text-white rounded-md px-8 py-[2px] mt-2 hover:bg-opacity-80">Buy</button>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-more-coins').innerHTML = allCoinsHTML;
}
mpaOnPage();

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

