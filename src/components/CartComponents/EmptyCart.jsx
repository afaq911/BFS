import Image from "next/image";
import React from "react";
import cartImg from "../../media/empty-cart.png";

const EmptyCart = () => {
  return (
    <div
      style={{
        width: "100%",
        margin: "80px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column-reverse",
      }}
    >
      <Image
        src={cartImg}
        alt="EmptyCart"
        style={{ width: "90%", height: "auto", maxWidth: "250px" }}
      />
      <h2
        style={{
          marginBottom: "40px",
          fontSize: "2.5rem",
          fontFamily: "Inter",
          fontWeight: 700,
        }}
      >
        Empty Cart
      </h2>
    </div>
  );
};

export default EmptyCart;
