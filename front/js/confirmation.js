const queryString = window.location.search //pour recuperer le queryString des produits
const urlParams = new URLSearchParams(queryString) // paramettre employé dans l'element
const orderId = urlParams.get("commande")  
addOrderId(orderId)
removeCatch()


function addOrderId(orderId) {
    const orderElement = document.getElementById("orderId")
    orderElement.textContent = orderId
}
// Supprimer du localStorage
function removeCatch() {
    const cache = window.localStorage
    cache.clear()
}