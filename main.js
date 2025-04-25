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

import { createStore, cartReducer } from "./reduxCart.js";

(async () => {
  const store = createStore(cartReducer);

  initializeMenu();

  const product = await fetchData();

  const { company, title, description, price, images, stock } = product;

  initializeProductDetail({ company, title, description, price });

  initializeAddToCart({ stock, product, store });

  store.subscribe(() =>
    updateNumberCartItems({ store, $badge: $("#cart-button__badge") })
  );

  initializeGallery({
    slides: images,
    mainImageId: "#product__main-image",
    galleryThumbnailsId: "#product__gallery-thumbnails",
    galleryId: "#product__gallery-main",
  });

  // lightbox
  // @todo missing lightbox
  $("#product__main-image").addEventListener("dblclick", (event) => {
    event.preventDefault();

    alert("show lightbox");
  });

  initializeCartCheckoutDialog({
    store,
    $cartButton: $("#cart-button--toggle"),
    $cartPanel: $("#cart-panel"),
  });
})();
