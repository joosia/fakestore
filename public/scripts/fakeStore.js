// Shopping Cart
const shoppingCart = document.querySelector(".shopping-cart");
shoppingCart.addEventListener("click", function() {
   this.parentNode.classList.toggle("is-active");
})

// Search
const searchField = document.getElementById("search-field");
let results = document.getElementById("results");

searchField.addEventListener("keyup", (ev) => {
   // console.log("Seach field input");
   let value = { search: searchField.value };
   $.get("/searching", value, data => {
      results.innerHTML(data);
   })
});
