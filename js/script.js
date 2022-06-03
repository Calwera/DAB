"use strict";
const nav = document.querySelectorAll(".main-page__nav-list-item");
const close_popup = document.querySelector(".popup__add-exit");
const popup = document.querySelector(".popup");

nav.forEach((button) => {
  button.addEventListener("click", function () {
    popup.style.display = "block";
  });
});

// dodaj.addEventListener("click", function () {
//   popup.style.display = "none";
// });
