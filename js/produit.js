async function productPage(){
    const chosenProduct = await getAllProducts();
    chosenProductId = location.search.substring(1);
    
    let productName = chosenProduct.find(element => {
        return element._id === chosenProductId;
      }).name;
    document.getElementById('product-name').innerHTML = productName;

    let productImg = chosenProduct.find(element => {
      return element._id === chosenProductId;
    }).imageUrl;
    document.getElementById('product-img').setAttribute('src',productImg);

    let productPrice = chosenProduct.find(element => {
      return element._id === chosenProductId;
    }).price;
    document.getElementById('product-price').innerHTML = `${productPrice / 100}€`;

    let productDescription = chosenProduct.find(element => {
      return element._id === chosenProductId;
    }).description;
    document.getElementById('product-description').innerHTML = productDescription;

    let productVarnish = chosenProduct.find(element => {
      return element._id === chosenProductId;
    }).varnish;
    
    productVarnish.forEach(option => {
      let productVarnishOption = document.createElement('option');
      document.getElementById('varnish-select').appendChild(productVarnishOption);
      productVarnishOption.innerHTML = option;
    });
    
    chosenProductImg = productImg;
    chosenProductName = productName;
    chosenProductPrice = productPrice;
    chosenProductDescription = productDescription;
};

const addToCartButton = document.getElementById('btn-cart');

addToCartButton.addEventListener('click', function(e){
  addProduct();
  alert('Produit ajouté au panier !');
});