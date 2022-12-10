
fetch("http://localhost:3000/api/products") // creer une requette via l'Api fetch le http
.then(res =>res.json())   // renvoie de la promesse
.then((data) => addArticles(data))

function addArticles(sofa) {

    sofa.forEach((sofa) =>{  //add the loop pour fabriquer les elements html de chacun des caapes
      
    const id = sofa._id
    const imageUrl = sofa.imageUrl
    const altTxt =sofa.altTxt
    const name = sofa.name
    const description = sofa.description
   

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




