"use client";
import React, { useContext, useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { axiosinstance } from "@/utils/axiosinstance";
import { ErrorNotificationHandler } from "@/utils/errorHandlers";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/userSlice";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { RedirectGoogleContext } from "@/providers/RedirectGoogleProvider";

const LoginForm = ({ redirect }) => {
  const { googleRedirect, SetRedirectUrl, ClearRedirectUrl } = useContext(
    RedirectGoogleContext
  );
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = redirect ? redirect : useSearchParams().get("redirect");
  const dispatch = useDispatch();
  const location = window.location.href?.split("?").pop();

  const Redirect = (url) => {
    window.location.href = url;
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosinstance.post("auth/local", {
        ...values,
      });
      dispatch(userLogin(res.data));
      toast.success("Logged In Successfully");
      params ? Redirect(params) : Redirect("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      ErrorNotificationHandler(error);
      setIsLoading(false);
    }
  };

  const HandleValues = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Google Authentication ---------------------------------------------------------

  const HandleGoogleAuth = async (e) => {
    e.preventDefault();
    SetRedirectUrl(params);
    let link = process.env.NEXT_PUBLIC_URL + "/connect/google";
    window.location.href = link;
  };

  // Verify User With Tokken -----------------------------------------------------
  useEffect(() => {
    if (location?.includes("id_token")) {
      const GetUserLoginInfo = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(
            process.env.NEXT_PUBLIC_URL + "/auth/google/callback?" + location
          );
          toast.success("Logged In Successfully");
          setIsLoading(false);

          // -------------------------------------
          ClearRedirectUrl();
          googleRedirect ? Redirect(googleRedirect) : Redirect("/");

          // ------------------------- Set User with redux toolkit
          dispatch(userLogin(res.data));
        } catch (error) {
          setIsLoading(false);
          ErrorNotificationHandler(error);
          console.log(error);
        }
      };
      GetUserLoginInfo();
    }
  }, [location]);

  return (
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
              name="identifier"
              onChange={HandleValues}
            />
          </div>
          <div className="inputBx">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={HandleValues}
            />
          </div>

          <button onClick={HandleLogin} disabled={isLoading}>
            {isLoading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="orAuthenticationLine">
          <h2>OR</h2>
        </div>

        <div className="otherLoginOptions">
          <button disabled={isLoading} onClick={HandleGoogleAuth}>
            <GoogleIcon /> Continue with Google
          </button>
        </div>

        <div className="bottomtextForm">
          <p>
            Don&apos;t have an account ?{" "}
            <Link href={params ? `/register?redirect=${params}` : "/register"}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
