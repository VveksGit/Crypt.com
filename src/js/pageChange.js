function landingPageToHome() {
  document.querySelector('.js-join-button').addEventListener('click',() => {
    window.location.href = 'homePage.html';
  });
}

landingPageToHome();

