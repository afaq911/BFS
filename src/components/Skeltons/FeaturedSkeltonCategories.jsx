import { Skeleton } from "@mui/material";
import React from "react";
import "../../styles/skelton.css";

const FeaturedSkeltonCategories = () => {
  return (
    <div className="mainCategoriesGrid">
      {[1, 2, 3, 4]?.map((item) => {
        return (
          <div className="SekltonFeaturedCategory" key={item}>
            <Skeleton height={"200%"} width={"200%"} variant="rectangular" />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedSkeltonCategories;
