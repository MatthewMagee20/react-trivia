const hamburgerButton = document.getElementsByClassName("hamburger-button")[0];
const menu = document.getElementsByClassName("menu")[0];
const closeButton = document.getElementsByClassName("close-button")[0];

hamburgerButton.addEventListener(
  "click",
  () => {
    menu.classList.toggle("open");
  },
  false
);

function closeMenu() {
  menu.classList.remove("open");
}
