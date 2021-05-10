const popupRequest = document.querySelector(".form__button-send--popup");
const popupOpen = document.querySelector(".popup-open");
const popupClose = document.querySelector(".popup__close");
const popupError = document.querySelector(".popup--error");
const popupSucces = document.querySelector(".popup--succes");
const popupForm = document.querySelector(".form");
const popupSurname = document.querySelector(".form__surname");
const popupName = document.querySelector(".form__name");
const popupPatronymic = document.querySelector(".form__patronymic");
const popupEmail = document.querySelector(".form__email");

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("surname");
  storage = localStorage.getItem("name");
  storage = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
};

popupRequest.addEventListener("click", function () {
  evt.preventDefault();
  popupOpen.classList.add("popup-show");

  if (storage) {
    popupSurname.value = storage;
    popupName.focus();
  } else {
    popupSurname.focus();
    if (storage) {
      popupName.value = storage;
      popupEmail.focus();
    } else {
      popupName.focus();
      if (storage) {
        popupEmail.value = storage;
        popupPatronymic.focus();
      } else {
        popupEmail.focus();
      }
    }
  }

  popupSurname.focus();
});

popupClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupOpen.classList.remove("popup-show");
});

popupForm.addEventListener("submit", function (evt) {
  if (!popupSurname.value || !popupName.value || !popupEmail.value) {
    evt.preventDefault();
    popupSucces.classList.add("popup-show");
  } else {
    evt.preventDefault();
    popupError.classList.add("popup-show");
    localStorage.setItem("surname", popupSurname.value);
    localStorage.setItem("name", popupName.value);
    localStorage.setItem("email", popupEmail.value);
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupError.classList.contains("modal-show")) {
      evt.preventDefault();
      popupError.classList.remove("modal-show");
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupSucces.classList.contains("modal-show")) {
      evt.preventDefault();
      popupSucces.classList.remove("modal-show");
    }
  }
});
