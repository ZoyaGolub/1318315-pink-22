const headerBurger = document.querySelector(".site-navigation__toggle");
const headerClose = document.querySelector(".site-navigation__toggle-close")
const headerNav = document.querySelector(".site-navigation");
const headerBkg = document.querySelector(".header__menu--box");

headerClose.addEventListener("click", function {
  evt.preventDefault();
  headerClose.classList.remove("site-navigation__toggle-close");
  headerClose.classList.add("site-navigation__toggle");
  headerNav.classList.remove("site-navigation");
  headerNav.classList.add("site-navigation-close");
  headerBkg.classList.remove("header__menu--box");
  headerBkg.classList.add("header__menu--close");
});


headerBurger.addEventListener("click", function {
  evt.preventDefault();
  headerBurger.classList.remove("site-navigation__toggle");
  headerBurger.classList.add("site-navigation__toggle-close");
  headerNav.classList.remove("site-navigation-close");
  headerNav.classList.add("site-navigation");
  headerBkg.classList.remove("header__menu--close");
  headerBkg.classList.add("header__menu--box");
});
