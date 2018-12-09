// Dropdowns
const dropDownTriggers = document.querySelectorAll(".dropdown-trigger");
dropDownTriggers.forEach(el => {
   el.addEventListener("click", function () {
      this.parentNode.classList.toggle("is-active");
   })
});

const addCartBtn = document.querySelectorAll(".add-to-cart");
const cartContent = document.querySelector(".shopping-cart-content");
const cartIcon = document.getElementsByClassName("fa-shopping-cart");
const cartCounter = document.querySelector(".cart-counter");
const deleteBtn = document.querySelectorAll("fa-minus-circle");
let cartCount;

if (!localStorage.getItem("cartItems")) {
   let cart = {
      products: []
   }
   localStorage.setItem('cartItems', JSON.stringify(cart));
} else {
   // Get cart items
   addToCart("", cartContent)
   let cartItems = JSON.parse(localStorage.getItem("cartItems"));
   cartCount = cartItems.products.length;
}

if (cartCount > 0) {
   cartCounter.classList.remove("hidden")
   cartCounter.classList.add("pop");
   cartCounter.querySelector("span").innerText = cartCount;
} else {
   cartCount = 0;
   let li = document.createElement("li");
   li.classList.add("msg");
   li.innerText = "Your cart is empty!";
   cartContent.append(li);
}

addCartBtn.forEach(btn => {
   btn.addEventListener("click", function () {
      let msg = document.querySelector(".msg");
      if (msg) {
         document.querySelector(".msg").remove();
      }
      let product = {
         id: this.dataset.id,
         name: this.dataset.name,
      }
      addToCart(product, cartContent);
      cartIcon[0].classList.add("shake");
      setTimeout(() => {
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

deleteBtn.forEach(button => {
   button.addEventListener("click", function(){
      this.parentNode.remove();
   })
})

function addToCart(product, element) {
   // Retrieve the cart object from local storage
   if (localStorage.getItem('cartItems')) {
      let cart = JSON.parse(localStorage.getItem('cartItems'));
      if (product) {
         cart.products.push(product);
         let li = document.createElement("li");
         let item = document.createElement("a");
         let icon = document.createElement("i");
         icon.classList.add("fas", "fa-minus-circle");
         //let counter = document.createElement("input")
         item.innerText = product.name;
         item.setAttribute("href", "/products/" + product.id);
         li.append(item, icon);
         //li.append(counter);
         element.append(li)
      } else {
         cart.products.forEach(product => {
            let li = document.createElement("li");
            let item = document.createElement("a");
            let icon = document.createElement("i");
            icon.classList.add("fas", "fa-minus-circle");
            //let counter = document.createElement("input")
            item.innerText = product.name;
            item.setAttribute("href", "/products/" + product.id);
            li.append(item, icon);
            //li.append(counter);
            element.append(li)
         })
      }
      localStorage.setItem('cartItems', JSON.stringify(cart));
   }
}
