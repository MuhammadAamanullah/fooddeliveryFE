import { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../util/formating";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserPropgressContext";
import { CartItem } from "./CartItem";

export function Cart() {
  const { progress, showCheckout, hideCart } = useContext(UserProgressContext);
  const { items, addItem, removeItem } = useContext(CartContext);
  const cartPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleClose() {
    hideCart();
  }

  function handleCheckout() {
    showCheckout();
  }
  return (
    <Modal className="cart" open={progress === "cart"}>
      <h1>Your Cart</h1>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => addItem(item)}
            onDecrese={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {items.length > 0 && <Button onClick={handleCheckout}>CheckOut</Button>}
      </p>
    </Modal>
  );
}
