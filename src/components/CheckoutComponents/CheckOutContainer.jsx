"use client";
import "../../styles/cartpage.css";
import React, { useEffect, useState } from "react";
import CheckoutProgress from "./CheckoutProgress";
import ShippingAddress from "./ShippingAddress";
import StripePayment from "./StripePayment/StripePayment";
import ConfirmOrder from "./ConfirmOrder";
import { useSelector } from "react-redux";
import CheckOutAuth from "./CheckOutAuth";

const CheckOutContainer = () => {
  const cart = useSelector((state) => state.cart.cart);
  const currentUser = useSelector((state) => state.user.user);
  const [stage, setStage] = useState(currentUser ? 1 : 0);
  const [values, setValues] = useState({
    username: currentUser?.user?.username || "",
    email: currentUser?.user?.email || "",
    mobileno: currentUser?.user?.mobileno || "",
  });

  const HandleValues = (e, name) => {
    name
      ? setValues((prev) => ({ ...prev, [name]: e }))
      : setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (!cart?.length) {
      window.location.href = "/";
    }
  }, [cart]);

  return (
    <div className="mainCheckoutContainer">
      <div className="innerCheckoutContainer">
        <CheckoutProgress
          stage={stage}
          setStage={setStage}
          currentUser={currentUser}
        />

        {stage === 0 && <CheckOutAuth setStage={setStage} />}
        {stage === 1 && (
          <ShippingAddress
            HandleValues={HandleValues}
            values={values}
            setStage={setStage}
          />
        )}
        {stage === 2 && <ConfirmOrder values={values} setStage={setStage} />}
        {stage === 3 && <StripePayment values={values} />}
      </div>
    </div>
  );
};

export default CheckOutContainer;
