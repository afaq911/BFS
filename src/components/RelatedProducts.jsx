"use client";
import React, { useMemo, useState } from "react";
import "../styles/relatedproducts.css";
import { CardProduct } from "./ProductCard";
import ProductsSeklton from "./Skeltons/ProductsSeklton";
import { axiosinstance } from "@/utils/axiosinstance";

const RelatedProducts = ({ Cat, id }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useMemo(() => {
    const FetchRelatedProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get(
          Cat
            ? `/products?[filters][categories][title][$eq]=${Cat}&populate=*&[filters][id][$ne]=${id}`
            : `/products?populate=*&[filters][type][$eq]=top`
        );
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    FetchRelatedProducts();
  }, [Cat]);

  return (
    <div className="mainRelatedProductsContainer">
      <div className="innerRelatedProducts">
        <h2>Related Products</h2>

        {isLoading ? (
          <ProductsSeklton />
        ) : (
          <div className="mainRelatedProductsGrid">
            {data?.data?.map((item, index) => (
              <CardProduct key={index + Math.random()} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
