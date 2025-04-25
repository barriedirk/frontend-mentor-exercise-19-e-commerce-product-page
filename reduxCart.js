export const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => Object.freeze(state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());

    // @todo, remove
    console.log(state);
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({ type: "@@INIT" });

  return { getState, dispatch, subscribe };
};

const initialState = {
  cart: [],
};

export const CartActionType = Object.freeze({
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
});

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART: {
      const {
        quantity,
        product: { id, stock },
      } = action.payload;

      // if exist, update
      let newState = structuredClone(state);

      const idx = newState.cart.findIndex(({ product }) => product.id === id);

      if (idx === -1) {
        return {
          ...newState,
          cart: [...newState.cart, action.payload],
        };
      }

      const newQuantity = newState.cart[idx].quantity + quantity;

      newState.cart[idx].quantity = newQuantity > stock ? stock : newQuantity;

      return newState;
    }
    case CartActionType.REMOVE_FROM_CART: {
      let newState = structuredClone(state);

      return {
        ...newState,
        cart: newState.cart.filter(
          ({ product }) => product.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};

export const addCartAction = (store, { product, quantity }) => {
  store.dispatch({
    type: CartActionType.ADD_TO_CART,
    payload: { product, quantity },
  });
};

export const removeCartAction = (store, productId) => {
  store.dispatch({
    type: CartActionType.REMOVE_FROM_CART,
    payload: { id: productId },
  });
};
