/* Appel API */

function getAllProducts() {
	return new Promise(function (resolve){
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
                resolve (JSON.parse(this.responseText));
			}
		}
		request.open("GET", "http://localhost:3000/api/furniture");
		request.send();
	});
};

getAllProducts('story.json').then(function(response) {
    console.log("Success!", response);
  }, function(error) {
    console.error("Failed!", error);
});

/* Boucle de création d'éléments HTML pour permettre l'affichage des produits */

async function productLoop(){
	const products = await getAllProducts();
	
	products.forEach(function (product){
		const productCard = document.createElement('li');
		
		const list = document.getElementById('products-list');
		list.appendChild(productCard);
		productCard.setAttribute('class','list-group-item');

		const productRow = document.createElement('div');
		productCard.appendChild(productRow);
		productRow.setAttribute('class', 'media align-items-lg-center flex-column flex-lg-row p-3');

		const productRowFeatures = document.createElement('div');
		productRow.appendChild(productRowFeatures);
		productRowFeatures.setAttribute('class', 'media-body order-2 order-lg-1');

		const productName = document.createElement('h5');
		productRowFeatures.appendChild(productName);
		productName.setAttribute('class', 'mt-0 font-weight-bold mb-2');

		const productDescription = document.createElement('p');
		productRowFeatures.appendChild(productDescription);
		productDescription.setAttribute('class', 'font-italic text-muted mb-0 small');

		const productForPrice = document.createElement('div');
		productRowFeatures.appendChild(productForPrice);
		productForPrice.setAttribute('class','d-flex align-items-center justify-content-between mt-1');

		const productPrice = document.createElement('h6');
		productForPrice.appendChild(productPrice);
		productPrice.setAttribute('class','font-weight-bold my-2');
		
		const productLink = document.createElement('a');
		productForPrice.appendChild(productLink);
		Object.assign(productLink, {
			href : `produit.html?${product._id}`,
			className : 'btn btn-primary'
		});
		
		const productImage = document.createElement('img');
		productRow.appendChild(productImage);
		Object.assign(productImage, {
			className : 'ml-lg-5 order-1 order-lg-2',
			src : product.imageUrl,
		});
		
		productDescription.textContent = product.description;
		productName.textContent = product.name;
		productPrice.textContent = product.price / 100 + ' €';
		productLink.textContent = 'Voir le produit';
	});
};

