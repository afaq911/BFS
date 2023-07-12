"use client";
import React from "react";
import HttpsIcon from "@mui/icons-material/Https";

let progressArray = [1, 2, 3, 4];

const CheckoutProgress = ({ stage }) => {
  let width = stage * 33.3;

  return (
    <>
      <div className="checkoutProgressMainHeading">
        <h2>
          <span>
            <HttpsIcon />
          </span>
          Secure Checkout - ({" "}
          {stage === 0
            ? "Login"
            : stage === 1
            ? "Order Details"
            : stage === 2
            ? "Confirm Order"
            : "Payment"}{" "}
          )
        </h2>
      </div>

      <div className="mainchekoutProgress">
        <div className="innerCheckoutBackline">
          {progressArray?.map((item) => {
            return (
              <div
                className={`progressBx ${stage >= item - 1 ? "active" : ""}`}
                key={item}
              >
                <h2>{item}</h2>
              </div>
            );
          })}
        </div>
        <div
          className="progressbarDynamic"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </>
  );
};

export default CheckoutProgress;
