"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProductGallery = ({ images, color, size }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [activeImageData, setActiveImageData] = useState(
    images?.data[activeImg]?.attributes?.url
  );

  const isActive = (data) => {
    if (data === activeImg) {
      return "active";
    } else {
      return false;
    }
  };

  const SlideContainer = (direction) => {
    const maxValue = images?.data?.length - 1;
    if (direction === "next") {
      activeImg < maxValue ? setActiveImg((prev) => prev + 1) : setActiveImg(0);
    } else {
      activeImg > 0 ? setActiveImg((prev) => prev - 1) : setActiveImg(maxValue);
    }
  };

  // Show Image with the active color ---------------------------------------
  useEffect(() => {
    let imagesArray = images?.data;
    let activeColouredImg = imagesArray?.findIndex(
      (item) =>
        item?.attributes?.caption === color?.replaceAll(" ", "") ||
        item?.attributes?.caption
          ?.split(",")
          ?.includes(color?.replaceAll(" ", ""))
    );

    if (activeColouredImg >= 0 && activeColouredImg <= imagesArray?.length) {
      setActiveImg(activeColouredImg);
    } else {
      setActiveImg(0);
    }
  }, [color]);

  // Show Image with the active size ---------------------------------------
  useEffect(() => {
    let imagesArray = images?.data;
    let activeColouredImg = imagesArray?.findIndex(
      (item) =>
        item?.attributes?.caption === size?.replaceAll(" ", "") ||
        item?.attributes?.caption
          ?.replaceAll(" ", "")
          ?.split(",")
          ?.includes(size?.replaceAll(" ", ""))
    );

    if (activeColouredImg >= 0 && activeColouredImg <= imagesArray?.length) {
      setActiveImg(activeColouredImg);
    } else {
      setActiveImg(0);
    }
  }, [size]);

  // Activate image with indeo ---------------------------------------------------
  useEffect(() => {
    setActiveImageData(images?.data[activeImg]?.attributes?.url);
  }, [activeImg]);

  return (
    <div className="ViewProductImages">
      <div className="viewProductDisplayImg">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + activeImageData}
          style={{
            objectFit:
              images?.data[activeImg]?.attributes?.alternativeText || "contain",
          }}
          fill={
            images?.data[activeImg]?.attributes?.alternativeText || "contain"
          }
          quality={100}
          alt="ProductImages"
          className="MainProductDisplayImg"
        />

        <div className="sliderIconsMainSLiderImg">
          <label onClick={() => SlideContainer("prev")}>
            <ArrowBackIosIcon />
          </label>
          <label onClick={() => SlideContainer("next")}>
            <ArrowForwardIosIcon />
          </label>
        </div>
      </div>

      <div className="viewProductDisplayImagesGrid">
        {images?.data?.map((item, index) => {
          return (
            <div
              className={`displayGridImgBx ${isActive(index)}`}
              key={item?.id}
              onClick={() => setActiveImg(index)}
            >
              <Image
                src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.attributes?.url}
                fill={item?.attributes?.alternativeText || "contain"}
                style={{
                  objectFit: item?.attributes?.alternativeText || "contain",
                }}
                quality={100}
                alt="ProductImages"
                className="ProductOtherImages"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;
