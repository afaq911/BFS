"use client";
import { PaymentsOffer } from "@/constants/WebData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CheckoutCard = () => {
  const subTotal = useSelector((state) => state.cart.subTotal);

  return (
    <div className="mainCheckoutCard">
      <div className="innerCHeckoutCard">
        <div className="totalTabcheckout">
          <p>You&apos;re Paying</p>
          <h2>£{subTotal + 50 + 29.5}</h2>
        </div>

        <div className="paymentsDetails">
          <h4>Sub total</h4>
          <h2>£{subTotal}</h2>
        </div>
        <div className="paymentsDetails">
          <h4>Shipping</h4>
          <h2>£50</h2>
        </div>
        <div className="paymentsDetails">
          <h4>Tax</h4>
          <h2>£29.5</h2>
        </div>

        <div className="cardCheckoutBtn">
          <Link href={"/checkout"}>
            <button className="checkoutBtns">Checkout</button>
          </Link>
        </div>

        <div className="weAcceptPayments">
          <h2>
            <span>We accept</span>
          </h2>

          <div className="paymentGateways">
            {PaymentsOffer?.map((item, index) => {
              return (
                <div className="paymentMethodsweofferImgs" key={index + 1}>
                  <Image
                    src={item}
                    alt="PaymentMethods"
                    className="mainPaymentLogoImg"
                    fill="cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
