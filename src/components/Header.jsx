import Button from "./UI/Button";
import LogoImg from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../Store/CartContext";
import UserProgressContext from "../Store/UserPropgressContext";
export function Header() {
  const { showCart } = useContext(UserProgressContext);
  const { items } = useContext(CartContext);
  const itemLength = items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);
  function handleCartButton() {
    showCart();
  }
  return (
    <header id="main-header">
      <div>
        <h1 id="title">
          ReactFood
          <img src={LogoImg} alt="" />
        </h1>
      </div>
      <nav>
        <Button textOnly onClick={handleCartButton}>
          Cart({itemLength})
        </Button>
      </nav>
    </header>
  );
}
