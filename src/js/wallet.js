import { fetchDateTime } from "./pusingOnPage.js";

const jsAddButtonEle = document.querySelector('.js-add-button')
if(jsAddButtonEle){
  jsAddButtonEle.addEventListener('click', () => {
    localStorage.setItem('addOrWithdraw', 'Add');
    window.location.href = 'addMoney.html';
  });
}

const jsWithdrawEle = document.querySelector('.js-withdraw-button')
if(jsWithdrawEle){
  jsWithdrawEle.addEventListener('click', () => {
    localStorage.setItem('addOrWithdraw', 'Withdraw');
    window.location.href = 'addMoney.html';
  });
}
window.addEventListener('DOMContentLoaded', () => {
  const addOrWithdraw = localStorage.getItem('addOrWithdraw');
  if(addOrWithdraw){
    navigateAddOrWithdraw(addOrWithdraw);
    clickToAddWithdraw(addOrWithdraw);
    localStorage.removeItem('addOrWithdraw')
    localStorage.removeItem('addOrWithdraw')
  }
});


function navigateAddOrWithdraw(addOrWithdraw) {
  const addMoneyHeadingEle = document.querySelector('.js-addMoney-heading');
  if(addMoneyHeadingEle){
    addMoneyHeadingEle.innerHTML = `${addOrWithdraw} Money Brokie!`;
  }

  const addMoneyButtonEle = document.querySelector('.js-money-add-button');
  if(addMoneyButtonEle){
    addMoneyButtonEle.innerHTML = `${addOrWithdraw}`;
  }
}

function clickToAddWithdraw(type) {

  const addMoneyEle = document.querySelector('.js-money-input');
  const addMoneyButtonEle = document.querySelector('.js-money-add-button');

  if(addMoneyEle){
    addMoneyEle.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        getTheAmountTime(addMoneyEle, type);
      }
    })
    if(addMoneyButtonEle) {
      addMoneyButtonEle.addEventListener('click', () => {
        getTheAmountTime(addMoneyEle, type);
      })
    }
  }
}

function getTheAmountTime(addMoneyEle, type) {

  const moneyAmountTime = {
    amount: parseFloat(addMoneyEle.value),
    time: fetchDateTime(),
    type: type
  }
  if(moneyAmountTime.amount > 0){

    let existingData = JSON.parse(localStorage.getItem('AddedMoneyInfo')) ||  [];
    
    existingData.push(moneyAmountTime);
    localStorage.setItem('AddedMoneyInfo', JSON.stringify(existingData));

    const typeOfTransition = type === 'Withdraw' ? 'Withdrawn' : 'Added';
    
    alert(`${moneyAmountTime.amount}$ ${typeOfTransition}`);

    window.location.href = 'wallet.html';

  } else {
    alert('Enter a .js-current-balancevalid amount in numbers!');
  }

}

const currentBalanceEle = document.querySelector('');


function addMoneyInWallet() {

  const addedAmountInfo = JSON.parse(localStorage.getItem('AddedMoneyInfo')) ||  [];

  const addingMoneyOnPage = document.querySelector('.js-adding-money');
   
  let additionAmountHTML = '';

  if(addedAmountInfo.length > 0){
    addedAmountInfo.forEach((amount) => {
      additionAmountHTML += `
      <div class="flex justify-evenly h-10 bg-white mb-2 text-black rounded-xl items-center text-xl font-mono">
        <div class="js-amount-money font-semibold flex-1 text-center">${amount.amount}$</div>
        <div class="js-money-time text-sm flex-1 text-center">${amount.time}</div>
        <div class="js-amount-type font-bold text-green-600 flex-1 text-center">${amount.type === 'Add' ? 'Added' : 'Withdrawn'}</div>
      </div>
      `;

      if(currentBalanceEle){
        const balanceBefore = parseFloat(currentBalanceEle.innerText);
        let balanceAfter = 0;
        if(amount.type === 'Add'){
          balanceAfter = balanceBefore + amount.amount;
          currentBalanceEle.innerHTML = `${balanceAfter.toFixed(2)}`;
        } else if(amount.type === 'Withdraw') {
          balanceAfter = balanceBefore - amount.amount;
          currentBalanceEle.innerHTML = `${balanceAfter.toFixed(2)}`;
        }else{
          console.error(`${amount.type} : 'There is no Transaction yet'`);
          currentBalanceEle.innerHTML = balanceBefore;
        }
        localStorage.setItem('currentBalance', JSON.stringify(balanceAfter));
      }
    });
  }

  if(addingMoneyOnPage){
    addingMoneyOnPage.innerHTML = additionAmountHTML;
  }


}
addMoneyInWallet();

function displayBoughtAssets() {
  const boughtAssets = JSON.parse(localStorage.getItem('boughtAssets')) || [];
  let assetTransactionHTML = '';
  boughtAssets.forEach((boughtAsset) => {
    assetTransactionHTML += `
      <div class="flex justify-evenly h-14 bg-white mb-2 text-black rounded-xl items-center text-xl font-mono">
        <div class="js-amount-type font-bold flex-1 text-center">${boughtAsset.assetName}</div>
        <div class="js-money-time flex-1 flex items-center justify-center">
          <div class="text-sm mr-1">${boughtAsset.volumeOfAsset}</div>
          <div><img class="w-6" src="${boughtAsset.assetLogo}"></div>
         </div>
        <div class="js-amount-money font-semibold flex-1 text-center text-red-600">${boughtAsset.amountToSpend}$</div>
      </div>
    `;
    const assetTransaction = document.querySelector('.js-bought-asset')
    if(assetTransaction){
      assetTransaction.innerHTML = assetTransactionHTML;
    }
    if(currentBalanceEle){
      const currentBalance = currentBalanceEle.innerText - boughtAsset.amountToSpend;
      currentBalanceEle.innerHTML = currentBalance.toFixed(2);

    }
  })
}

displayBoughtAssets();