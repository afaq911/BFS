import React from "react";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import NewsLetter from "@/components/NewsLetter";
import "../../styles/categories.css";
import CategoriesCard from "@/components/CategoriesCard";
import useServerFetch from "@/utils/useServerFetch";
import SearchIcon from "@/components/Icons/SearchIcon";

export default async function Categories() {
  const data = await useServerFetch(`/categories?populate=*`);

  return (
    <>
      <TopBar />

      <div className="mainCategoriesPage">
        <div className="innerCategoriesPage">
          <div className="mainCategoriesPageHeader">
            <h2>Categories</h2>

            <div className="categoriesSearchBox">
              <input type="text" placeholder="Search Here" />
              <label>
                <SearchIcon />
              </label>
            </div>
          </div>

          <div className="mainGridCategoryBox">
            <div className="mainInnerCategoriesGrid">
              {data?.data?.map((item) => {
                return <CategoriesCard item={item} key={item?.id} />;
              })}
            </div>

            <div className="backBlurBxs first"></div>
            <div className="backBlurBxs second"></div>
            <div className="backBlurBxs third"></div>
            <div className="backBlurBxs fourth"></div>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
}
