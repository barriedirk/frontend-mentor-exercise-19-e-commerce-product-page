export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const getCartQuantity = (store) => {
  const quantity =
    store.getState().cart.reduce((acc, curr) => {
      acc += curr.quantity;

      return acc;
    }, 0) ?? 0;

  return quantity;
};
