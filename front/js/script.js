    // Recuperation des produits de l'API
fetch("http://localhost:3000/api/products") // creer une requette via l'Api fetch le http
.then(res =>res.json())   // renvoie de la promesse sous forme de fichier JSON
.then((data) => addArticles(data))  // La reponse  recu et traité en json sera appelée data

    //Affichage des produits de l'API
function addArticles(sofa) {      //creation d'une fonction AddArticle

    sofa.forEach((sofa) =>{  //Bouclez sur  chaque element des canapés avec une forEach

        const id = sofa._id         
        const imageUrl = sofa.imageUrl  // afficher l'Url de chaque element de l'image
        const altTxt =sofa.altTxt
        const name = sofa.name
        const description = sofa.description // afficher l'Url de chaque element de la description

        const image = addImage(imageUrl,altTxt)
        const article = document.createElement("article")  // creation de l'element article

        const link = addlink(id)

        const h3 = addH3(name)
        const p = addWord(description)
        article.appendChild(image)        // article a pour enfant image
        article.appendChild(h3)
        article.appendChild(p)            // imbriquer l'element p dans article
        appendChildren(link,article)      //Appeler la fonction appenChildren avec pour valeur (link, article)
    }) 

}

function addlink(id) {
    const link = document.createElement("a")
    link.href = "./product.html?id=" + id   //ajouter l'id à l'element a dans href
    return link                            // retourner link
}

function appendChildren(link,article) {
    const items = document.querySelector("#items") // selectionner le document contenant la div items
    items.appendChild(link)                        // items a pour enfant link
    link.appendChild(article)                     // link contenu dans items a pour enfant article
    

}

function addImage (imageUrl,altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl             //ajouter l'image à l'element img dans src
    image.alt = altTxt               //ajouter le alttexte  à l'element img dans alt 
    return image                          // retourner l'image pour pouvoir la recuperer
}


function addH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name        // Ajouter du texte à l'element h3 qui sera le name contenu dans les données recuperer dans l'Api
    return h3
}
function addWord(description) {
    const p = document.createElement("p")
    p.textContent = description
    return p                    // retourner p pour pourvoir recuperer la descrition
}




