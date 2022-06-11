"use strict";
const nav = document.querySelectorAll("[data-modal-target]");
const close_popup = document.querySelectorAll(".popup__close-button");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".popup__overlay");
const page = document.querySelector(".main-page");
let modal;

nav.forEach((nav) => {
  nav.addEventListener("click", () => {
    modal = document.querySelector(nav.dataset.modalTarget);
    openModal(modal);
  });
});

close_popup.forEach((close) => {
  close.addEventListener("click", function () {
    closeModal(modal);
  });
});

function openModal(modal) {
  // if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  page.classList.add("disable");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  page.classList.remove("disable");
}

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".popup.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});
