import { $, $$ } from "./utils.js";

const MAX_THUMBNAILS = 4;

export const initializeGallery = ({
  slides,
  $mainImage,
  $galleryThumbnails,
  galleryId,
}) => {
  const abortListener = new AbortController();
  const slidesLen =
    slides.length > MAX_THUMBNAILS ? MAX_THUMBNAILS : slides.length;
  const images = slides.slice(0, slidesLen);
  const defaultIndex = images.findIndex((image) => image.default);

  let currentIndex = defaultIndex === 1 ? 0 : defaultIndex;

  const removeClassActive = () => {
    const buttonList = $galleryThumbnails.querySelectorAll(
      "button.product__thumbnail"
    );

    buttonList.forEach((button) => {
      button.classList.remove("active");
    });
  };

  const updateImage = () => {
    $mainImage.src = images[currentIndex].src;
    $mainImage.alt = images[currentIndex].alt;
  };

  const setImage = (index) => {
    currentIndex = index;

    removeClassActive();

    const button = $galleryThumbnails.querySelector(
      `button:nth-child(${currentIndex + 1})`
    );

    button.classList.add("active");

    updateImage();
  };

  $(`${galleryId} .product__gallery-btn--next`).addEventListener(
    "click",
    (evt) => {
      evt.preventDefault();

      currentIndex = (currentIndex + 1) % slidesLen;
      setImage(currentIndex);
    },
    {
      signal: abortListener.signal,
    }
  );

  $(`${galleryId}  .product__gallery-btn--prev`).addEventListener(
    "click",
    (evt) => {
      evt.preventDefault();

      currentIndex = (currentIndex - 1 + slidesLen) % slidesLen;
      setImage(currentIndex);
    },
    {
      signal: abortListener.signal,
    }
  );

  $galleryThumbnails.innerText = "";

  images.forEach((image, idx) => {
    const button = document.createElement("button");
    const img = document.createElement("img");

    button.className = "product__thumbnail";
    button.setAttribute("aria-label", `Select Thumbnail ${idx + 1}`);
    button.addEventListener(
      "click",
      (evt) => {
        evt.preventDefault();

        setImage(idx);
      },
      {
        signal: abortListener.signal,
      }
    );

    img.src = image.src;
    img.alt = image.alt;

    button.appendChild(img);

    $galleryThumbnails.appendChild(button);
  });

  setImage(currentIndex);

  return abortListener;
};
