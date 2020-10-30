function resultOrder() {
  if (sessionStorage.getItem('order') != null) {
    /* Récupération des infos pour affichage info utilisateurs depuis le sessionStorage */
    let order = JSON.parse(sessionStorage.getItem('order'));
    let totalPrice = JSON.parse(sessionStorage.getItem('totalprice'))
    /* Intégration dans la page HTML */
    document.getElementById('last-name').innerHTML = order.contact.lastName;
    document.getElementById('order-id').innerHTML = order.orderId;
    document.getElementById('price-paid').innerHTML = totalPrice + "€";
    document.getElementById('address').innerHTML = order.contact.address;
    document.getElementById('city').innerHTML = order.contact.city;
    document.getElementById('email').innerHTML = order.contact.email;
    /* Suppression des élements du sessionStorage */
    sessionStorage.removeItem("order");
    sessionStorage.removeItem("price-paid");
  } else {
    alert("La page que vous souhaitez charger n'existe plus");
    window.open("/index.html");
    window.close();
  }
};