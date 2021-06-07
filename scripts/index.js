"use strict";

//document data
document.querySelector(".footer__year").textContent = new Date().getFullYear();

//accordion
document.addEventListener("click", (evt) => {
  if (evt.target.closest(".accordion__header")) {
    const accordionNode = evt.target.closest(".accordion");
    const contentNode = accordionNode.querySelector(".accordion__content");
    contentNode.classList.toggle("accordion__content_opened");
    if (contentNode.style.maxHeight) {
      contentNode.style.maxHeight = null;
    } else {
      contentNode.style.maxHeight = contentNode.scrollHeight + "px";
    }
    accordionNode
      .querySelectorAll(".accordion__btn-rect")
      .forEach((element) => {
        element.classList.toggle("accordion__btn-rect_type_close");
      });
  }
});

//navigation
const navNode = document.querySelector(".nav");
const navMenu = document.querySelector(".menu-btn")
function toggleNav() {
  navNode.classList.toggle("nav_active");
  navMenu.classList.toggle("menu-btn_active")
}
document.addEventListener("click", (evt) => {
  if (evt.target.closest(".menu-btn")) {
    toggleNav();
  }
});
navNode.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("nav__link") ||
    evt.target.classList.contains("nav__phone")
  ) {
    toggleNav();
  }
});
