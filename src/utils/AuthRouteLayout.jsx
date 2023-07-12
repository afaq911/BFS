"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthRouteLayout = ({ children }) => {
  const router = useRouter();
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return <>{children}</>;
};

export default AuthRouteLayout;
