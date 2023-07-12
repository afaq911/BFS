"use client";
import React, { useMemo, useState } from "react";
import "../styles/topproducts.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { CardProduct } from "./ProductCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ProductsSeklton from "./Skeltons/ProductsSeklton";
import Link from "next/link";
import { axiosinstance } from "@/utils/axiosinstance";

const TopProducts = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useMemo(() => {
    const FetchTopProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get(
          "/products?populate=*&[filters][type][$eq]=top&pagination[start]=0&pagination[limit]=15"
        );
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    FetchTopProducts();
  }, []);

  return (
    <div className="mainTopProductsContainer">
      <div className="innerTopProducts">
        <div className="TopProductsHeader">
          <h2 className="mainHeadingTopProducts">Featured Products</h2>
          <Link href={`/shop`}>
            <button className="productHaederBtn">
              Show More
              <span>
                <ArrowOutwardIcon />
              </span>
            </button>
          </Link>
        </div>

        {isLoading ? (
          <ProductsSeklton />
        ) : (
          <div className="gridTopProducts">
            {data?.data?.map((item) => {
              return <CardProduct key={item?.id} item={item} />;
            })}
          </div>
        )}

        <Link href={`/shop`}>
          <button className="viewAllbth">
            All Products
            <span>
              <ArrowRightAltIcon />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopProducts;
