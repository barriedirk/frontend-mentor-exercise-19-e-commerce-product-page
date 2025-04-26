import { $ } from "./utils.js";

import { fetchData } from "./fetchData.js";
import { initializeGallery } from "./gallery.js";
import { initializeMenu } from "./menuNav.js";
import {
  initializeProductDetail,
  initializeAddToCart,
  updateNumberCartItems,
} from "./products.js";
import { initializeCartCheckoutDialog } from "./cart-panel.js";
import { initializeLightBox } from "./lightbox.js";

import { createStore, cartReducer } from "./reduxCart.js";

(async () => {
  const store = createStore(cartReducer);
  const mediaQuery = window.matchMedia("(min-width: 700px)");

  initializeMenu();

  const product = await fetchData();

  const { company, title, description, price, images, stock } = product;

  const showLightBox = initializeLightBox({
    $dialog: $("#lightbox"),
    $content: $("#lightbox__gallery-main"),
  });

  initializeProductDetail({ company, title, description, price });

  initializeAddToCart({ stock, product, store });

  store.subscribe(() =>
    updateNumberCartItems({ store, $badge: $("#cart-button__badge") })
  );

  initializeGallery({
    slides: images,
    $mainImage: $("#product__main-image"),
    $galleryThumbnails: $("#product__gallery-thumbnails"),
    galleryId: "#product__gallery-main",
  });

  $("#product__main-image").addEventListener("dblclick", (event) => {
    event.preventDefault();

    if (mediaQuery.matches) {
      showLightBox({ images });
    }
  });

  initializeCartCheckoutDialog({
    store,
    $cartButton: $("#cart-button--toggle"),
    $cartPanel: $("#cart-panel"),
  });
})();
