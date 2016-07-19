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
      cartItem.count +=count;
    }
    else {
      let item = allItems.find((item)=> item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }
  return cartItems;
}
