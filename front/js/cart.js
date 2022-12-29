const page = document.location.href
//Récupération des produits de l'api et traitement des données
let newCart = [] 

fetch("http://localhost:3000/api/products") // creer une requette via l'Api fetch le http
.then(res =>res.json())   // renvoie de la promesse sous forme de fichier JSON
.then((data) => viewCart(data))  //


function viewCart(data){
    //let newCart = []
    const cart = JSON.parse(localStorage.getItem("cart"))
    if(cart && cart.length != 0){
        cart.forEach((itemCart)=> {
            data.forEach((itemData)=> {
                if(itemData._id === itemCart.id){
                    newCart.push({
                        id : itemCart.id, 
                        name : itemData.name,
                        price : itemData.price,
                        imageUrl : itemData.imageUrl,
                        altTxt : itemData.altTxt,
                        color  : itemCart.color,
                        quantity: itemCart.quantity,
                    })
                }
            })
        })
        const section = document.getElementById("cart__items")
        
        for(let i= 0; i< newCart.length; i++){
            const item =  createArticle(newCart[i])
            section.appendChild(item)
        }
        addTotalQuantity(newCart)
        addTotalPrice(newCart)
       
    }        
      
}

function createArticle(item,cart){
    //creer l'element article
    const article = document.createElement("article") // creer element article
    article.classList.add ("cart__item")  // ajout d'une class cart __item
    article.dataset.id = item.id // data set pour l'ajout des attribut
    article.dataset.color = item.color// data set pour l'ajout de l'attribut color

     //creer l'element image
    const cartItemImg = document.createElement("div")
    cartItemImg.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    cartItemImg.appendChild(image)
    article.appendChild(cartItemImg)
      //creer l'element cart__item__content
    const cartContent = document.createElement("div")
    cartContent.classList.add("cart__item__content")
       //creer l'element description
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
      //creer l'element name
    const title = document.createElement("h2")
    title.textContent = item.name
        //creer l'element color
    const color =document.createElement("p")
    color.textContent = item.color
        //creer l'element price
    const price = document.createElement("p")
    price.textContent = item.price + " €"
      //attribuer des enfants a certains elements creer
    description.appendChild(title)
    description.appendChild(color)
    description.appendChild(price)
    cartContent.appendChild(description)
    article.appendChild(cartContent)
       //creer l'element setting
    const setting = document.createElement("div")
    setting.classList.add("cart__item__content__settings")

       //creer l'element quantité
    const settingQuantity = document.createElement("div")
    settingQuantity.classList.add("cart__item__content__settings__quantity")
    const quantity= document.createElement("p")
    quantity.textContent = "Qté : " 
       //creer l'element input
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add ("itemQuantity")
    input.name = "itemQuantity"
    input.min ="1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input",(e) => AddChangeQuantity(e,item.id,item.color,input.value) )
    settingQuantity.appendChild(quantity)
    settingQuantity.appendChild(input)
    setting.appendChild(settingQuantity)
       //creer l'element delete
    const deleteInput = document.createElement("div")
    deleteInput.classList.add("cart__item__content__settings__delete")
    deleteInput.addEventListener("click", () => removeItem(item))   // ajouter un evenement au click

    const textInput = document.createElement("p")
    textInput.classList.add("deleteItem")
    textInput.textContent ="Supprimer"
    deleteInput.appendChild(textInput)
    setting.appendChild(deleteInput)
    cartContent.appendChild(setting)

    return article    

}



//ajout du prix total
function addTotalPrice(cart){
    
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total,item) => total + item.price * Number(item.quantity),0)//function reduce pour transformer l'array en une seule valeur
    totalPrice.textContent = total 
    console.log(cart)
    console.log(total)                // la valeur initiale de total est de 0
    }
    //ajout de la quantité total
    function addTotalQuantity(cart) {
     const totalQuantity = document.querySelector("#totalQuantity")
     const total = cart.reduce((total,item) => total +  item.quantity,0)//louper pour prendre quantity
    totalQuantity.textContent = total     
    }
    //modifier la quantité dans le panier

    const cart = JSON.parse(localStorage.getItem("cart"))

 function AddChangeQuantity(event,id,color){
    const changeQuantityBaseCart = cart.find((item) => item.id === id && item.color === color )
    const changeQuantityNewCart = newCart.find((item) => item.id === id && item.color === color )
    changeQuantityBaseCart.quantity = Number(event.target.value)
    changeQuantityNewCart.quantity = Number(event.target.value)
    saveNewCart(cart)
    addTotalQuantity(cart)
    addTotalPrice(newCart)

    }
    //modifier la quantité dans le localStorage
 function saveNewCart(cart){
        const newCart = JSON.stringify(cart)
        localStorage.setItem("cart", newCart )
    }
    // Ajouter un delete

function removeItem(item){
        const removeBaseCart = cart.findIndex ((product) => product.id === item.id && product.color === item.color)// findIndex pour trouver l'index du produit à supprimer
        const removeNewCart = newCart.findIndex ((product) => product.id === item.id && product.color === item.color)
    cart.splice(removeBaseCart, 1) // supprimer un objet à l'item remove puis retirer 1 de la consolez
    newCart.splice(removeNewCart, 1)
    addTotalQuantity(cart)
    addTotalPrice(newCart)
    deletePageProduct(item)
    saveNewCart(cart)
    console.log("item to delete",remove)
    
    }

    // suprimer un article de la page
 function deletePageProduct(item){
    const deleteProduct = document.querySelector(`article[data-id = "${item.id}"][data-color = "${item.color}"] `)
    deleteProduct.remove()
    console.log(deletePageProduct)
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
    
    if (firstName.value == "") {
        alert("Mettez votre adresse.");
        firstName.focus();
        return false;
      }
    if (lastName.value == "") {
        alert("Mettez votre nom.");
        lastName.focus();
        return false;
      }
    if (address.value == "") {
        alert("Mettez votre adresse.");
        address.focus();
        return false;
      }
      if (city.value == "") {
        alert("Mettez votre adresse.");
        city.focus();
        return false;
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
      window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
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


