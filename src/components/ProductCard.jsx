"use client";
import React from "react";
import "../styles/productcard.css";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RatingStars from "./ReactStars";
import Link from "next/link";

export const CardProduct = ({ item }) => {
  return (
    <Link href={`/product/${item?.id}`}>
      <div className="mainCardProduct">
        <div className="cartProductImg">
          <Image
            src={
              process.env.NEXT_PUBLIC_IMAGE_URL +
              item?.attributes?.thumbnail?.data?.attributes.url
            }
            alt="CardProductImg"
            fill={
              item?.attributes?.thumbnail?.data?.attributes.alternativeText ||
              "contain"
            }
            style={{
              objectFit:
                item?.attributes?.thumbnail?.data?.attributes.alternativeText ||
                "contain",
            }}
            className="CardProfuctPic"
          />

          <label className="cardaddtoFav">
            <FavoriteBorderIcon />
          </label>
        </div>
        <div className="cardProductDetails">
          <div className="cardproductDetails">
            <h2>{item?.attributes?.title}</h2>
            <div className="productCardRatings">
              <RatingStars size={25} value={item?.attributes?.rating} />
              <p>({item?.attributes?.rating})</p>
            </div>
          </div>
          <label className="cardproductPrices">
            £{item?.attributes?.price}
          </label>
        </div>
      </div>
    </Link>
  );
};
