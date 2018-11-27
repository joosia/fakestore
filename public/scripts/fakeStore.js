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

addCartBtn.forEach(btn => {
   btn.addEventListener("click", function () {
      console.log(this.dataset.id);
      document.querySelector(".fa-shopping-cart").classList.add("shake");
   })
});
