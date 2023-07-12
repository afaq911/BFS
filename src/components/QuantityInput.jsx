"use client";
import React from "react";

const QuantityInput = ({ setProductData, productData }) => {
  const HandleIncrement = () => {
    setProductData((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const HanldeDescrement = () => {
    productData?.quantity > 1 &&
      setProductData((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  return (
    <div className="quantityInputBx">
      <button onClick={HanldeDescrement}>-</button>
      <input type="number" value={productData?.quantity} disabled={true} />
      <button onClick={HandleIncrement}>+</button>
    </div>
  );
};

export default QuantityInput;
