"use strict";
const nav = document.querySelectorAll("[data-modal-target]");
const close_popup = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".popup__overlay");

nav.forEach((nav) => {
  nav.addEventListener("click", () => {
    const modal = document.querySelector(nav.dataset.modalTarget);
    openModal(modal);
  });
});

close_popup.addEventListener("click", function () {
  closeModal(popup);
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".popup.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});
