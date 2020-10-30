/* Appel API */

function getAllProducts() {
	return new Promise(function (resolve) {
		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				resolve(JSON.parse(this.responseText));
			}
		}
		request.open("GET", "http://localhost:3000/api/furniture");
		request.send();
	});
};

/* Boucle de création d'éléments HTML pour permettre l'affichage des produits récupérés avec l'API */

async function productLoop() {
	const products = await getAllProducts();

	/* Pour chaque produit dans le tableau, une carte produit se créer */

	products.forEach(function (product) {

		/* Récupération de la liste contenu dans la page HTML */
		const productList = document.getElementById('products-list');

		/* Création de l'élement produit dans liste */
		const productCard = document.createElement('li');
		productList.appendChild(productCard);
		productCard.setAttribute('class', 'list-group-item');

		/* Ligne produit unique */
		const productRow = document.createElement('div');
		productCard.appendChild(productRow);
		productRow.setAttribute('class', 'product-row media align-items-lg-center flex-column flex-lg-row p-3');

		/* Conteneur des infos produits */
		const productRowFeatures = document.createElement('div');
		productRow.appendChild(productRowFeatures);
		productRowFeatures.setAttribute('class', 'product-features media-body order-2 order-lg-1');

		/* Nom du produit */
		const productName = document.createElement('h5');
		productRowFeatures.appendChild(productName);
		productName.setAttribute('class', 'mt-0 font-weight-bold mb-2');

		/* Description du produit */
		const productDescription = document.createElement('p');
		productRowFeatures.appendChild(productDescription);
		productDescription.setAttribute('class', 'font-italic text-muted mb-0 small');

		/* Conteneur prix */
		const productForPrice = document.createElement('div');
		productRowFeatures.appendChild(productForPrice);
		productForPrice.setAttribute('class', 'align-items-center mt-1');

		/* Prix du produit */
		const productPrice = document.createElement('h6');
		productForPrice.appendChild(productPrice);
		productPrice.setAttribute('class', 'font-weight-bold my-2');

		const productForLink = document.createElement('div');
		productRowFeatures.appendChild(productForLink);
		productForLink.setAttribute('class', 'product-btn')


		/* Lien vers la page "vue produit" sous forme de bouton */
		const productLink = document.createElement('a');
		productForLink.appendChild(productLink);
		Object.assign(productLink, {
			href: `produit.html?${product._id}`,
			className: 'btn btn-primary'
		});

		/* Image du produit */
		const productImage = document.createElement('img');
		productRow.appendChild(productImage);
		Object.assign(productImage, {
			className: 'ml-lg-5 order-1 order-lg-2 center-md',
			src: product.imageUrl,
		});

		/* Integration des valeurs descriptives pour chaque produit */
		productDescription.textContent = product.description;
		productName.textContent = product.name;
		productPrice.textContent = product.price / 100 + ' €';
		productLink.textContent = 'Voir le produit';
	});
};

