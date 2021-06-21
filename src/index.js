import './pages/index.css';
import Inputmask from 'inputmask';
import SEND_MAIL_SUCCESS_IMAGE_PATH from './images/send-mail-success.png';
import SEND_MAIL_FAILURE_IMAGE_PATH from './images/send-mail-failure.png';
import api from './utils/api.js';
import FormValidator from './utils/FormValidator';

import {
  SEND_MAIL_SUCCESS_TITLE,
  SEND_MAIL_SUCCESS_MESSAGE,
  SEND_MAIL_FAILURE_TITLE,
  SEND_MAIL_FAILURE_MESSAGE,
  HEADER_MIN_MENU_HEIGHT,
  validationData,
} from './utils/constants.js';

const page = document.querySelector('.page');

const headerPromo = document.querySelector('.header__promo');
const headerMenu = document.querySelector('.header__menu');
const headerWrap = document.querySelector('.header__wrap');
const headerItemList = document.querySelectorAll('.header__wrap-item');
const headerPhone = document.querySelector('.header__wrap-phone');

const navNode = document.querySelector('.nav');
const navMenu = document.querySelector('.menu-btn');

const popupPolicy = document.querySelector('.popup_type_policy');
const popupImage = document.querySelector('.popup_type_img');
const popupImageImg = popupImage.querySelector('.popup__img');
const popupImageFigcaption = popupImage.querySelector('.popup__figcaption');
const popupMail = document.querySelector('.popup_type_mail');
const popupMailTitle = popupMail.querySelector('.popup__title');
const popupMailText = popupMail.querySelector('.popup__text');
const popupMailImage = popupMail.querySelector('.popup__status-img');

const form = document.querySelector('.form');
const formPhone = form.querySelector('#userPhone');

// document date
document.querySelector('.footer__year').textContent = new Date().getFullYear();

// functions
function toggleNav() {
  navNode.classList.toggle('nav_active');
  navMenu.classList.toggle('menu-btn_active');
}

function blockPageScroll() {
  page.classList.toggle('page_blocked');
}

function handleEscPopupClose(evt) {
  if (evt.key === 'Escape') {
    // eslint-disable-next-line
    closePopup();
  }
}

function openPopup(popup) {
  popup.classList.add('popup_active');
  blockPageScroll();
  document.addEventListener('keydown', handleEscPopupClose);
}

function closePopup() {
  popupPolicy.classList.remove('popup_active');
  popupImage.classList.remove('popup_active');
  popupMail.classList.remove('popup_active');
  blockPageScroll();
  document.removeEventListener('keydown', handleEscPopupClose);
}

function setPopupImg(targetImage) {
  popupImageImg.src = targetImage.src;
  popupImageImg.alt = targetImage.alt;
  popupImageFigcaption.textContent = targetImage.alt;
}

function showMessage(status, title, message) {
  if (status) {
    popupMailImage.src = SEND_MAIL_SUCCESS_IMAGE_PATH;
  } else {
    popupMailImage.src = SEND_MAIL_FAILURE_IMAGE_PATH;
  }
  popupMailTitle.textContent = title;
  popupMailText.textContent = message;
  openPopup(popupMail);
}

function getFormData(evt) {
  const formDataList = {};
  [...evt.target.elements].forEach((elem) => {
    if (elem.classList.contains('form__element')) {
      formDataList[elem.name] = elem.type === 'checkbox' ? elem.checked : elem.value;
    }
  });
  return formDataList;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  api
    .sendMail(getFormData(evt))
    .then(() => {
      showMessage(true, SEND_MAIL_SUCCESS_TITLE, SEND_MAIL_SUCCESS_MESSAGE);
    })
    .catch(() => {
      showMessage(false, SEND_MAIL_FAILURE_TITLE, SEND_MAIL_FAILURE_MESSAGE);
    })
    .finally();
}

// accordion
document.addEventListener('click', (evt) => {
  if (evt.target.closest('.accordion__header')) {
    const accordionNode = evt.target.closest('.accordion');
    const contentNode = accordionNode.querySelector('.accordion__content');
    contentNode.classList.toggle('accordion__content_opened');
    if (contentNode.style.maxHeight) {
      contentNode.style.maxHeight = null;
    } else {
      contentNode.style.maxHeight = `${contentNode.scrollHeight}px`;
    }
    accordionNode
      .querySelectorAll('.accordion__btn-rect')
      .forEach((element) => {
        element.classList.toggle('accordion__btn-rect_type_close');
      });
  }
});

document.addEventListener('click', (evt) => {
  if (evt.target.closest('.menu-btn')) {
    toggleNav();
  }
});

navNode.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('nav__link')
    || evt.target.classList.contains('nav__phone')
  ) {
    toggleNav();
  }
});

document.querySelectorAll('.policy-btn').forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(popupPolicy);
  });
});

document.querySelectorAll('.photos__img').forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    evt.preventDefault();
    setPopupImg(evt.target);
    openPopup(popupImage);
  });
});

document.querySelectorAll('.popup__close-btn').forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
  });
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__cover')) {
    evt.preventDefault();
    closePopup();
  }
});

window.addEventListener('scroll', () => {
  const headerPromoHeight = headerPromo.offsetHeight;
  if (window.scrollY > headerPromoHeight) {
    headerItemList.forEach((elem) => {
      elem.classList.add('header__wrap-item_type_minimized');
    });
    headerPhone.classList.add('header__wrap-phone_type_minimized');
    headerWrap.classList.add('header__wrap_fixed');
    page.style.paddingTop = `${HEADER_MIN_MENU_HEIGHT}px`;
    headerMenu.style.padding = '10px 0';
  } else {
    headerItemList.forEach((elem) => {
      elem.classList.remove('header__wrap-item_type_minimized');
    });
    headerPhone.classList.remove('header__wrap-phone_type_minimized');
    headerWrap.classList.remove('header__wrap_fixed');
    page.style.paddingTop = '0px';
    headerMenu.style.padding = '20px 0';
  }
});

const validator = new FormValidator(validationData, form);
validator.enableValidation();

new Inputmask('+7 (999) 999-99-99').mask(formPhone);

form.addEventListener('submit', (evt) => {
  formSubmitHandler(evt);
});
