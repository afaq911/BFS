"use client";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosinstance } from "@/utils/axiosinstance";
import { ErrorNotificationHandler } from "@/utils/errorHandlers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/userSlice";
import { CircularProgress } from "@mui/material";
import { phone_options } from "@/constants/WebData";
import PhoneInput from "react-phone-input-2";

const RegisterForm = () => {
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useSearchParams().get("redirect");
  const dispatch = useDispatch();

  const Redirect = (url) => {
    window.location.href = url;
  };

  const HandleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosinstance.post("/auth/local/register", {
        ...values,
      });
      dispatch(userLogin(res.data));
      toast.success("Registered successfully");
      redirect ? Redirect(redirect) : Redirect("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      ErrorNotificationHandler(error);
      setIsLoading(false);
    }
  };

  // Google Authentication ---------------------------------------------------------

  const HandleGoogleAuth = async (e) => {
    e.preventDefault();
    let link = process.env.NEXT_PUBLIC_URL + "/connect/google";
    window.location.href = link;
  };

  const HandleValues = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="mainAuthenticationFormCard">
      <form className="AuthenticationForm">
        <div className="authenticationHeading">
          <h2>Register</h2>
          <p>with BFS</p>
        </div>

        <div className="inputAuthenticationContainer">
          <div className="inputBx">
            <input
              type="text"
              placeholder="User Name"
              name="username"
              onChange={HandleValues}
            />
          </div>
          <div className="inputBx">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={HandleValues}
            />
          </div>
          <div className="inputBx">
            <PhoneInput
              {...phone_options}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, ["mobileno"]: e }))
              }
              value={values?.additional_mobileno}
              name="mobileno"
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

          <button onClick={HandleRegister} disabled={isLoading}>
            {isLoading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Register"
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
            Already have an account ?{" "}
            <Link href={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
