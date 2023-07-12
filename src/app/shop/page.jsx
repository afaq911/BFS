"use client";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import "../../styles/shop.css";
import { CardProduct } from "@/components/ProductCard";
import ProductsSeklton from "@/components/Skeltons/ProductsSeklton";
import SearchIcon from "@/components/Icons/SearchIcon";
import ShopCategories from "@/components/ShopCategories";
import ShopSubCategories from "@/components/ShopSubCategories";
import { axiosinstance } from "@/utils/axiosinstance";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/navigation";

const Shop = ({ searchParams }) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [searchedData, setSearchedData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [category, setCategory] = useState(searchParams?.category);
  const [subCategories, setSubCategories] = useState(searchParams?.subCategory);
  const [search, setSearch] = useState(searchParams?.searchQuery);
  const [isSearched, setIsSearched] = useState(false);

  let AllProducts = isSearched && search ? searchedData : data;

  useEffect(() => {
    const FetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get(
          category && subCategories
            ? `/products?pagination[start]=0&pagination[limit]=50&populate=*&[filters][categories][title][$eq]=${category}&[filters][sub_categories][title][$eq]=${subCategories}`
            : category
            ? `/products?pagination[start]=0&pagination[limit]=50&populate=*&[filters][categories][title][$eq]=${category}`
            : "/products?pagination[start]=0&pagination[limit]=50&populate=*"
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
        `/products?[filters][$or][0][title][$containsi]=${search}&[filters][$or][1][description][$containsi]=${search}&populate=*`
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

  console.log(category, subCategories);

  useEffect(() => {
    setCategory(searchParams?.category);
    setSubCategories(searchParams?.subCategory);
    setSearch(searchParams?.searchQuery);
  }, [searchParams]);

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
                value={search}
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
