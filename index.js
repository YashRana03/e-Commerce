//Importing necessary product data
import { everything } from "./data.js"

// Accessing various html elements using the DOM
const shopButtonEl = document.querySelector(".discount button")
const closeCartBtn = document.querySelector(".close-cart")
const cartEl = document.querySelector(".cart")
const cartList = document.querySelector(".cart-list")
const cartIconEl = document.querySelector(".cart-icon")
const cartOverlayEl  = document.querySelector(".cart-overlay")
const productsContainerEl = document.querySelector(".products-container")
const itemsCountEl = document.querySelector(".items-count")
const dialogueBoxEl = document.getElementById("dialogue")
const xMarkEl = document.querySelector(".fa-square-xmark")
const goCartBtnEl = document.querySelector(".message button")
const clearCartBtnEl = document.querySelector(".clear-cart")
const cartTotalEl = document.querySelector(".cart-total")


let padding = 0

// List of items already in cart
let itemsInCart = []

// Amount of a certain item in the cart
let productCount = []

// Number of items in the cart
let itemsCount = 0

// Cart total
let cartTotal = 0



// for loop loops through each product in the data and creates a product object that can be
// added to the web page
for(let key in everything) {

    //Creating various html elements to create the product object
    const articleEl = document.createElement("article")
    const imgContainerEl = document.createElement("div")
    const imgEl = document.createElement("img")
    const buttonEl = document.createElement("button")
    const iconEl = document.createElement("i")
    const h3El = document.createElement("h3")

    //Adding various css classes to the right html elements and appending each element inside the right parent element


    articleEl.classList.add("product")
    articleEl.setAttribute("id", key)
    articleEl.appendChild(imgContainerEl)

    imgContainerEl.classList.add("img-container")
    imgContainerEl.append(imgEl, buttonEl)

    // Product img
    imgEl.classList.add("product-img")
    imgEl.setAttribute("src", everything[key].image)

    // Add to cart btn
    buttonEl.classList.add("cart-btn")
    iconEl.classList.add("fas")
    iconEl.classList.add("fa-cart-plus")
    buttonEl.innerHTML = "Add to cart " + iconEl.outerHTML
    buttonEl.setAttribute("id", key)
    // the btn event listener calls the addToCart method in order to add the product selected 
    // to the cart
    buttonEl.addEventListener("click", (e) => { 
        let articleId = key
        addToCart(e, articleId)

    })

    articleEl.appendChild(h3El)
    h3El.textContent = everything[key].text + "    £" + everything[key].price
    // Product is then added to the html page
    productsContainerEl.append(articleEl)
    

}

