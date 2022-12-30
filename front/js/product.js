
const queryString = window.location.search // Acceder à la chaine de requette
const urlParams = new URLSearchParams(queryString) // paramettre employé dans l'element
const productId = urlParams.get("id")       //Renvoyer le paramettre id ou recuperer l'id


    //Récupération des produits de l'api et traitement des données
fetch(`http://localhost:3000/api/products/${productId}`)  // creer une requette via l'Api fetch pour avoir l'id du produit
.then(res => res.json())
.then (res => addData(res))
    //Ajout des articles à la page de produits
function addData(kanap) {
    const altTxt = kanap.altTxt
    const colors = kanap.colors
    const description = kanap.description // afficher l'Url de chaque element de la description
    const imageUrl = kanap.imageUrl // afficher l'Url de chaque element de l'image
    image = imageUrl
    texte = altTxt
    const name = kanap.name // afficher l'Url de chaque element de name
    const price = kanap.price
    const _id = kanap._id
    addImage(imageUrl, altTxt)
    addName(name)  //Appeler la fonction addName avec pour valeur (name)
    addPrice(price)
    addDescription(description)//Appeler la fonction addDescription avec pour valeur (description)
    addColor(colors)
}

function addImage (imageUrl,altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl   //ajouter l'image à l'element img dans src
    image.alt = altTxt     //ajouter le alttexte  à l'element img dans alt 
    const items = document.querySelector(".item__img")
    if(items != null) items.appendChild(image)  //si items est different de null
}

function addName(name) {
    const h1 = document.querySelector("#title") // selectionner la div title
    if (h1 != null) h1.textContent = name // Ajouter du texte à l'element h1 qui sera le name contenu dans les données recuperer dans l'Api
}

function addPrice(price) {
    const span = document.querySelector("#price") // selectionner la div title
    if (span != null) span.textContent = price  //si span est diffferent de null,Ajouter du texte à l'element span qui sera le name contenu dans price
}
function addDescription(description){
    const p = document.querySelector("#description") 
    if (p != null) p.textContent = description
}

function addColor(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach((color) => {     // faire une boucle sur chaque couleur
            const option = document.createElement("option") // creer une option
            option.value = color          // ajouter des valeurs(couleurs)
            option.textContent = color     //ajouter le texte    
            select.appendChild(option)   // imbriquer l'element option dans select
        }) 
    }
}
    //ajout du boutton ajouter au panier
const button = document.querySelector("#addToCart") // selectionner la div title
if(button != null) {
    button.addEventListener("click", (e) => {  // ecouter l'evenement click et faire l'action ci-dessous
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value //renvoie un tableau dont les valeurs des propriétés énumérables sont directement rattachées à la div quantity
        if(color == null || color ==="" || quantity == null || quantity == 0){ // si au moins un de ses elements est vrai, renvoyer une alerte
            alert ("please select a color and quantity")
        }


        let cart;

        window.location.href = "cart.html" // mettre un lien entre product.js et
        saveCart(color,quantity)
    })
}

//Enregistrer les produits dans le localStorage
function saveCart(color,quantity) {
    const bag = {
        id: productId,
        color: color,
        quantity: Number(quantity),// rendre le quantity en number sans les string
        
    }
    if (localStorage.getItem("cart")== null){  // si localStorage = null afficher un tableau vide
        cart = [] 
    }
    else{
        cart = JSON.parse(localStorage.getItem("cart")) // JSON.parse Pour transformer la chaine de caractère en objet
    }
    if( cart.find((item) => item.id === productId && item.color === color)!= null ){
        const modifyProduct = cart.find ((item) => item.id === productId && item.color === color) // trouver le produit qui a le mêmr id et la meme couleur
        modifyProduct.quantity = Number(quantity) + modifyProduct.quantity
        //modifier la quantité du produit existant
    } else{
        cart.push(bag)   // montrer les produits
    }


    localStorage.setItem("cart", JSON.stringify(cart)) // JSON.STRINGIFY pour transformer un object en chaine de caractère
}

