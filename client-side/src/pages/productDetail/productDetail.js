import React, { useEffect, useState } from "react";
import dummyImg from "../../assets/naruto.jpeg";
import "./productdetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

function ProductDetail() {
  const [product, setproduct] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  async function getProductData() {
    const singleproductResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productid}&populate=*`
    );
    if (singleproductResponse.data.data.length > 0) {
      setproduct(singleproductResponse.data.data[0]);
    }

    // console.log("Product SINGLE data =>>>", singleproductResponse.data.data);
  }

  const cart = useSelector((state) => state.cartSliceReducer.cart);
  const quantity =
    cart.find((item) => item.key === params.productid)?.quantity || 0;

  useEffect(() => {
    setproduct(null); // old product ko null set kro or new product ko load krdo
    getProductData();
  }, [params]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="productdetail">
      <div className="container">
        <div className="product-box">
          <div className="imgg-container">
            <img src={product?.attributes.image.data.attributes.url} alt="" />
          </div>
          <div className="content-part">
            <h2 className="heading">{product?.attributes.title}</h2>
            <h3 className="price">₹ {product?.attributes.price}</h3>
            <p className="paragraph">{product?.attributes.description}</p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span
                  className="btn minus"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  -
                </span>

                <span className="quantity">{quantity}</span>
                <span
                  className="btn plus"
                  onClick={() => dispatch(addToCart(product))}
                >
                  +
                </span>
              </div>
              <button
                className="btn-primary add-to-cart"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to cart
              </button>
            </div>

            <div className="return-policy">
              <h3>Return Policy</h3>
              <ul>
                <li>
                  This product is made to order and is typically printed in 3-6
                  working days. Your entire order will ship out together.
                </li>
                <li>
                  Since this product is printed on demand especially for you, it
                  is not eligible for cancellations and returns. Read our Return
                  Policy.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