// Adds selected product to cart 
function addToCart(e, itemId) {
   // Checks if the selected product is already in the cart
    let alredyInCart = false
    for(let i = 0; i<itemsInCart.length; i++) {
        if(itemsInCart[i] != undefined) {
            if(itemsInCart[i].id == e.target.id) {
                alredyInCart = true
            }
        }
        
    }
    // If not already in the cart, a new cart item representing the selected product will be created and added to the cart
    if(!alredyInCart) {

        //Various html elements are created in order to produce the item object in the cart
        const cartItemEl = document.createElement("div")
        const imgEl = document.createElement("img")
        const productInfoEl = document.createElement("div")
        const h4ItemNameEl = document.createElement("h4")
        const h4ItemPriceEl = document.createElement("h4")
        const spanPriceEl = document.createElement("span")
        const removeProductEl = document.createElement("span")
        const productCountContainerEl = document.createElement("div")
        const chevronUpEl = document.createElement("i")
        const productCountEl = document.createElement("span")
        const chevronDownEl = document.createElement("i")
        
        //Adding various css classes to the right html elements and appending each element inside the right parent element

        cartItemEl.classList.add("cart-item")
        cartItemEl.append(imgEl, productInfoEl, productCountContainerEl)
        cartItemEl.setAttribute("id", itemId)

        // The product image is accessed using the itemId passed into the addToCart function as argument

        imgEl.classList.add("cart-product-image")
        console.log(itemId, "efe")
        imgEl.setAttribute("src", everything[itemId].image)

        productInfoEl.append(h4ItemNameEl, h4ItemPriceEl, removeProductEl)
        productInfoEl.classList.add("cart-product-info")

        // The product name is accessed using the itemId passed into the addToCart function as argument
        h4ItemNameEl.textContent = everything[itemId].text
        h4ItemNameEl.setAttribute("id", "wrap")

        // The product price is accessed using the itemId passed into the addToCart function as argument
        spanPriceEl.textContent = everything[itemId].price
        h4ItemPriceEl.innerHTML = "£  " + spanPriceEl.outerHTML

        
        removeProductEl.classList.add("remove-cart-item")
        removeProductEl.textContent = "Remove"
        // Event listener added to the remove product btn
        removeProductEl.addEventListener("click", (e)=> {
            // Listener removes the item object from the cart when the user clicks 
            // the remove btn

            itemsInCart[itemId] = undefined
            e.target.parentElement.parentElement.remove()

            // The cart total and the product count are both updated
            itemsCount -= productCount[e.target.parentElement.parentElement.id]
            itemsCountEl.textContent = itemsCount
            cartTotal -= everything[e.target.parentElement.parentElement.id].price*productCount[e.target.parentElement.parentElement.id]
            cartTotalEl.textContent = "£" + cartTotal
            
            
        })

        productCountContainerEl.append(chevronUpEl, productCountEl, chevronDownEl)
        productCountContainerEl.classList.add("cart-product-count")

        // Increment product amount icon
        chevronUpEl.classList.add("fas")
        chevronUpEl.classList.add("fa-chevron-up")
        chevronUpEl.setAttribute("id", "chevron")

        // Event listener increments the amount of a certain product in the cart when the user clicks the increment icon
        chevronUpEl.addEventListener("click", (e)=> {

            // Updates the cart total and the product count 
            itemsCount++
            itemsCountEl.textContent = itemsCount
            productCount[e.target.parentElement.parentElement.id] += 1
            e.target.parentElement.querySelector(".product-counter").textContent = productCount[e.target.parentElement.parentElement.id]
            cartTotal += everything[e.target.parentElement.parentElement.id].price
            cartTotalEl.textContent = "£" + cartTotal

        })

        // Sets the initial amount of the item to 1
        productCountEl.classList.add("product-counter")
        productCountEl.textContent = 1


        // Decrement product amount icon
        chevronDownEl.classList.add("fas")
        chevronDownEl.classList.add("fa-chevron-down")
        chevronDownEl.setAttribute("id", "chevron")

        // Event listener decrements the amount of the item in cart when the user clicks
        // on the decrement amount icon
        chevronDownEl.addEventListener("click", (e)=> {
            // Checks to see if the item amount is greater than 0 in order to 
            // prevent negative numbers being generated
            if(productCount[e.target.parentElement.parentElement.id] > 0) {
                // Decrements the productCount for the item
                productCount[e.target.parentElement.parentElement.id] -= 1
                // Decrements the total items count of the cart
                itemsCount--
                itemsCountEl.textContent = itemsCount
                 cartTotal -= everything[e.target.parentElement.parentElement.id].price
                 cartTotalEl.textContent = "£" + cartTotal
            }
            
            e.target.parentElement.querySelector(".product-counter").textContent = productCount[e.target.parentElement.parentElement.id]

        })

        // Sets the product count of the item to 1, increments the total items count
        productCount[itemId] = 1
        cartList.append(cartItemEl)
        itemsInCart[itemId] = cartItemEl
        itemsCount++
        itemsCountEl.textContent = itemsCount
        cartTotal += everything[itemId].price
        cartTotalEl.textContent = "£" + cartTotal
        
    }
    
    // If the selected product is already in the cart, the user will be shown an appropriate message dialogue 
    else {
        dialogueBoxEl.style.visibility = "visible"
    }
}


// Interval alternates the padding of the shop button every 1s in order to create effect
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

// Event listener added to the cart Icon in navbar, opens the cart and unfocuses the rest of the page when triggered on click
cartIconEl.addEventListener("click", () => {
    cartEl.style.transform = "translateX(0)"
    cartOverlayEl.style.visibility = "visible"
    document.body.style.overflow = "hidden"
    
})


// Event listener added to the close icon in the cart, closes the cart on click
closeCartBtn.addEventListener("click", () => {
    setTimeout(() => {
        cartOverlayEl.style.visibility = "hidden"

    }, 300)
    cartEl.style.transform = "translateX(100%)"
    document.body.style.overflowY = "visible"

})

// Event listener added to the clear btn in the cart, clears the cart and updates the cart total on click
clearCartBtnEl.addEventListener("click", ()=> {
    let allItems = cartList.querySelectorAll(".cart-item")
    for(let item of allItems) {
        item.remove()
    }
    itemsInCart = []
    itemsCount = 0
    itemsCountEl.textContent = itemsCount
    cartTotal = 0
    cartTotalEl.textContent = "£" + cartTotal
})

// Event listener added to the go to cart btn, opens the cart and closes the message dialogue on click
goCartBtnEl.addEventListener("click", ()=> {
    dialogueBoxEl.style.visibility = "hidden"
    cartEl.style.transform = "translateX(0)"
    cartOverlayEl.style.visibility = "visible"
    document.body.style.overflow = "hidden"

})

// Event listener added to the close mark in the message dialogue, close the message dialogue on click
xMarkEl.addEventListener("click", ()=> {
    dialogueBoxEl.style.visibility = "hidden"
})





    
    



