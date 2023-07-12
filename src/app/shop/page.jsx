"use client";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";
import TopBar from "@/components/TopBar";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/shop.css";
import { CardProduct } from "@/components/ProductCard";
import ProductsSeklton from "@/components/Skeltons/ProductsSeklton";
import SearchIcon from "@/components/Icons/SearchIcon";
import ShopCategories from "@/components/ShopCategories";
import ShopSubCategories from "@/components/ShopSubCategories";
import { axiosinstance } from "@/utils/axiosinstance";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter, useSearchParams } from "next/navigation";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { CircularProgress } from "@mui/material";

const Shop = () => {
  const router = useRouter();
  const paramsCategory = useSearchParams().get("category");
  const subCategory = useSearchParams().get("subCategory");
  const searchQuery = useSearchParams().get("searchQuery");
  const [limit, setLimit] = useState(50);
  const [data, setData] = useState();
  const [searchedData, setSearchedData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isLimitLoading, setIsLimitLoading] = useState();
  const [category, setCategory] = useState(paramsCategory);
  const [subCategories, setSubCategories] = useState(subCategory);
  const [search, setSearch] = useState(searchQuery);
  const [isSearched, setIsSearched] = useState(false);

  let AllProducts = isSearched && search ? searchedData : data;

  useEffect(() => {
    const FetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get(
          category && subCategories
            ? `/products?pagination[start]=0&pagination[limit]=${limit}&populate=*&[filters][categories][title][$eq]=${category}&[filters][sub_categories][title][$eq]=${subCategories}`
            : category
            ? `/products?pagination[start]=0&pagination[limit]=${limit}&populate=*&[filters][categories][title][$eq]=${category}`
            : `/products?pagination[start]=0&pagination[limit]=${limit}&populate=*`
        );
        setData(res?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    FetchProducts();
  }, [category, subCategories]);

  // Handle Search Products -------------------------------------------------

  const HandleSearchProducts = async () => {
    setIsSearched(true);
    router.push(`/shop?searchQuery=${search}`, { shallow: true });
    setCategory();
    setSubCategories();
    setIsLoading(true);
    try {
      const res = await axiosinstance.get(
        `/products?[filters][$or][0][title][$containsi]=${search}&[filters][$or][1][description][$containsi]=${search}&populate=*&pagination[limit]=${limit}`
      );
      setSearchedData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const HandleClearSearch = () => {
    setIsSearched(false);
    setSearch("");
    setCategory();
    setSubCategories();
    router.push(`/shop`, { shallow: true });
  };

  // EXTEND THE LIMIT OF PRODUCTS ----------------------------------------------------

  const LoadMoreProducts = async () => {
    setIsLimitLoading(true);
    let newLimit = limit + 20;
    setLimit(newLimit);
    try {
      let res;
      if (isSearched && search) {
        res = await axiosinstance.get(
          `/products?[filters][$or][0][title][$containsi]=${search}&[filters][$or][1][description][$containsi]=${search}&populate=*&pagination[start]=${limit}&pagination[limit]=${newLimit}`
        );
        setSearchedData((prev) => ({
          data: [...prev?.data, ...res?.data?.data],
          meta: prev.meta,
        }));
        setIsLimitLoading(false);
      } else {
        res = await axiosinstance.get(
          category && subCategories
            ? `/products?pagination[start]=${limit}&pagination[limit]=${newLimit}&populate=*&[filters][categories][title][$eq]=${category}&[filters][sub_categories][title][$eq]=${subCategories}`
            : category
            ? `/products?pagination[start]=${limit}&pagination[limit]=${newLimit}&populate=*&[filters][categories][title][$eq]=${category}`
            : `/products?pagination[start]=${limit}&pagination[limit]=${newLimit}&populate=*`
        );

        setData((prev) => ({
          data: [...prev?.data, ...res?.data?.data],
          meta: prev.meta,
        }));
        setIsLimitLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLimitLoading(false);
    }
  };

  console.log(AllProducts);

  // EXTEND THE LIMIT OF PRODUCTS ----------------------------------------------------

  useEffect(() => {
    paramsCategory && setCategory(paramsCategory);
    subCategory && setSubCategories(subCategory);
    searchQuery && setSearch(searchQuery);
  }, [paramsCategory, subCategory, searchQuery]);

  return (
    <>
      <TopBar />
      <div className="mainShopContainer">
        <div className="shopPageHeader">
          <div className="shopHeaderSearch">
            <div className="shopSearchBox">
              <input
                type="text"
                placeholder="Search Here"
                value={search || ""}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearched(false);
                }}
              />
              <label
                onClick={isSearched ? HandleClearSearch : HandleSearchProducts}
              >
                {isSearched ? (
                  <ClearIcon />
                ) : search ? (
                  <SendIcon />
                ) : (
                  <SearchIcon />
                )}
              </label>
            </div>

            <ShopCategories
              setCategory={setCategory}
              category={category}
              setSubCategories={setSubCategories}
            />
          </div>
          {category && (
            <ShopSubCategories
              category={category}
              subCategories={subCategories}
              setSubCategories={setSubCategories}
            />
          )}
        </div>

        <div className="innerShopContainer">
          {/* Main Profucts Grid Here ----------------------------- */}

          {isLoading ? (
            <ProductsSeklton />
          ) : (
            <div className="mainSHopProfuctsGrid">
              <div className="shopProductsGrid">
                {AllProducts?.data?.map((item) => {
                  return <CardProduct item={item} key={item?.id} />;
                })}
              </div>
              {(AllProducts?.data?.length >= limit ||
                !limit >= AllProducts?.data?.length) && (
                <div className="showMoreProducts">
                  <button
                    className="viewAllbth"
                    onClick={LoadMoreProducts}
                    disabled={isLimitLoading}
                  >
                    {isLimitLoading ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : (
                      <>
                        Load More Products
                        <span>
                          <ArrowRightAltIcon />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Main Profucts Grid Here ----------------------------- */}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Shop;
