
/*const page = document.location.href;
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
      console.log(objetProduits);
      // appel de la fonction 
  })*/
 

storage() ;    //appel de la function



function storage() {

    const cart = JSON.parse(localStorage.getItem("cart"))
    cart.forEach((item) => addItem(item))
    
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

function addSetting(item){
const setting = document.createElement("div")
setting.classList.add("cart__item__content__settings")
addQuantitySetting(setting, item)
return setting
}

function addQuantitySetting(setting,item){
 const quantity = document.createElement("div")
quantity.classList.add("cart__item__content__settings__quantity")
const p2 =document.createElement("p")
p2.textContent = "Qté : " 
const input = document.createElement("input")
input.type = "number"
input.classList.add ("itemQuantity")
input.name = "itemQuantity"
input.min ="1"
input.max = "100"
input.value = item.price

setting.appendChild(input)

}
