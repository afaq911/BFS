"use client";
import { axiosinstance } from "@/utils/axiosinstance";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const ShopSubCategories = ({ category, subCategories, setSubCategories }) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useMemo(() => {
    const FetchSubCategories = async () => {
      try {
        setIsLoading(true);
        const res = await axiosinstance.get(
          `/sub-categories?[filters][categories][title][$eq]=${category}`
        );
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    FetchSubCategories();
  }, [category]);

  const isActive = (sub_cat) => {
    return subCategories === sub_cat ? "active" : "";
  };

  const HandleUpdateSubCategory = (item) => {
    setSubCategories(item);
    router.push(`/shop?category=${category}&subCategory=${item}`, {
      shallow: true,
    });
  };

  return (
    <div className="shopSubCategories">
      <div className="innerSubCategoriesFilter">
        {!isLoading ? (
          <div className="innerSubCategories_Bx_shop">
            {data?.data?.map((item) => {
              return (
                <div
                  className={`subCatBx ${isActive(item?.attributes?.title)}`}
                  key={item?.id}
                  onClick={() =>
                    HandleUpdateSubCategory(item?.attributes?.title)
                  }
                >
                  <div className="checkMarkIcon"></div>
                  <label>{item?.attributes?.title}</label>
                </div>
              );
            })}
          </div>
        ) : (
          <ShopSubCategoriesSkeltonLoader />
        )}
      </div>
    </div>
  );
};

export const ShopSubCategoriesSkeltonLoader = () => {
  return (
    <div className="innerSubCategories_Bx_shop">
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <div
            key={item}
            style={{
              marginRight: "20px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton style={{ height: "140%", width: "100px" }} />
          </div>
        );
      })}
    </div>
  );
};

export default ShopSubCategories;
