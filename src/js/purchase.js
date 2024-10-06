export function buyCrypto(allCoins){
  const buyButtons = document.querySelectorAll('.js-buy-button');
  
  buyButtons.forEach((button) => {
    button.addEventListener('click', (event) => {

      const baseAsset = event.currentTarget.getAttribute('data-base-asset');

      if(baseAsset) {
        const coin = allCoins.find(coin => coin.symbol === baseAsset);

        if(coin){
          localStorage.setItem('pcInfo', JSON.stringify(coin));
          window.location.href = 'purchasePage.html';
        }else{
          console.log('coin not found');
        }
      } else{
        console.log('base asset error');
      }
      
    });
  });
}

const selectedAsset = JSON.parse(localStorage.getItem('pcInfo'));
console.log(selectedAsset);

const buyAssetEle = document.querySelector('.js-buy-asset')
if(buyAssetEle){
  buyAssetEle.innerHTML = `BUY ${selectedAsset.symbol}`;
}

const tradeAssetEle = document.querySelector('.js-trade-asset')
if(buyAssetEle){
  tradeAssetEle.innerHTML = `TRADE ${selectedAsset.symbol}`;
}

const assetLogoEle = document.querySelector('.js-asset-logo')
if(assetLogoEle){
  assetLogoEle.src = selectedAsset.logo;
}

const assetnameEle = document.querySelector('.js-asset-name')
if(assetnameEle){
  assetnameEle.innerHTML = selectedAsset.symbol;
}

const buyAssetButtonELe = document.querySelector('.js-buy-asset-button');
if(buyAssetButtonELe){
  buyAssetButtonELe.innerHTML = `BUY ${selectedAsset.symbol}`;
}



const cryptoVolumeEle = document.querySelector('.js-crypto-volume');
const USDele = document.querySelector('.js-money-usd');

if(USDele && cryptoVolumeEle){
  USDele.addEventListener('input', (event) => {
    const USD = parseFloat(event.target.value); // Convert input to a number
    const coinPrice = selectedAsset.currentPrice
    cryptoVolumeEle.value = ((USD && coinPrice >0) ? (USD /coinPrice ).toFixed(6) : '');
  })
}

if(USDele && cryptoVolumeEle){
  cryptoVolumeEle.addEventListener('input', (event) => {
    const coinVolume = parseFloat(event.target.value);
    const coinPrice = selectedAsset.currentPrice;
    USDele.value = (coinVolume && coinPrice >0) ? ( coinVolume * coinPrice).toFixed(6) : ''
  })
}

if(tradeAssetEle){
  tradeAssetEle.addEventListener('click', () => {
    document.querySelector('.js-usd-image').src = selectedAsset.logo;
    document.querySelector('.js-usd-name').innerHTML = selectedAsset.symbol;
    assetnameEle.innerHTML = 'USD';
    assetLogoEle.src = 'https://public.bnbstatic.com/image/currencies/USD.png';
    buyAssetButtonELe.innerHTML = `Trade ${selectedAsset.symbol}`
    USDele.addEventListener('input', (event) => {
      const coinVolume = parseFloat(event.target.value);
      const coinPrice = selectedAsset.currentPrice;
      cryptoVolumeEle.value = (coinVolume && coinPrice >0) ? ( coinVolume * coinPrice).toFixed(6) : '';
    })
    cryptoVolumeEle.addEventListener('input', (event) => {
      const USD = parseFloat(event.target.value); // Convert input to a number
      const coinPrice = selectedAsset.currentPrice
      USDele.value = ((USD && coinPrice >0) ? (USD /coinPrice ).toFixed(6) : '');
    })
  })
}

if(buyAssetEle){
  buyAssetEle.addEventListener('click', () => {
    document.querySelector('.js-usd-image').src = 'https://public.bnbstatic.com/image/currencies/USD.png';
    document.querySelector('.js-usd-name').innerHTML = 'USD';
    assetLogoEle.innerHTML = selectedAsset.symbol;
    assetLogoEle.src = selectedAsset.logo;
    buyAssetButtonELe.innerHTML = `BUY ${selectedAsset.symbol}`

    USDele.addEventListener('input', (event) => {
      const USD = parseFloat(event.target.value); // Convert input to a number
      const coinPrice = selectedAsset.currentPrice
      cryptoVolumeEle.value = ((USD && coinPrice >0) ? (USD /coinPrice ).toFixed(6) : '');
    })

    cryptoVolumeEle.addEventListener('input', (event) => {
      const coinVolume = parseFloat(event.target.value);
      const coinPrice = selectedAsset.currentPrice;
      USDele.value = (coinVolume && coinPrice >0) ? ( coinVolume * coinPrice).toFixed(6) : ''
    })
  })
}
    