"use client";
import AuthRouteLayout from "@/utils/AuthRouteLayout";
import { axiosinstance } from "@/utils/axiosinstance";
import { ErrorNotificationHandler } from "@/utils/errorHandlers";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const HandleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosinstance.post("/auth/forgot-password", {
        email,
      });
      console.log(res);
      //   toast.success("Logged In Successfully");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      //   ErrorNotificationHandler(error);
      setIsLoading(false);
    }
  };

  return (
    <AuthRouteLayout>
      <div className="mainAuthenticationContainer">
        <div className="innerAuthenticationContainer">
          <div className="mainAuthenticationFormCard">
            <form className="AuthenticationForm">
              <div className="authenticationHeading">
                <h2>Login</h2>
                <p>with BFS</p>
              </div>

              <div className="inputAuthenticationContainer">
                <div className="inputBx">
                  <input
                    type="email"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button onClick={HandleForgotPassword} disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={30} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthRouteLayout>
  );
};

export default ForgotPassword;
