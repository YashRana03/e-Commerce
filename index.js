const  shopButtonEl = document.querySelector(".discount button")
let color = "black"
console.log(shopButtonEl)

setInterval(() => {
    if(color == "black") {
        shopButtonEl.style.borderColor = "#828282"
        color = "#828282"
        
        
    }
    else {
        shopButtonEl.style.borderColor = "black"
        color = "black"
    }
    
}, 1000)