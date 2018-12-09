// Shopping Cart
const shoppingCart = document.querySelector(".shopping-cart");
shoppingCart.addEventListener("click", function () {
   this.parentNode.classList.toggle("is-active");
})

// Search
// const searchField = document.getElementById("search-field");
// let results = document.getElementById("results");

// searchField.addEventListener("keyup", (ev) => {
//    // console.log("Seach field input");
//    let value = { search: searchField.value };
//    $.get("/searching", value, data => {
//       results.innerHTML(data);
//    })
// });

const addCartBtn = document.querySelectorAll(".add-to-cart");
const cartContent = document.querySelector(".shopping-cart-content");
const cartIcon = document.getElementsByClassName("fa-shopping-cart");
const cartCounter = document.querySelector(".cart-counter");
let cartCount;
let cart = {
   products: []
}
if (!localStorage.getItem("cartItems")) {
   localStorage.setItem('cartItems', JSON.stringify(cart));
}

if (localStorage.getItem("cartCount")) {
   cartCounter.classList.remove("hidden")
   cartCount = localStorage.getItem("cartCount");
   cartCounter.querySelector("span").innerText = cartCount;
} else {
   cartCount = 0;
}

addCartBtn.forEach(btn => {
   btn.addEventListener("click", function () {
      let product = {
         id : this.dataset.id,
         name: this.dataset.name
      }
      addToCart(product);
      let li = document.createElement("li");
      let item = document.createElement("a");
      item.innerText = this.dataset.name;
      let id = this.dataset.id;
      item.setAttribute("href", "/products/" + id);
      li.append(item);
      cartContent.append(li);
      cartIcon[0].classList.add("shake");
      setTimeout(()=>{
         cartIcon[0].classList.remove("shake");
      }, 200);
      cartCount++;
      cartCounter.querySelector("span").innerText = cartCount;
      localStorage.setItem("cartCount", cartCount);
      if (cartCounter.classList.contains("hidden")) {
         cartCounter.classList.remove("hidden")
         cartCounter.classList.add("pop");
      }
   })
});

function addToCart(product) {
   // Retrieve the cart object from local storage
   if (localStorage.getItem('cartItems')) {
       let cart = JSON.parse(localStorage.getItem('cartItems'));            
       cart.products.push(product);
       localStorage.setItem('cartItems', JSON.stringify(cart));
   } 
}
