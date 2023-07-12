"use client";
import React from "react";
import "../styles/categoriescard.css";
import Image from "next/image";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Link from "next/link";

const CategoriesCard = ({ item }) => {
  return (
    <div className="mainCategoryCard">
      <div className="CategoryCardImg">
        <Image
          src={
            process.env.NEXT_PUBLIC_IMAGE_URL +
            item?.attributes?.image?.data?.attributes?.url
          }
          style={{
            objectFit:
              item?.attributes?.image?.data?.alternativeText || "cover",
          }}
          alt="CategoryImg"
          fill="cover"
        />
      </div>

      <div className="CategoryCardInfo">
        <div className="CategoryDetails">
          <h2>{item?.attributes?.title}</h2>
          <p>
            {item?.attributes?.products?.data?.length} items
            <span>
              <ArrowOutwardIcon />
            </span>
          </p>
        </div>

        <Link href={`/shop?category=${item?.attributes?.title}`}>
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesCard;
