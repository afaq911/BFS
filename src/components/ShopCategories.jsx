"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";
import { axiosinstance } from "@/utils/axiosinstance";

const ShopCategories = ({ setCategory, category, setSubCategories }) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useMemo(() => {
    const FetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await axiosinstance.get("/categories?populate=*");
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    FetchCategories();
  }, []);

  const isActive = (data) => {
    return category === data ? "active" : null;
  };

  const HandleUpdateCategory = (item) => {
    if (item) {
      let title = item?.attributes?.title;
      setCategory(title);
      setSubCategories();
      router.push(`/shop?category=${title}`, { shallow: true });
    } else {
      router.push(`/shop`, { shallow: true });
      setCategory();
      setSubCategories();
    }
  };

  if (isLoading) {
    return <CategoryCircleSkeltonLoader />;
  }

  return (
    <div className="shopCategoryFilters">
      {category && (
        <div className="allCategoriesBx" onClick={() => HandleUpdateCategory()}>
          <div className="allcategoriesDiv">All</div>
        </div>
      )}
      {data?.data?.map((item) => {
        return (
          <div
            className={`signleCategoryBx ${isActive(item?.attributes?.title)}`}
            key={item?.id}
            onClick={() => HandleUpdateCategory(item)}
          >
            <div className="categoryBxImg">
              <Image
                src={
                  process.env.NEXT_PUBLIC_IMAGE_URL +
                  item?.attributes?.image?.data?.attributes?.url
                }
                alt={item?.attributes?.title}
                style={{
                  objectFit:
                    item?.attributes?.image?.data?.attributes
                      ?.alternativeText || "cover",
                }}
                fill="cover"
                className="categoryBxShopImg"
              />
            </div>
            <h4>{item?.attributes?.title}</h4>
          </div>
        );
      })}
    </div>
  );
};

export const CategoryCircleSkeltonLoader = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gridGap: "0px 20px",
      }}
    >
      {[1, 2, 3, 4]?.map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Skeleton
            variant="circular"
            style={{ height: "60px", width: "60px", marginBottom: "5px" }}
          />
          <Skeleton style={{ height: "12px", width: "60px" }} />
        </div>
      ))}
    </div>
  );
};

export default ShopCategories;
