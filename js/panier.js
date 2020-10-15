function addProduct(){
  let products = [];
  if(localStorage.getItem('products')){
      products = JSON.parse(localStorage.getItem('products'));
  }
  products.push({'_id' : chosenProductId, 'imageUrl' : chosenProductImg, 'name' : chosenProductName, 'price' : chosenProductPrice});
  localStorage.setItem('products', JSON.stringify(products));
};

function productCart() {
    const shoppingCart = document.getElementById('shopping-cart');

    JSON.parse(localStorage.getItem('products')).forEach(function (product){
    
        const productCartTable = document.createElement('div');
        const productCartImg = document.createElement('img');
        const productCartName = document.createElement('h5');
        const productCartDescription = document.createElement('p');
        const productCartPrice = document.createElement('h6');
        const productCartTotalPrice = document.createElement('h4');

        shoppingCart.appendChild(productCartTable);
        productCartTable.appendChild(productCartImg);
        productCartTable.appendChild(productCartName);
        productCartTable.appendChild(productCartDescription);
        productCartTable.appendChild(productCartPrice);

        productCartName.textContent = product.name;
        productCartPrice.textContent = product.price;
        
        productCartImg.setAttribute('src', product.imageUrl);
    });
};


/*function formChecker(){

    const lastName = document.getElementById('last-name').value;
    const firstName = document.getElementById('first-name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    
    const regexAddress = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    const regexWord = /^[A-Za-zÀ-ÖØ-öø-ÿ]+/;
    const regexDigit = /[0-9]/;
    
    const lastNameCheck = regexWord.test(lastName);
    const fistNameCheck = regexWord.test(firstName);
    const addressCheck = regexAddress.test(address);

    if(lastNameCheck == false)
    {
         alert('Entrer un Nom valide');
        return false;
    }
    if(fistNameCheck == false)
    {
        alert('Entrer un Prénom Valide');
        return false;
    }
    if(addressCheck == false)
    {
        alert('Entrer une Adresse valide');
        return false;
    }
        return true;

};*/

