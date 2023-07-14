"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import $ from "jquery";
import { axiosinstance } from "@/utils/axiosinstance";
import CategoryDropDownSkelton from "./Skeltons/CategoryDropDownSkelton";

const CategoryDropDown = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const FetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get(`/categories?populate=*`);
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    FetchCategories();
  }, []);

  useEffect(() => {
    $(".categoriesBxListing").click(function () {
      $(this).toggleClass("active").siblings().removeClass("active");
    });
  }, [data]);

  return (
    <div className="categoriesDropDown" id="TopCaregoryDropdown">
      {!isLoading ? (
        <div className="innerCategoriesDropDown">
          {data?.data?.map((item) => {
            return (
              <div className="categoriesBxListing" key={item.id}>
                <div className="headerCategoriesDropDown">
                  <h2>{item?.attributes?.title}</h2>
                  <label>
                    <KeyboardArrowDownIcon />
                  </label>
                </div>

                <div className="categoriesListingLists">
                  <ul>
                    <li>
                      <Link href={`/shop?category=${item?.attributes?.title}`}>
                        All {item?.attributes?.title}
                      </Link>
                    </li>
                    {item?.attributes?.sub_categories?.data?.map((subCat) => {
                      return (
                        <li key={subCat?.id}>
                          <Link
                            href={`/shop?category=${item?.attributes?.title}&subCategory=${subCat?.attributes?.title}`}
                          >
                            {subCat?.attributes?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <CategoryDropDownSkelton />
      )}
    </div>
  );
};

export default CategoryDropDown;
