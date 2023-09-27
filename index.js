const shopButtonEl = document.querySelector(".discount button")
const closeCartBtn = document.querySelector(".close-cart")
const cartEl = document.querySelector(".cart")
const cartIconEl = document.querySelector(".cart-icon")
const cartOverlayEl  = document.querySelector(".cart-overlay")

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

closeCartBtn.addEventListener("click", () => {
    setTimeout(() => {
        cartOverlayEl.style.visibility = "hidden"

    }, 300)
    cartEl.style.transform = "translateX(100%)"
    document.body.style.overflowY = "visible"

})


cartIconEl.addEventListener("click", () => {
    cartEl.style.transform = "translateX(0)"
    cartOverlayEl.style.visibility = "visible"
    document.body.style.overflow = "hidden"
    
})

