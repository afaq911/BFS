"use client";
import React from "react";
import Rating from "@mui/material/Rating";
import GradeSharpIcon from "@mui/icons-material/GradeSharp";

const RatingStars = ({ size, value }) => {
  return (
    <Rating
      name="read-only"
      value={value}
      readOnly
      style={{ color: "#ffd700", fontSize: `${size}px` }}
      precision={0.1}
      emptyIcon={<GradeSharpIcon style={{ fontSize: `${size}px` }} />}
    />
  );
};

export default RatingStars;
