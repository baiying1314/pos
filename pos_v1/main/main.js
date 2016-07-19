'use strict';
let buildCartItems = (inputs)=> {
  let cartItems = [];
  let allItems = loadAllItems();

  for (let input  of inputs) {
    let splitInput = input.split("-");
    let barcode = splitInput[0];
    let count = parseFloat(splitInput[1] || 1);

    let cartItem = cartItems.find((cartItem)=>cartItem.item.barcode === barcode);
    if (cartItem) {
      cartItem.count += count;
    }
    else {
      let item = allItems.find((item)=> item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }
  return cartItems;
}


let buildItemsSubtotal = (cartItems)=> {
  return cartItems.map(cartItem=> {
    let promotionType = getPromotionType(cartItem);
    let {subtotal, saved} = discount(cartItem, promotionType);
    return {cartItem, subtotal, saved};
  })
}

let getPromotionType = (cartItem)=> {
  let promotions = loadPromotions();
  let promotion = promotions.find((promotion)=>promotion.barcodes.includes(cartItem.item.barcode));

  return promotion ? promotion.type : " ";
}

let discount = (cartItem, promotionType)=> {
  let freeItemCount = 0;

  if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
    freeItemCount = parseInt(cartItem.count / 3);
  }
  let saved = cartItem.item.price * freeItemCount;
  let subtotal = cartItem.item.price * (cartItem.count - freeItemCount);

  return {subtotal, saved};
}


