"use client";
import React from "react";
import CartProduct from "./CartProduct";
import { useSelector } from "react-redux";

const CartItems = ({ hidecta }) => {
  const Cart = useSelector((state) => state.cart.cart);

  return (
    <div className="mainCartItemsContainer">
      <div className="innerCartItemsContainer">
        {Cart?.map((item, index) => {
          return <CartProduct key={index} item={item} hidecta={hidecta} />;
        })}
      </div>
    </div>
  );
};

export default CartItems;
