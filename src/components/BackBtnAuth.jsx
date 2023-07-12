"use client";
import Link from "next/link";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const BackBtnAuth = () => {
  return (
    <div className="backBtnAuthentication">
      <Link href={"/"}>
        <KeyboardBackspaceIcon />
      </Link>
    </div>
  );
};

export default BackBtnAuth;
