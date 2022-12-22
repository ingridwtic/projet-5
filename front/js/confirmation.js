const queryString = window.location.search //pour recuperer le queryString des produits
console.log (queryString)
const urlParams = new URLSearchParams(queryString) // paramettre employé dans l'element
console.log (urlParams)
const orderId = urlParams.get("commande") 
console.log(orderId)  
addOrderId(orderId)
removeCatch()


function addOrderId(orderId) {
    const orderElement = document.getElementById("orderId")
    orderElement.textContent = orderId
}

/*function removeCatch(){
    const cache = window.localStorage
    cache.clear()
}*/