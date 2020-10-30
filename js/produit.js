/* Récuperation des éléments du produit sélectionné */

async function productPage() {
  const chosenProduct = await getAllProducts();

  /* Récupération de l'ID du produit dans le lien */
  chosenProductId = location.search.substring(1);

  /* Chaque élement que l'on souhaite récupérer doit correspondre à l'ID du produit sélectionné */
  let productName = chosenProduct.find(element => {
    return element._id === chosenProductId;
  }).name;
  document.getElementById('product-name').innerHTML = productName;

  let productImg = chosenProduct.find(element => {
    return element._id === chosenProductId;
  }).imageUrl;
  document.getElementById('product-img').setAttribute('src', productImg);

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

  /* Intégration des options de choix du vernis correspondant au produit dans la liste d'option <select> */
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

/* Initialisation du localStorage pour stocker les produits ajoutés au panier de l'utilisateur */

if (localStorage.getItem('products')) {
  cartStorage = JSON.parse(localStorage.getItem('products'));
}
else {
  let cartStorage = [];
  localStorage.setItem('products', JSON.stringify(cartStorage));
};

let userStorage = JSON.parse(localStorage.getItem('products'));

/* Récuperation des boutons depuis HTML */
const addToCartButtons = document.getElementsByClassName('btn-cart');
const goToCartBtn = document.getElementById('go-to-cart');

/* Au clic sur un des boutons, le produit s'ajoute au localStorage */
function addToCart() {
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', function (e) {
      cartStorage.push({ '_id': chosenProductId, 'imageUrl': chosenProductImg, 'name': chosenProductName, 'description': chosenProductDescription, 'price': chosenProductPrice });
      localStorage.setItem('products', JSON.stringify(cartStorage));
      alert('Produit ajouté au panier !');
    });
  };
  /* Le bouton "achetez-maintenant" redirige également l'utilisateur vers la page panier */
  goToCartBtn.addEventListener('click', function (e) {
    window.open("/panier.html")
  });
};

