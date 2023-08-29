import React from "react";
import productimg from "../../assets/naruto.jpeg";
import "./product.scss";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const navigate = useNavigate();
  return (
    <div className="product">
      <div
        className="product-container"
        onClick={() => navigate(`/singleproduct/${product.attributes.key}`)}
      >
        <div className="image-container">
          <div className="image">
            <img
              src={product?.attributes.image?.data.attributes.url}
              alt="Product Image"
              id="img"
              className="image"
            />
          </div>
        </div>
      </div>
      <div className="product-text center">
        <h3 className="heading">{product?.attributes.title}</h3>
        <p className="price">₹ {product?.attributes.price}</p>
      </div>
    </div>
  );
}

export default Product;
