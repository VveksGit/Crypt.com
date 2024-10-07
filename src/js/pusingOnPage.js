import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getSortedCryptoInfo, fetchCryptoInfo } from './fetchingData.js';
import { buyCrypto } from './purchase.js';
import { walletPage } from './pageChange.js';

  walletPage();

  export function fetchDateTime() {
    const today = dayjs().format('MMM DD : hh:mm A');
    return today;
  }
  const dateTimeEle = document.querySelector('.js-date-time');
  if(dateTimeEle){
    dateTimeEle.innerHTML = fetchDateTime();
  }
  
  function openCloseNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('navMenu');
    
    if(hamburger){
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden'); 
      });
    }
    
  }
  openCloseNav();
  
  
  async function mpaOnPage() {
  
    const {sortedByPrice, sortedByProfit} = await getSortedCryptoInfo();
    let popularCoinHTML = '';
    
    for (let index = 0; index < 6; index++) {
      const element = sortedByPrice[index];
      popularCoinHTML += coinsHTML(element);
    }
    const popularCoinsEle = document.querySelector('.js-popular-coins');

    if(popularCoinsEle){
      popularCoinsEle.innerHTML = popularCoinHTML;
    }
  
  
    let profitableCoinHTML = '';
  
    for (let index = 0; index < 6; index++) {
      const element = sortedByProfit[index];
      profitableCoinHTML += coinsHTML(element);
    }
    const profitableCoinsEle = document.querySelector('.js-profitable-coins');
    if(profitableCoinsEle){
      profitableCoinsEle.innerHTML = profitableCoinHTML;
    }
  
    let allCoinsHTML = '';
  
    const allCoins = await fetchCryptoInfo();
    allCoins.forEach((element) => {
      allCoinsHTML += coinsHTML(element);
    });
  
    const allCoinsEle = document.querySelector('.js-more-coins');
    if(allCoinsEle){
      allCoinsEle.innerHTML = allCoinsHTML;
    }

    buyCrypto(allCoins);

  }
  mpaOnPage();
  

  function coinsHTML(element) {
    return `
      <div class="md:w-40 w-20 md:h-40 my-2 mx-2 md:mx-0 bg-[white] flex flex-col md:justify-center md:items-center font-mono rounded-lg bg-opacity-50 p-2">
  
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
        <button class="js-buy-button bg-black bg-opacity-50 text-white rounded-md px-1 md:px-8 py-[1px] md:py-[2px] mt-2 mb-1 hover:bg-opacity-80 text-sm" data-base-asset="${element.symbol}">Buy</button>
      </div>
    `;
  }
  
