/* Création page panier */
function productCart() {
    /* Si le local storage de l'utilisateur n'est pas vide on supprime le message "panier vide"*/
    if (userStorage.length > 0) {
        document.getElementById('empty-cart').remove();

        /*Récupération du tableau depuis HTML*/
        const shoppingCart = document.getElementById('shopping-cart-table');

        /* Init de l'itération pour l'id du conteneur produit */
        let i = 0;

        /*Pour chaque produit contenu dans le localStorage, on créer l'objet dans le panier*/
        cartStorage.forEach(function (product) {

            /* Conteneur */
            const productCartTable = document.createElement('div');
            shoppingCart.appendChild(productCartTable);
            Object.assign(productCartTable, {
                className: 'card-body',
                id: 'produit' + i,
            });

            /* Ligne produit */
            const productTableRow = document.createElement('div');
            productCartTable.appendChild(productTableRow);
            productTableRow.setAttribute('class', 'row product-table');

            /* Colonne image */
            const productImgFrameCol = document.createElement('div');
            productTableRow.appendChild(productImgFrameCol);
            productImgFrameCol.setAttribute('class', 'col-12 col-sm-12 col-md-2 text-center');

            /* Intégration image */
            const productImgCol = document.createElement('img');
            productImgFrameCol.appendChild(productImgCol);
            Object.assign(productImgCol, {
                className: 'img-responsive',
                src: product.imageUrl,
            });

            /* Colonne caractèristiques produit */
            const productFeaturesCol = document.createElement('div');
            productTableRow.appendChild(productFeaturesCol);
            productFeaturesCol.setAttribute('class', 'col-12 text-sm-center col-sm-12 text-md-left col-md-6');

            /* Nom du produit */
            const productRowName = document.createElement('h4');
            productFeaturesCol.appendChild(productRowName);
            productRowName.setAttribute('class', 'product-cart-name font-weight-bold');

            /* Description du produit */
            const productRowDescription = document.createElement('h4');
            productFeaturesCol.appendChild(productRowDescription);
            productRowDescription.setAttribute('class', 'font-italic text-muted mb-0 small');

            /* Colonne de droite */
            const productRightCol = document.createElement('div');
            productTableRow.appendChild(productRightCol);
            productRightCol.setAttribute('class', 'col-12 col-sm-12 text-sm-center col-md-4 text-md-right row product-right-part');

            /* Colonne prix*/
            const productPriceCol = document.createElement('div');
            productRightCol.appendChild(productPriceCol);
            productPriceCol.setAttribute('class', 'col-3 col-sm-3 col-md-6 text-md-right product-price');

            /* Prix du produit */
            const productRowPrice = document.createElement('h6');
            productPriceCol.appendChild(productRowPrice);
            productRowPrice.setAttribute('class', 'font-weight-bold');

            /* Colonne quantité */
            const productQuantityCol = document.createElement('div');
            productRightCol.appendChild(productQuantityCol);
            productQuantityCol.setAttribute('class', 'col-4 col-sm-4 col-md-4')

            /* Quantité de produit "non fonctionnel"*/
            const productRowQuantity = document.createElement('input');
            productQuantityCol.appendChild(productRowQuantity);
            Object.assign(productRowQuantity, {
                className: 'quantity',
                type: 'number',
                step: '1',
                max: '99',
                min: '1',
                value: '1'
            });

            /* Colonne bouton de supression */
            const productDeleteButtonCol = document.createElement('div');
            productRightCol.appendChild(productDeleteButtonCol);
            productDeleteButtonCol.setAttribute('class', 'col-2 col-sm-2 col-md-2 text-right delete-button');

            /* Bouton supression du produit */
            const productDeleteButton = document.createElement('button');
            productDeleteButtonCol.appendChild(productDeleteButton);
            Object.assign(productDeleteButton, {
                className: 'btn btn-outline-danger btn-xs',
                type: 'button',
                id: 'remove' + i
            });

            /* Au clic sur le bouton la fonction "deletProduct" s'execute */
            productDeleteButton.addEventListener('click', deleteProduct.bind(i));

            /* Intégration de l'icone */
            const productDeleteIcon = document.createElement('i');
            productDeleteButton.appendChild(productDeleteIcon);
            productDeleteIcon.setAttribute('class', 'fa fa-trash');

            /* Ligne séparatrice entre chaque produit */
            const productHr = document.createElement('div');
            shoppingCart.appendChild(productHr);
            const productHrEnd = document.createElement('hr');
            productHr.appendChild(productHrEnd);

            /* Intégration des valeurs */
            productRowName.textContent = product.name;
            productRowDescription.textContent = product.description;
            productRowPrice.textContent = product.price / 100 + '€';

            /* Incrémentation de l'itération */
            i++;
        });

        /* Calcul prix total */
        let totalPrice = 0
        userStorage.forEach((product) => {
            totalPrice += product.price / 100;
        });

        /* Intégration prix total */
        document.getElementById('total-price').textContent = totalPrice + "€";
    }
};

/* Supression du produit dans le panier et le localStorage*/
function deleteProduct(i) {
    cartStorage.splice(i, 1);
    localStorage.clear();
    localStorage.setItem('products', JSON.stringify(cartStorage));
    window.location.reload();
};

/* Vérification du contenu du localStorage */
function cartChecker() {
    if (userStorage == null) {
        return false;
    }
    else if (userStorage.length < 1 || userStorage == null) {
        return false;
    }
    else {
        userStorage.forEach((product) => {
            products.push(product._id);
        });
        return true;
    }
};

/* Récupération des valeurs du formulaire pour creér l'object contact */
function formChecker() {

    let formLastName = document.getElementById('last-name').value;
    let formFirstName = document.getElementById('first-name').value;
    let formEmail = document.getElementById('email').value;
    let formAddress = document.getElementById('address').value;
    let formCity = document.getElementById('city').value;

    contact = {
        firstName: formFirstName,
        lastName: formLastName,
        address: formAddress,
        city: formCity,
        email: formEmail,
    }
};

/* Préparation des données à envoyer au serveur */
let contact;
let products = [];
let totalPrices = 0;


/* Préparation de l'API pour envoi */
function sendData(orderDataRequest) {
    return new Promise(function (resolve) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                resolve(JSON.parse(this.responseText));
                /* Stockage des valeurs nécessaires pour la page de confirmation dans le sessionStorage */
                sessionStorage.setItem("order", this.responseText);
                sessionStorage.setItem("totalprice", totalPrices);
                window.location = "/confirmation.html";
            }
            else{
            }
        }
        request.open("POST", "http://localhost:3000/api/furniture/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(orderDataRequest);
    });
};

/* Si les données correspondent à l'objet demandé par le serveur, au clic le bouton "Valider ma commande" on envoie les données à l'API */
function orderConfirm() {
    let formConfirm = document.getElementById('orderForm');
    formConfirm.addEventListener("submit", function (event) {
        event.preventDefault();
        formChecker();
        if (cartChecker() == true) {
            userStorage.forEach((product) => {
                totalPrices += product.price / 100;
            });
            let data = {
                contact,
                products
            };
            let orderDataRequest = JSON.stringify(data);
            sendData(orderDataRequest);
            contact = {};
            products = [];
            localStorage.clear();
        }
        else {
            alert('Votre panier est vide')
        }
    });
};
