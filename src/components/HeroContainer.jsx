"use client";
import React, { useEffect, useState } from "react";
import "../styles/herocontainer.css";
import { HeroCounts } from "@/constants/WebData";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { axiosinstance } from "@/utils/axiosinstance";
import Link from "next/link";

const HeroContainer = () => {
  const [data, setData] = useState();

  const filterData = (data, type) => {
    return data?.data?.filter(
      (item) => item?.attributes?.banner_number === type
    );
  };

  useEffect(() => {
    const GetBanners = async () => {
      try {
        const res = await axiosinstance.get("/home-banners?populate=*");
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetBanners();
  }, []);

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
          {data ? (
            <Carousel
              className="LeftImages"
              ariaLabel="Hello"
              autoPlay
              emulateTouch
              infiniteLoop
              showStatus={false}
              stopOnHover
            >
              {filterData(data, "one")?.map((item) => {
                return (
                  <div className="mainLeftImg" key={item?.id}>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        item?.attributes?.bannerimg?.data?.attributes?.url
                      }
                      alt="ImagesHero"
                      fill="cover"
                      className="heroMainImgs"
                    />

                    <div className="textInfoDetails">
                      <h2>{item?.attributes?.title}</h2>

                      <Link href={item?.attributes?.url}>
                        <button>Shop Now</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          ) : null}
          <div className="RightImages">
            {filterData(data, "two")?.length && (
              <div className="rightImgBx">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    filterData(data, "two")[0]?.attributes?.bannerimg?.data
                      ?.attributes?.url
                  }
                  fill="cover"
                  alt="ImagesHero"
                  className="heroMainImgs"
                />

                <div className="right_text_details">
                  <Link href={filterData(data, "two")[0]?.attributes?.url}>
                    <h2>Stylish Beds</h2>
                  </Link>
                </div>
              </div>
            )}
            <div className="CtaHeroBx">
              <label htmlFor="" className="ctx_text">
                Shop
              </label>
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
