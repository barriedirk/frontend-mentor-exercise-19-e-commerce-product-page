import { getCartQuantity } from "./utils.js";
import { removeCartAction, clearCartAction } from "./reduxCart.js";

const createEmptyCartMessage = () => {
  const p = document.createElement("p");

  p.className = "cart-panel__content--empty";
  p.textContent = "Your cart is empty.";

  return p;
};

const createCartItemList = () => {
  const ul = document.createElement("ul");

  ul.id = "cart-panel__items";
  ul.className = "cart-panel__items";

  return ul;
};

const createCheckoutButton = ({ store, abortListener }) => {
  const button = document.createElement("button");

  button.id = "cart-panel__btn-checkout";
  button.className = "cart-panel__btn-checkout";
  button.textContent = "Checkout";

  button.addEventListener(
    "click",
    (evt) => {
      evt.stopPropagation();

      alert("You click checkout button");

      clearCartAction(store);
    },
    {
      signal: abortListener.signal,
    }
  );

  return button;
};

const createCartItem = ({
  store,
  abortListener,
  id,
  title,
  original,
  thumbnail,
  alt,
  quantity,
}) => {
  const totalPrice = original * quantity;

  const li = document.createElement("li");
  li.className = "cart-panel__item";

  const img = document.createElement("img");
  img.src = thumbnail;
  img.alt = alt;
  img.className = "cart-panel__item--image";
  li.appendChild(img);

  const desc = document.createElement("span");
  desc.className = "cart-panel__item--description";

  const titleEl = document.createElement("span");
  titleEl.className = "cart-panel__item--title";
  titleEl.textContent = title;

  const details = document.createElement("span");
  details.className = "cart-panel__item--details";
  details.textContent = `$${original.toFixed(2)} x ${quantity}`;

  const total = document.createElement("span");
  total.className = "cart-panel__item--total";
  total.textContent = `$${totalPrice.toFixed(2)}`;

  desc.appendChild(titleEl);
  desc.appendChild(details);
  desc.appendChild(total);
  li.appendChild(desc);

  const action = document.createElement("span");
  action.className = "cart-panel__item--action";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "cart-panel__item--action-remove";

  const deleteImg = document.createElement("img");
  deleteImg.src = "./images/icon-delete.svg";
  deleteImg.alt = "Icon delete";

  deleteBtn.addEventListener(
    "click",
    (evt) => {
      evt.stopPropagation();

      removeCartAction(store, id);
    },
    {
      signal: abortListener.signal,
    }
  );

  deleteBtn.appendChild(deleteImg);
  action.appendChild(deleteBtn);
  li.appendChild(action);

  return li;
};

const renderCart = ({ store, abortListener, $cartPanel }) => {
  const $cartContent = $cartPanel.querySelector(".cart-panel__content");

  const cartList = store.getState().cart;
  const nItems = getCartQuantity(store);

  $cartContent.innerHTML = "";

  if (nItems === 0) {
    $cartContent.appendChild(createEmptyCartMessage());

    return;
  }

  const $itemList = createCartItemList();
  const $cartListNode = cartList.map((item) => {
    const { quantity } = item;
    const { title, images, price, id } = item.product;
    const { original } = price;
    const { thumbnail, alt } = images.find((image) => image.default);

    return createCartItem({
      store,
      abortListener,
      id,
      title,
      original,
      thumbnail,
      alt,
      quantity,
    });
  });

  $cartListNode.forEach(($itemNode) => {
    $itemList.appendChild($itemNode);
  });

  $cartContent.appendChild($itemList);

  $cartContent.appendChild(createCheckoutButton({ store, abortListener }));
};

const showOrHideCartPanel = ({ isExpanded, $cartButton, $cartPanel }) => {
  const expandedValue = isExpanded ? "false" : "true";
  const labelValue = isExpanded ? "Close cart panel" : "Open cart panel";

  $cartButton.setAttribute("aria-expanded", expandedValue);
  $cartButton.setAttribute("aria-label", labelValue);

  $cartPanel.style.display = isExpanded ? "none" : "flex";
};

export const initializeCartCheckoutDialog = ({
  store,
  $cartButton,
  $cartPanel,
}) => {
  let abortListener = new AbortController();
  let isPanelShow = false;

  const render = () => {
    abortListener.abort();
    abortListener = new AbortController();

    if (isPanelShow) {
      renderCart({ store, abortListener, $cartPanel });
    }
  };

  $cartButton.addEventListener("click", function (evt) {
    evt.preventDefault();

    let isExpanded = this.getAttribute("aria-expanded") === "true";

    showOrHideCartPanel({ isExpanded, $cartButton, $cartPanel });

    isPanelShow = !isExpanded;

    render();
  });

  store.subscribe(() => render());

  document.addEventListener("click", (event) => {
    if (!isPanelShow) return;

    const isClickInsidePanel = $cartPanel.contains(event.target);
    const isClickOnButton = $cartButton.contains(event.target);

    if (!isClickInsidePanel && !isClickOnButton) {
      showOrHideCartPanel({ isExpanded: true, $cartButton, $cartPanel });
    }
  });
};
