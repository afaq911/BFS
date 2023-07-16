"use client";
import React from "react";
import HttpsIcon from "@mui/icons-material/Https";
import Link from "next/link";

let progressArray = [
  { id: 1, label: "Login" },
  { id: 2, label: "Shipping Address" },
  { id: 3, label: "Confirm Order" },
  { id: 4, label: "Payment" },
];

const CheckoutProgress = ({ stage, setStage, currentUser }) => {
  let width = stage * 33.3;

  return (
    <>
      <div className="checkoutProgressMainHeading">
        {stage === 0 || (currentUser && stage === 1) ? (
          <Link href={"/cart"} className="backtoHomeBtn">
            Back to Cart
          </Link>
        ) : (
          <button
            className="backtoHomeBtn"
            onClick={() => setStage((stg) => stg - 1)}
          >
            Go Back
          </button>
        )}

        <h2>
          <span>
            <HttpsIcon />
          </span>
          Secure Checkout
        </h2>
      </div>

      <div className="mainchekoutProgress">
        <div className="innerCheckoutBackline">
          {progressArray?.map((item) => {
            return (
              <div className="progress_wrapper" key={item?.id}>
                <div
                  className={`progressBx ${
                    stage >= item?.id - 1 ? "active" : ""
                  }`}
                >
                  <h2>{item?.id}</h2>
                </div>
                <p
                  className="label_progress"
                  style={{ color: stage >= item?.id - 1 && "#FA698E" }}
                >
                  {item?.label}
                </p>
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
