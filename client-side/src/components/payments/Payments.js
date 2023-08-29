import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { restsetCart } from "../../redux/slices/cartSlice";
import "./payments.scss";

function Payments() {
  const params = useParams();
  const status = params.status;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentStatus = {
    success: {
      message: "Your order has been placed",
      cta: "Shop more",
      icon: <BsFillCartCheckFill />,
    },
    failed: {
      message: "Payment Failed",
      cta: "Try Again",
      icon: <BiErrorCircle />,
    },
  };

  if (status === "success") {
    dispatch(restsetCart());
  }

  return (
    <div className="payments">
      <div className="icon">{paymentStatus[status].icon}</div>
      <h2 className="message">{paymentStatus[status].message}</h2>
      <button className="btn-primary" onClick={() => navigate("/")}>
        {paymentStatus[status].cta}
      </button>
    </div>
  );
}

export default Payments;
