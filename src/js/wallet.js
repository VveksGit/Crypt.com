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
    alert('Enter a valid amount in numbers!');
  }

}

function addMoneyInWallet() {

  const addedAmountInfo = JSON.parse(localStorage.getItem('AddedMoneyInfo')) ||  [];

  const addingMoneyOnPage = document.querySelector('.js-adding-money');
   
  let additionAmountHTML = '';

  if(addedAmountInfo.length > 0){
    addedAmountInfo.forEach((amount) => {
      additionAmountHTML += `
      <div class="flex justify-evenly h-10 bg-white mb-2 text-black rounded-xl items-center text-xl font-mono">
        <div class="js-amount-money font-semibold">${amount.amount}</div>
        <div class="js-money-time text-sm">${amount.time}</div>
        <div class="js-amount-type font-bold text-green-600">${amount.type === 'Add' ? 'Added' : 'Withdrawn'}</div>
      </div>
      `;

      const currentBalanceEle = document.querySelector('.js-current-balance');
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
      }
    });
  }

  if(addingMoneyOnPage){
    addingMoneyOnPage.innerHTML = additionAmountHTML;
  }

  
}
addMoneyInWallet();