let removeCartItemButtons = document.getElementsByClassName('btn-danger');

for (let  i = 0; i < removeCartItemButtons.length; i++) {

  let button = removeCartItemButtons[i];

  button.addEventListener('click', removeCartItem);

}


let quantityInputs = document.getElementsByClassName('cart-quantity-input');

for(i=0;i<quantityInputs.length;i++) {

   let input = quantityInputs[i];

   input.addEventListener('change', quantityChanged);
}


let addToCartButtons = document.getElementsByClassName('shop-item-button');
for(i=0;i<addToCartButtons.length;i++) {
  let button = addToCartButtons[i];
  button.addEventListener('click', addTocartClicked);
}

document.querySelector('.btn-purchase').addEventListener('click', purchaseCliked);

function purchaseCliked(e) {
  alert('Thank you for your purchase');
  let cartItems = document.querySelector('.cart-items');
  while(cartItems.hasChildNodes()) {
     cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(e) {

  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();

}

function quantityChanged(e) {
  let input = e.target;

  if(isNaN(input.value) || input.value <= 0) {
     input.value = 1;
  }

  updateCartTotal();
}


function addTocartClicked(e) {
    let button = e.target;
    let shopItem = button.parentElement.parentElement;
    let title  = shopItem.querySelector('.shop-item-title').innerText;
    let price = shopItem.querySelector('.shop-item-price').innerText;
    let imageSrc = shopItem.querySelector('.shop-item-image').src

    addItemToCart(title, price, imageSrc);
    updateCartTotal();

}


function addItemToCart(title, price, imageSrc) {
   let cartRow = document.createElement('div');

   let cartItems = document.querySelector('.cart-items');
   let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
   for(let i=0;i<cartItemNames.length;i++) {
     if(cartItemNames[i].innerText == title) {
       alert('This item is already added to the cart!');
       return;
     }
   }
   let cartRowContents = `
   <div class="cart-row">
       <div class="cart-item cart-column">
           <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
           <span class="cart-item-title">${title}</span>
       </div>
       <span class="cart-price cart-column">${price}</span>
       <div class="cart-quantity cart-column">
           <input class="cart-quantity-input" type="number" value="1">
           <button class="btn btn-danger" type="button">REMOVE</button>
       </div>
   </div>`;
   cartRow.innerHTML = cartRowContents;
   cartItems.append(cartRow);
   cartRow.querySelector('.btn-danger').addEventListener('click',
   removeCartItem);
   cartRow.querySelector('.cart-quantity-input').addEventListener('change',
   quantityChanged);
}


function updateCartTotal() {

  let cartItemContainer = document.querySelector('.cart-items');
  let cartRows = cartItemContainer.getElementsByClassName('cart-row');

  let total = 0;

  for(let i=0;i<cartRows.length;i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.querySelector('.cart-price');
    let quantityElement = cartRow.querySelector('.cart-quantity-input');

    let price = parseFloat(priceElement.innerText.replace('$',''));
    let quantity = quantityElement.value;

    total += price * quantity;

  }

  total = Math.round(total  * 100) / 100;
  document.querySelector('.cart-total-price').innerText = '$' + total;

}
