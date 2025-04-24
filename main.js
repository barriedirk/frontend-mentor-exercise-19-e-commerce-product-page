import { $, $$ } from "./utils.js";

(async () => {
  // navigator
  const $btnsShowMenu = $(".header__nav-show-menu");

  $btnsShowMenu.addEventListener("click", function (evt) {
    evt.preventDefault();

    const isExpanded = this.getAttribute("aria-expanded") === "true";
    const expandedValue = isExpanded ? "false" : "true";
    const labelValue = isExpanded ? "Close toggle menu" : "Open toggle menu";

    this.setAttribute("aria-expanded", expandedValue);
    this.setAttribute("aria-expanded", expandedValue);
  });
})();

// @todo, adapt
const images = [
  { src: "./images/image-product-1.jpg", alt: "Product view 1" },
  { src: "./images/image-product-2.jpg", alt: "Product view 2" },
  { src: "./images/image-product-3.jpg", alt: "Product view 3" },
  { src: "./images/image-product-4.jpg", alt: "Product view 4" },
];

let currentIndex = 0;
const mainImage = document.getElementById("product__main-image");

function updateImage() {
  mainImage.src = images[currentIndex].src;
  mainImage.alt = images[currentIndex].alt;
}

function showNextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

function showPrevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

function setImage(index) {
  currentIndex = index;
  updateImage();
}

updateImage();
