"use client";
import React from "react";
import "../../styles/skelton.css";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

const ProductsSeklton = () => {
  return (
    <div className="mainSkeltonContainer">
      <div className="innerSkeltonCOntainer">
        <div className="innerSkeltonProductsGrid">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return <SkeltonProduct key={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const SkeltonProduct = () => {
  return (
    <div className="skeltonProductsCards">
      <div className="skeltonProductCard_img">
        <Box
          sx={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton animation="wave" height={"150%"} width={"100%"} />
        </Box>
      </div>
      <div className="skeltonProduct_Info">
        <div className="skeltonDetails">
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
        <div className="skelton_price">
          <Skeleton animation="wave" height={"50px"} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default ProductsSeklton;
