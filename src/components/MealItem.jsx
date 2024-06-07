import { currencyFormatter } from "../util/formating";
import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../Store/CartContext";

export default function MealItem({ item }) {
  const { addItem } = useContext(CartContext);
  function handleAddItemToCart() {
    addItem(item);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${item.image}`} />
        <div>
          <h3>{item.name}</h3>
          <p id="meal-item-price">{currencyFormatter.format(item.price)}</p>
          <p id="meal-item-description">{item.description}</p>
        </div>
        <p className="meal-item-actins">
          <Button onClick={handleAddItemToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
