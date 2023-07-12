"use client";
import React, { useMemo, useState } from "react";
import "../styles/topcategories.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Image from "next/image";
import Link from "next/link";
import FeaturedSkeltonCategories from "./Skeltons/FeaturedSkeltonCategories";
import { axiosinstance } from "@/utils/axiosinstance";

const TopCategories = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useMemo(() => {
    const FetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get(
          "/categories?populate=*&pagination[start]=0&pagination[limit]=4&type=top"
        );
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    FetchCategories();
  }, []);

  return (
    <div className="mainTopCategories">
      <div className="innerTopCategories">
        <div className="topCategoriesHeader">
          <div className="topCategoriesHeaderInfo">
            <h2>Top Categories</h2>
            <p>
              Shop stylish furniture online. Find quality pieces for every room.
              Free shipping and easy returns. Shop stylish furniture online.
              Find quality pieces for every room. Free shipping and easy
              returns.
            </p>
          </div>
          <Link href={`/categories`}>
            <button className="categoryHaederBtn">
              Shop Now
              <span>
                <ArrowOutwardIcon />
              </span>
            </button>
          </Link>
        </div>

        {isLoading ? (
          <FeaturedSkeltonCategories />
        ) : (
          <div className="mainCategoriesGrid">
            {data?.data?.map((item) => {
              return (
                <div className="categoryBxs" key={item?.id}>
                  <Link href={`/shop?category=${item?.attributes?.title}`}>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        item?.attributes?.image?.data?.attributes?.url
                      }
                      alt="Category_IMG"
                      fill="cover"
                      style={{
                        objectFit:
                          item?.attributes?.image?.data?.attributes
                            ?.alternativeText || "cover",
                      }}
                      className="CategoryImg"
                    />

                    <div className="categoryBxDetails">
                      <div className="categoryBxInfo">
                        <h2>{item?.attributes?.title}</h2>
                        <p>{item?.attributes?.products?.data?.length} items</p>
                      </div>
                      <label className="categoryBxIcons">
                        <ArrowOutwardIcon />
                      </label>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCategories;
