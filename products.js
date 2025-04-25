import { $ } from "./utils.js";
import { addCartAction, removeCartAction } from "./reduxCart.js";

export const initializeProductDetail = ({
  company,
  title,
  description,
  price,
}) => {
  $("#product__company").textContent = company;
  $("#product__title").textContent = title;
  $("#product__description").textContent = description;
  $("#product__price-sale").textContent = `\$${price.sale.toFixed(2)}`;
  $("#product__price-discount").textContent = `${price.discount}%`;
  $("#product__price-original").textContent = `\$${price.original.toFixed(2)}`;
};

export const initializeAddToCart = ({ stock, product, store }) => {
  let quantity = 0;

  const $quantity = $("#product__quantity-value");
  const $btnDecrease = $("#product__quantity-btn--decrease");
  const $btnIncrease = $("#product__quantity-btn--increase");
  const $btnCheckout = $("#product__checkout-btn");

  const setQuantity = (quantity) => {
    $quantity.textContent = quantity;

    $btnCheckout.disabled = quantity === 0;
  };

  setQuantity(0);

  if (stock === 0) {
    $btnDecrease.disabled = true;
    $btnIncrease.disabled = true;
    $btnCheckout.disabled = true;

    alert("No stock available");

    return;
  }

  $btnDecrease.addEventListener("click", (evt) => {
    evt.preventDefault();

    if (quantity === 1) {
      $btnDecrease.disabled = true;
    }
    $btnIncrease.disabled = false;

    quantity--;
    setQuantity(quantity);
  });

  $btnIncrease.addEventListener("click", (evt) => {
    evt.preventDefault();

    if (quantity === stock - 1) {
      $btnIncrease.disabled = true;
    }
    $btnDecrease.disabled = false;

    quantity++;
    setQuantity(quantity);
  });

  $btnCheckout.addEventListener("click", (evt) => {
    evt.preventDefault();

    if (quantity > 0) {
      addCartAction(store, {
        product,
        quantity,
      });
    } else {
      removeCartAction(store, product.id);
    }
  });

  $btnDecrease.disabled = true;
};

export const updateNumberCartItems = ({ store, $badge }) => {
  const nItems =
    store.getState().cart.reduce((acc, curr) => {
      acc += curr.quantity;

      return acc;
    }, 0) ?? 0;

  $badge.innerHTML = nItems > 0 ? nItems : "";
};
