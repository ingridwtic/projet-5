
fetch("http://localhost:3000/api/products") 
.then(res =>res.json())
.then((data) => addArticles(data))

function addArticles(data) {

    data.forEach((data) =>{  //add the loop pour fabriquer les elements html de chacun des caapes
      
    const id = data._id
    const imageUrl = data.imageUrl
    const altTxt =data.altTxt
    const name = data.name
    const description = data.description
   

    const image = addImage(imageUrl,altTxt)
    const article = document.createElement("article")

    const link = addlink(id)

    const h3 = addH3(name)
    const p = addWord(description)
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
   appendChildren(link,article)

}) 

}

function addlink(id){
    const link = document.createElement("a")
    link.href = "./product.html?id=" + id
    return link
}

function appendChildren(link,article){
    const items = document.querySelector("#items")
    items.appendChild(link)
    link.appendChild(article)
    

}

function addImage (imageUrl,altTxt){
const image = document.createElement("img")
image.src = imageUrl
image.alt = altTxt
return image
}


function addH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    return h3
}
function addWord(description){
    const p =document.createElement("p")
    p.textContent = description
    return p
}




