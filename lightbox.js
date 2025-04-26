import { $ } from "./utils.js";
import { initializeGallery } from "./gallery.js";

const injectHTML = () => {
  return `
<div class="product__gallery-main" id="lightbox__gallery-main">
    <img
      id="lightbox__main-image"
      class="product__gallery-image pointer"
      src=""
      alt=""
      aria-live="polite"
    />

    <button
      type="button"
      class="product__gallery-btn product__gallery-btn--prev"
      aria-label="Previous image"
    >
      <img
        src="./images/icon-previous.svg"
        alt="Previous Slide Icon"
        width="8"
        height="16"
      />
    </button>

    <button
      type="button"
      class="product__gallery-btn product__gallery-btn--next"
      aria-label="Next image"
    >
      <img
        src="./images/icon-next.svg"
        alt="Next Slide Icon"
        width="8"
        height="16"
      />
    </button>
  </div>

  <div
    id="lightbox__gallery-thumbnails"
    class="product__gallery-thumbnails"
    role="group"
    aria-label="Product image thumbnails"
  >
  </div>
  `;
};

const showGallery = ({ images, $content }) => {
  $content.innerHTML = injectHTML();

  const controllerAbort = initializeGallery({
    slides: images,
    $mainImage: $("#lightbox__main-image"),
    $galleryThumbnails: $("#lightbox__gallery-thumbnails"),
    galleryId: "#lightbox__gallery-main",
  });

  return controllerAbort;
};

export const initializeLightBox = ({ $dialog, $content }) => {
  let controllerAbort;

  $content.innerHTML = "";

  $dialog.querySelector(".lightbox__close").addEventListener("click", (evt) => {
    evt.preventDefault();

    controllerAbort.abort();

    $dialog.close();
  });

  return ({ images }) => {
    if (images.length < 1) return;

    controllerAbort = showGallery({ images, $content });

    $dialog.showModal();
  };
};
