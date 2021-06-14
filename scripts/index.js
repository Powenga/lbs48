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
const navMenu = document.querySelector(".menu-btn");
function toggleNav() {
  navNode.classList.toggle("nav_active");
  navMenu.classList.toggle("menu-btn_active");
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

//popup
const page = document.querySelector(".page")
const popupPolicy = document.querySelector(".popup_type_policy");
const popupImage = document.querySelector(".popup_type_img");
const popupImageImg = popupImage.querySelector(".popup__img");
const popupImageFigcaption = popupImage.querySelector(".popup__figcaption");

function blockPageScroll() {
  page.classList.toggle("page_blocked");
}

function openPopup(popup) {
  popup.classList.add("popup_active");
  blockPageScroll();
}

function setPopupImg(targetImage) {
  popupImageImg.src = targetImage.src;
  popupImageImg.alt = targetImage.alt;
  popupImageFigcaption.textContent = targetImage.alt;
}

function closePopup() {
  popupPolicy.classList.remove("popup_active");
  popupImage.classList.remove("popup_active");
  blockPageScroll();
}

document.querySelectorAll(".policy-btn").forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    evt.preventDefault();
    openPopup(popupPolicy);
  });
});

document.querySelectorAll(".photos__img").forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    evt.preventDefault();
    setPopupImg(evt.target);
    openPopup(popupImage);
  });
});

document.querySelectorAll(".popup__close-btn").forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    evt.preventDefault();
    closePopup();
  });
});

document.addEventListener("click", (evt) => {
  if(evt.target.classList.contains('popup__cover')) {
    evt.preventDefault();
    closePopup();
  }
});


