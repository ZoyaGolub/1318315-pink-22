const popupRequest = document.querySelector(".form__button-send--popup");
const popupError = document.querySelector(".popup--error");
const popupSucces = document.querySelector(".popup--succes");
const popupEclose = document.querySelector(".popup__error-button");
const popupSclose = document.querySelector(".popup__succes-button");
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
  popupError.classList.add("popup--show");

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

popupSclose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupSucces.classList.remove("popup--show");
});

popupEclose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupError.classList.remove("popup--show");
});

popupForm.addEventListener("submit", function (evt) {
  if (!popupSurname.value || !popupName.value || !popupEmail.value) {
    evt.preventDefault();
    popupSucces.classList.add("popup--show");
    popupError.classList.remove("popup--show");
  } else {
    evt.preventDefault();
    popupError.classList.add("popup--show");
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupError.classList.contains("popup--show")) {
      evt.preventDefault();
      popupError.classList.remove("popup--show");
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupSucces.classList.contains("popup--show")) {
      evt.preventDefault();
      popupSucces.classList.remove("popup--show");
    }
  }
});
