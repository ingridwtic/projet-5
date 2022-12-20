
const queryString = window.location.search //pour recuperer le queryString des produits
const urlParams = new URLSearchParams(queryString) // paramettre employé dans l'element
const productId = urlParams.get("id")       //recuperer l'id
if (productId != null){
    let itemPrice = 0
    let image,texte,itemName

}


fetch(`http://localhost:3000/api/products/${productId}`)
.then(res => res.json())
.then (res => addData(res))

function addData(kanap){
   const altTxt = kanap.altTxt
   const colors = kanap.colors
   const description = kanap.description
   const imageUrl = kanap.imageUrl
   image = imageUrl
   texte = altTxt
   const name = kanap.name
   itemName = name
   const price = kanap.price
   itemPrice = price
   const _id = kanap._id
   addImage(imageUrl, altTxt)
   addName(name)
   addPrice(price)
   addDescription(description)
   addColor(colors)
   console.log(kanap)
   
   
}

function addImage (imageUrl,altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const items = document.querySelector(".item__img")
    if(items != null) items.appendChild(image)  //si items est different de null
    }

function addName(name){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function addPrice(price){
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}
function addDescription(description){
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function addColor(colors){
    const select = document.querySelector("#colors")
    if (select != null){
       colors.forEach((color) => {
       const option = document.createElement("option") // creer une option
       option.value = color          // ajouter des valeurs(couleurs)
       option.textContent = color     //ajouter le texte    
       select.appendChild(option)
       }) 
    }

}

const button = document.querySelector("#addToCart")
if(button != null) {
    button.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        if(color == null || color ==="" || quantity == null || quantity == 0){
            alert ("please select a color and quantity")
        }

       
        let cart;
 
        window.location.href = "cart.html"
       saveCart(color,quantity)
    })
}

function saveCart(color,quantity) {
    const bag = {
        id: productId,
        color: color,
        quantity: Number(quantity),// rendre le quantity en number sans les string
        price: itemPrice,
        imageUrl: image,
        altTxt: texte,
        name:itemName
        
    }
    if (localStorage.getItem("cart")== null){ 
        cart = [] 
     }
     else{
        cart = JSON.parse(localStorage.getItem("cart")) // JSON.parse Pour transformer la chaine de caractère en objet
     }
     if( cart.find((item) => item.id === productId && item.color === color)!= null ){
        const modifyProduct = cart.find ((item) => item.id === productId && item.color === color)
        modifyProduct.quantity = Number(quantity) + modifyProduct.quantity
        //modifier la quantité du produit existant
     } else{
        cart.push(bag)
     }
       
     
     
          
            localStorage.setItem("cart", JSON.stringify(cart)) // JSON.STRINGIFY pour transformer un object en chaine de caractère
}
    
    

        
   
            
    
        
   
