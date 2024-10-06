function landingPageToHome() {
  const joinButton = document.querySelector('.js-join-button')
  if(joinButton){
    joinButton.addEventListener('click',() => {
      window.location.href = 'homePage.html';
    });
  }
  
}

landingPageToHome();

export function walletPage() {
  const walletButton = document.querySelector('.fa-wallet');
  if(walletButton){
    walletButton.addEventListener('click', () => {
      window.location.href = 'wallet.html';
    })
  }
}