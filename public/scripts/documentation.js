// Get "navbar-burger" element
const $navbarBurger = document.querySelector('.navbar-burger');
// Get the target from the "data-target" attribute
const target = $navbarBurger.dataset.target;
const $target = document.getElementById(target);

$navbarBurger.addEventListener('click', () => {
   // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
   $navbarBurger.classList.toggle('is-active');
   $target.classList.toggle('is-active');
});


const toc = document.querySelector(".table-of-contents-top");
const tocLinks = toc.querySelectorAll("a");
tocLinks.forEach(el => {
   el.addEventListener("click", () => $target.classList.toggle('is-active'));
});
