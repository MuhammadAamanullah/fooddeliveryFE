import { currencyFormatter } from "../util/formating";

export function CartItem({ name, quantity, price, onIncrease, onDecrese }) {
  return (
    <li className="list-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrese}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
