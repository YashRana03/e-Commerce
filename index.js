const  shopButtonEl = document.querySelector(".discount button")
let color = "black"
let padding = 0

setInterval(() => {
    if(padding == 3) {
        shopButtonEl.style.padding = `${padding}px 5px `
        padding = 0
        
        
    }
    else {
        shopButtonEl.style.padding = padding + "px"
        padding = 3
    }
    
}, 1000)