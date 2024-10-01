const popularCryptoIds = [
  'bitcoin', 'ethereum', 'binancecoin', 'cardano', 'ripple', 
  'solana', 'polkadot', 'dogecoin', 'matic-network', 'litecoin', 
  'bitcoin-cash', 'avalanche-2', 'uniswap', 'chainlink', 'cosmos', 
  'stellar', 'shiba-inu', 'tron', 'algorand', 'filecoin', 
  'vechain', 'tezos', 'theta-token', 'elrond', 'monero', 
  'aave', 'ftx-token', 'eos', 'maker', 'zilliqa', 
  'iota'
];

export async function fetchCryptoInfo() {
  const ids = popularCryptoIds.join(',');
  let cryptoInfo = [];

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`;

  try{
    const response = await fetch(url);
    const data = await response.json();

    cryptoInfo = data.map(coin => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      logo: coin.image,
      currentPrice: coin.current_price,
      marketCap: coin.market_cap,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
      volume: coin.total_volume
    }));
    
  } catch (error) {
    console.error('Error fetching data from coinGecko', error);
  }
  return cryptoInfo;
}


export async function getSortedCryptoInfo() {
  const cryptoInfo = await fetchCryptoInfo();

  const sortedByPrice = [...cryptoInfo].sort((a,b) => {
    if(a.currentPrice > b.currentPrice){
      return -1;
    }
    if(a.currentPrice < b.currentPrice){
      return 1;
    }
    return 0;
  });  

  const sortedByProfit = [...cryptoInfo].sort((a,b) => {
    if(a.priceChangePercentage24h > b.priceChangePercentage24h){
      return -1;
    }
    if(a.priceChangePercentage24h < b.priceChangePercentage24h){
      return 1;
    }
    return  0;
  });

  return{
    sortedByPrice,
    sortedByProfit
  };
}

