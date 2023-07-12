"use client";
import React, { useState } from "react";
import ProductGallery from "@/components/SingleProduct/ProductGallery";
import ProductsData from "@/components/SingleProduct/ProductsData";

const ProductView = ({ data }) => {
  const [productData, setProductData] = useState({
    color: data?.data?.attributes?.options?.colors[0] || "",
    size: data?.data?.attributes?.options?.sizes?.length
      ? data?.data?.attributes?.options?.sizes[0]
      : {},
    quantity: 1,
  });

  return (
    <div className="innerViewProduct">
      <ProductGallery
        images={data?.data?.attributes?.images}
        thumbnail={data?.data?.attributes?.thumbnail}
        color={productData?.color}
        size={productData?.size?.name}
      />

      <ProductsData
        data={data}
        setProductData={setProductData}
        productData={productData}
      />
    </div>
  );
};

export default ProductView;
