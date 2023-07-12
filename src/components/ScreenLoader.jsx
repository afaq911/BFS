"use client";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ScreenLoader = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          color: "#FA698E",
        }}
      >
        <CircularProgress size={100} color="inherit" />
      </Box>
    </div>
  );
};

export default ScreenLoader;
