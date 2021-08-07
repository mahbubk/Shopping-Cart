let addToCartButtons = document.querySelector('.shop-item-button');

for (var i = 0; i < addToCartButtons.length; i++) {
     let button = addToCartButtons[i];

     button.addEventListener('click', addTocartClicked);

}


function addTocartClicked(e) {

  let button = e.target;
  let shopItem = button.parentElement.parentElement;

  let title = shopItem.querySelector('.shop-item-title')[0].innerText;
  let price = shopItem.querySelector('.shop-item-price')[0].innerText;
  let imageSrc = shopItem.querySelector('.shop-item-image')[0].src;
  addItemToCart(title, price, imageSrc);
}


function addItemToCart(title, price, imageSrc) {
   let cartRow = document.createElement('div');

}
