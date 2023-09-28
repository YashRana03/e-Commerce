const shopButtonEl = document.querySelector(".discount button")
const closeCartBtn = document.querySelector(".close-cart")
const cartEl = document.querySelector(".cart")
const cartList = document.querySelector(".cart-list")
const cartIconEl = document.querySelector(".cart-icon")
const cartOverlayEl  = document.querySelector(".cart-overlay")
const productsContainerEl = document.querySelector(".products-container")
console.log(productsContainerEl)

let color = "black"
let padding = 0
let itemsInCart = []
let productCount = []

const everything = {
    1: {image: "./images/product-1.png", text: "Pink Adidas"},
    2: {image: "./images/product-2.png", text: "Red Nikes"},
    3: {image: "./images/product-3.png", text: "High Heels"},
}

for(let key in everything) {
    const articleEl = document.createElement("article")
    const imgContainerEl = document.createElement("div")
    const imgEl = document.createElement("img")
    const buttonEl = document.createElement("button")
    const iconEl = document.createElement("i")
    const h3El = document.createElement("h3")

    articleEl.classList.add("product")
    articleEl.setAttribute("id", key)
    articleEl.appendChild(imgContainerEl)
    imgContainerEl.classList.add("img-container")
    imgContainerEl.append(imgEl, buttonEl)

    imgEl.classList.add("product-img")
    imgEl.setAttribute("src", everything[key].image)

    buttonEl.classList.add("cart-btn")
    iconEl.classList.add("fas")
    iconEl.classList.add("fa-cart-plus")
    buttonEl.innerHTML = "Add to cart " + iconEl.outerHTML
    buttonEl.setAttribute("id", key)
    buttonEl.addEventListener("click", (e) => { 
        addToCart(e)

    })

    articleEl.appendChild(h3El)
    h3El.textContent = everything[key].text

    productsContainerEl.append(articleEl)
}

function addToCart(e) {
    let alredyInCart = false
    for(let i = 0; i<itemsInCart.length; i++) {
        if(itemsInCart[i].id == e.target.id) {
            alredyInCart = true
        }
    }
    if(!alredyInCart) {

        const cartItemEl = document.createElement("div")
        const imgEl = document.createElement("img")
        const productInfoEl = document.createElement("div")
        const h4ItemNameEl = document.createElement("h4")
        const h4ItemPriceEl = document.createElement("h4")
        const removeProductEl = document.createElement("span")
        const productCountContainerEl = document.createElement("div")
        const chevronUpEl = document.createElement("i")
        const productCountEl = document.createElement("span")
        const chevronDownEl = document.createElement("i")

        cartItemEl.classList.add("cart-item")
        cartItemEl.append(imgEl, productInfoEl, productCountContainerEl)
        cartItemEl.setAttribute("id", e.target.id)

        imgEl.classList.add("cart-product-image")
        imgEl.setAttribute("src", everything[e.target.id].image)

        productInfoEl.append(h4ItemNameEl, h4ItemPriceEl, removeProductEl)
        productInfoEl.classList.add("cart-product-info")

        h4ItemNameEl.textContent = everything[e.target.id].text
        h4ItemNameEl.setAttribute("id", "wrap")

        h4ItemPriceEl.textContent = "£25"

        removeProductEl.classList.add("remove-cart-item")
        removeProductEl.textContent = "Remove"

        productCountContainerEl.append(chevronUpEl, productCountEl, chevronDownEl)
        productCountContainerEl.classList.add("cart-product-count")

        chevronUpEl.classList.add("fas")
        chevronUpEl.classList.add("fa-chevron-up")
        chevronUpEl.setAttribute("id", "chevron")

        productCountEl.classList.add("product-counter")
        productCountEl.textContent = "10"

        chevronDownEl.classList.add("fas")
        chevronDownEl.classList.add("fa-chevron-down")
        chevronDownEl.setAttribute("id", "chevron")


        cartList.append(cartItemEl)
        itemsInCart.push(cartItemEl)
        
    }
    
    else {
        console.log("You already have this item in the cart")
    }
}



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

