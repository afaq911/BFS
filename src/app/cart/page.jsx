"use client";
import React from "react";
import "../../styles/cartpage.css";
import TopBar from "@/components/TopBar";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";
import RelatedProducts from "@/components/RelatedProducts";
import CartHeader from "@/components/CartComponents/CartHeader";
import CartItems from "@/components/CartComponents/CartItems";
import CheckoutCard from "@/components/CartComponents/CheckoutCard";
import EmptyCart from "@/components/CartComponents/EmptyCart";
import { useSelector } from "react-redux";

const CartPage = () => {
  const Cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <TopBar />

      <div className="mainCartContainer">
        <div className="innerCartContainer">
          <CartHeader />

          {Cart?.length > 0 ? (
            <div className="innerCartContainerGrid">
              <CartItems />
              <CheckoutCard />
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>

      <RelatedProducts />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default CartPage;
