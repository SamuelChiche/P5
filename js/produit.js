
async function productPage(){

    productId = location.search.substring(1);
    const chosenProduct = await getAllProducts();
    console.log(productId);
    
    let productName = chosenProduct.find(element => {
        return element._id === productId;
      }).name;
    document.getElementById('product-name').innerHTML = productName;

    let productImg = chosenProduct.find(element => {
      return element._id === productId;
    }).imageUrl;
    document.getElementById('product-img').setAttribute('src',productImg);

    let productPrice = chosenProduct.find(element => {
      return element._id === productId;
    }).price;
    document.getElementById('product-price').innerHTML = `${productPrice / 100}€`;

    let productDescription = chosenProduct.find(element => {
      return element._id === productId;
    }).description;
    document.getElementById('product-description').innerHTML = productDescription;

    let productArray = chosenProduct.find(element => {
      return element._id === productId;
    }).varnish;

    console.log(productArray);
    
    productArray.forEach(option => {
      let productOption = document.createElement('option');
      document.getElementById('varnish-select').appendChild(productOption);
      productOption.innerHTML = option;
    });    
};
