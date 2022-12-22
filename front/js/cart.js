
//Récupération des produits de l'api et traitement des données
/*fetch(`http://localhost:3000/api/products/${productId}`)  // creer une requette via l'Api fetch pour avoir l'id du produit
.then(res => res.json())
.then (res => addData(res))*/



 

storage() ;    //appel de la function

const cart = JSON.parse(localStorage.getItem("cart"))
cart.forEach((item) => addItem(item))



function storage() {

   
    
}

function addItem(item) {
    
    const article = addArticle(item)
    selectArticle(article)
    console.log(article)
    const image = addImage(item)
    article.appendChild(image)
    const cartContent = addCartContent(item)
    article.appendChild(cartContent)
   console.log(article)
   addTotalQuantity(item)
   addTotalPrice()
}


function addCartContent(item){

 const cartContent = document.createElement("div")
 cartContent.classList.add("cart__item__content")
     
 const description = addDescription(item) 
 const setting = addSetting(item) 

cartContent.appendChild(description)
cartContent.appendChild(setting)

return cartContent
}

function selectArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}

function addArticle(item){

    const article = document.createElement("article") // creer element article
    article.classList.add ("cart__item")  // ajout d'une class cart __item
    article.dataset.id = item.id // data set pour l'ajout des attribut
    article.dataset.color = item.color// data set pour l'ajout de l'attribut color
    return article
}

function addImage (item){
   const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    
   return div
}

function addDescription(item){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p =document.createElement("p")
    p.textContent = item.color
    const p1 = document.createElement("p")
    p1.textContent = item.price + " €"
   description.appendChild(p)
   description.appendChild(h2)
   description.appendChild(p1)
    return description
}
//ajouter un setting
function addSetting(item){
const setting = document.createElement("div")
setting.classList.add("cart__item__content__settings")
addQuantitySetting(setting, item)
addDeleteSetting(setting, item)
return setting
}
//ajouter une quantité
function addQuantitySetting(setting,item){
 const quantity = document.createElement("div")
quantity.classList.add("cart__item__content__settings__quantity")
const p2 = document.createElement("p")
p2.textContent = "Qté : " 
quantity.appendChild(p2)
const input = document.createElement("input")
input.type = "number"
input.classList.add ("itemQuantity")
input.name = "itemQuantity"
input.min ="1"
input.max = "100"
input.value = item.quantity
input.addEventListener("input",() => AddChangeQuantity(item.id, item.color,input.value, item) )
quantity.appendChild(input)
setting.appendChild(quantity)


}

//ajout du prix total
function addTotalPrice(){
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total,item) => total + item.price * item.quantity,0)//function reduce pour transformer l'array en une seule valeur
    totalPrice.textContent = total                 // la valeur initiale de total est de 0
    }
    //ajout de la quantité total
    function addTotalQuantity(item) {
     const totalQuantity = document.querySelector("#totalQuantity")
     const total = cart.reduce((total,item) => total +  item.quantity,0)//louper pour prendre quantity
    totalQuantity.textContent = total     
    }
//modifier la quantité dans le panier
function AddChangeQuantity(id,color,newValue,item){
const changeQuantity = cart.find((item) => item.id === id && item.color === color )
changeQuantity.quantity = Number(newValue)
addTotalQuantity()
addTotalPrice()
saveNewCart(cart)
}
//modifier la quantité dans le localStorage
function saveNewCart(cart){
    const newCart = JSON.stringify(cart)
     localStorage.setItem("cart", newCart )
}
// Ajouter un delete
function addDeleteSetting(setting, item){
    const delette = document.createElement("div")
    delette.classList.add("cart__item__content__settings__delete")
    delette.addEventListener("click", () => removeItem (item))

    const p3 = document.createElement("p")
    p3.classList.add("deleteItem")
    p3.textContent ="Supprimer"
    setting.appendChild(delette)
    delette.appendChild(p3)
    console.log(delette)
}

function removeItem(item){
    const remove = cart.findIndex ((product) => product.id === item.id && product.color === item.color)// findIndex pour trouver l'index du produit à supprimer
   cart.splice(remove, 1) // supprimer un objet à l'item remove puis retirer 1 de la console
   addTotalQuantity()
   addTotalPrice()
   saveNewCart(cart)
   deletePageProduct(item)
   console.log("item to delete",remove)
   
}



// suprimer un article de la page
function deletePageProduct(item){
 const deleteProduct = document.querySelector(`article[data-id = "${item.id}"][data-color = "${item.color}"] `)
 deleteProduct.remove()
}

//ajout du formulaire

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click",(e) => submitForm(e))

function submitForm(e){
    e.preventDefault()
    if (cart.length === 0) {
        alert ("Please select items to buy") // si le cart est vide envoyer une alerte
        return
    }
   if (invalidForm()) return
    if (invalidEmail()) return  
    const body = addForm()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
          "Content-Type": "application/json"
        }
       
      })
        .then((res) => res.json())
        .then((data) => {
        // envoyé à la page confirmation, autre écriture de la valeur "./confirmation.html?commande=${data.orderId}"
      //window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
      })
      .catch(function (err) {
        console.log(err);
        alert("erreur");
      });
}

function addForm(){
    const form = document.querySelector(".cart__order__form") 

    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
    contact: {
           firstName: firstName,
          lastName: lastName,
          address:address,
           city: city,
           email: email
        },
         products:getIdCache()
}
console.log (body)
return body
}

function getIdCache(){
    const ids = []
    const panier = JSON.parse(localStorage.getItem ("cart"))
    
    const numberProducts = panier.length
    for ( let i= 0; i< numberProducts; i++){
        const product = panier[i];
        ids.push(product.id)
    }

    return ids;
  
}

function invalidForm(){
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input") //rapporter la liste de tout les inputs
    inputs.forEach ((input) => {
        if(input.value === ""){           // si la value est nulle
            alert("please fill all the fieds ")  //alert
         return  true                              //arretes toi
        }
        else{
            return false
        }
    })
}

function invalidEmail(){
    const email = document.querySelector("#email").value // afficher la valeur de l'email
    const regex =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //validation de l'adresse email
        if(regex.test(email) === false){           // si la value est nulle
            alert("please enter valid email")  //alert
         return  true                              //arretes toi
        }
        else{
            return false
        }
    
}