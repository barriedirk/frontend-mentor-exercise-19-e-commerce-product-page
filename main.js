import { $ } from "./utils.js";

import { fetchData } from "./fetchData.js";
import { initializeGallery } from "./gallery.js";
import { initializeMenu } from "./menuNav.js";
import {
  initializeProductDetail,
  initializeAddToCart,
  updateNumberCartItems,
} from "./products.js";

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

  $("#cart-button--toggle").addEventListener("click", function (evt) {
    evt.preventDefault();

    const isExpanded = this.getAttribute("aria-expanded") === "true";
    const expandedValue = isExpanded ? "false" : "true";
    const labelValue = isExpanded ? "Close cart panel" : "Open cart panel";

    this.setAttribute("aria-expanded", expandedValue);
    this.setAttribute("aria-label", labelValue);

    $("#cart-panel").style.display = isExpanded ? "none" : "flex";
  });

  // cart
})();
