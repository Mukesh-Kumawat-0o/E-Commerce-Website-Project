import React, { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";

function Navbar() {
  const cart = useSelector((state) => state.cartSliceReducer.cart);
  let totalItem = 0;
  cart.forEach((item) => (totalItem += item.quantity));
  const categories = useSelector(
    (state) => state.categorySliceReducer.categories
  );
  const [openCart, setopenCart] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="conatiner nav-box">
          <div className="leftNav">
            <ul className="ul-list">
              {categories?.map((item) => (
                <li key={item.id} className="hover-link">
                  <Link
                    className="link"
                    to={`/collection/${item.attributes.key}`}
                  >
                    {item.attributes.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="centerNav">
            <Link to="/" className="banner">
              Posterz.
            </Link>
          </div>
          <div className="rightNav">
            <div className="cart" onClick={() => setopenCart(!openCart)}>
              <BsFillCartCheckFill className="cart-icon" />
              <span className="item-count center">{totalItem}</span>
            </div>
          </div>
        </div>
      </nav>
      {openCart && <Cart onclose={() => setopenCart(false)} />}
      {/* <Cart/> */}
    </>
  );
}

export default Navbar;
