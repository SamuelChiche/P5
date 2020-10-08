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

async function productLoop(){
	const products = await getAllProducts();
	
	products.forEach(function (product){
		const productCard = document.createElement('article');
		
		const list = document.getElementById('products-list');
		list.appendChild(productCard);
		productCard.setAttribute('class','card row');
		
		const productLink = document.createElement('a');
		productCard.appendChild(productLink);
		productLink.setAttribute('href', `produit.html?${product._id}`);
		productLink.setAttribute('class', 'row');
		
		const leftPart = document.createElement('div');
		productLink.appendChild(leftPart);
		leftPart.setAttribute('class', 'col-6');
		
		const rightPart = document.createElement('div');
		productLink.appendChild(rightPart);
		rightPart.setAttribute('class', 'right-part-card col-6');
		
		const productImage = document.createElement('img');
		leftPart.appendChild(productImage);
		productImage.setAttribute('src', product.imageUrl);
		
		const productName = document.createElement('h4');
		rightPart.appendChild(productName);
		productName.setAttribute('class','products-list-names');
		
		const productPrice = document.createElement('p');
		rightPart.appendChild(productPrice);
		productPrice.setAttribute('class', 'products-list-prices');
		
		productName.textContent = product.name;
		productPrice.textContent = product.price / 100 + ' €';
		console.log(product.varnish);
	});
};

