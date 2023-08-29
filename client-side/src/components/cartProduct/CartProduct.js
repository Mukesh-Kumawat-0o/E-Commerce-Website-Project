import React from "react";
import cartimg from "../../assets/naruto.jpeg";
import "./cartproduct.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeProduct,
} from "../../redux/slices/cartSlice";

function CartProduct({ cartProduct }) {

  const dispatch = useDispatch();
  return (
    <div className="cartproduct">
      <div className="imagecontainer">
        <img src={cartProduct.image} alt="Product Image" />
      </div>
      <div className="product-info-wrapper">
        <div className="productinfo">
          <p className="title">{cartProduct.title}</p>
          <h4 className="price">₹ {cartProduct.price}</h4>
          <div className="quantity-selector">
            <span
              className="btn minus"
              onClick={() => dispatch(removeFromCart(cartProduct))}
            >
              -
            </span>

            <span className="quantity">{cartProduct.quantity}</span>
            <span
              className="btn plus"
              onClick={() => dispatch(addToCart(cartProduct))}
            >
              +
            </span>
          </div>
          <p className="subtotal">
            Subtotal : ₹ {cartProduct.price * cartProduct.quantity}
          </p>
        </div>
      </div>
      <div className="removeitem">
        <AiFillCloseCircle
          onClick={() => dispatch(removeProduct(cartProduct))}
        />
      </div>
    </div>
  );
}

export default CartProduct;
