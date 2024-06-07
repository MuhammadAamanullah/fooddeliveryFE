import { act, createContext, useReducer } from "react";
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    console.log(existingItemIndex);
    const updatedItems = [...state.items];
    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      console.log(updatedItem);
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartaction] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    dispatchCartaction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartaction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartaction({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  console.log(cartContext.items);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
