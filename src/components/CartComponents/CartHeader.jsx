"use client";
import { EmptyCart } from "@/redux/cartSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const CartHeader = () => {
  const dispatch = useDispatch();

  const HandleEmptyCart = () => {
    dispatch(EmptyCart());
  };

  return (
    <div className="cartHeader">
      <div className="cartTextInfo">
        <h2>Shopping Cart</h2>
        <p>
          Home / <span>Shoping Cart</span>
        </p>
      </div>

      <div className="ctaCartsBtns">
        <button className="emptycart" onClick={HandleEmptyCart}>
          Empty Cart
        </button>
        <Link href={"/shop"}>
          <button>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default CartHeader;
