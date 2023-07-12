import { Skeleton } from "@mui/material";
import React from "react";

const CategoryDropDownSkelton = () => {
  return (
    <div className="innerCategoriesDropDown">
      {[1, 2, 3, 4, 5]?.map((item) => {
        return (
          <div className="categoriesBxListing" key={item}>
            <div className="headerCategoriesDropDown">
              <Skeleton style={{ height: "30px", width: "100%" }} />
            </div>

            <div className="categoriesListingLists">
              <ul>
                <li>
                  <Skeleton style={{ height: "15px", width: "100%" }} />
                </li>
                {[1, 2, 3, 4]?.map((subCat) => {
                  return (
                    <li key={subCat}>
                      <Skeleton style={{ height: "15px", width: "100%" }} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryDropDownSkelton;
