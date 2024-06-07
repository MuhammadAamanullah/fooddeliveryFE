import { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../util/formating";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserPropgressContext";
import useHttp from "../hooks/useHttp";

export function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  function handleCloseButton() {
    hideCheckout();
  }

  function finishCheckout() {
    hideCheckout();
    clearCart();
    clearData();
  }
  const totalPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const requestConfig = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  const { isLoading, error, data, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orderss",
    requestConfig
  );

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      })
    );
  }
  let actions = (
    <>
      <Button textOnly onClick={handleCloseButton}>
        Close
      </Button>
      <Button type="submit">Submit</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data) {
    return (
      <Modal open={progress === "checkout"} onClose={handleCloseButton}>
        <h1>Success!</h1>
        <p>Your order is recieved</p>
        <p>we will get back to you in a while via email</p>
        <p className="modal-actions">
          <Button onClick={finishCheckout}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={progress === "checkout"} ocClose={handleCloseButton}>
      <form onSubmit={handleSubmit}>
        <h2>Chekout</h2>
        <p>Total Amount:{currencyFormatter.format(totalPrice)} </p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input
            label="Postal Code"
            id="postal-code"
            name="postal-code"
            type="text"
          />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="order is not submiited" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
