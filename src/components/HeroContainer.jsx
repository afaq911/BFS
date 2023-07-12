"use client";
import React from "react";
import "../styles/herocontainer.css";
import { HeroCounts } from "@/constants/WebData";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";

const HeroContainer = () => {
  return (
    <div className="heroContainer">
      <div className="innerHeroContainer">
        <h2 className="mainHeroHeading">British Furniture</h2>
        <div className="subheading">Suppliers</div>
        <div className="heroDetailsInfo">
          <div className="heroTextInfo">
            <p>
              Shop stylish furniture online. Find quality pieces for every room.
              Free shipping and easy returns. Discover your perfect home style.
              Shop stylish furniture online. Find quality pieces for every room.
              Free shipping and easy returns. Discover your .
            </p>
          </div>

          <div className="mainHeroCounts">
            {HeroCounts?.map((item) => (
              <div className="CountBx" key={item?.count}>
                <h2>
                  {item?.count}
                  <span>
                    <Image
                      src={require("../media/add.svg")}
                      alt="ADD"
                      fill="cover
                      "
                      className="plusImg"
                    />
                  </span>
                </h2>
                <p>{item?.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="heroInnerImages">
          <div className="LeftImages">
            <div className="mainLeftImg">
              <Image
                src={require("../media/categoryImgs/banner-sofas.png")}
                alt="ImagesHero"
                fill="cover"
                className="heroMainImgs"
              />
            </div>
          </div>
          <div className="RightImages">
            <div className="rightImgBx">
              <Image
                src={require("../media/categoryImgs/chair-hero.jpg")}
                fill="cover"
                alt="ImagesHero"
                className="heroMainImgs"
              />
            </div>
            <div className="CtaHeroBx">
              <NorthEastIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="backBlurBxs first"></div>
      <div className="backBlurBxs second"></div>
      <div className="backBlurBxs third"></div>
      <div className="backBlurBxs fourth"></div>
    </div>
  );
};

export default HeroContainer;
