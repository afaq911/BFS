"use client";
import { RedirectGoogleContext } from "@/providers/RedirectGoogleProvider";
import AuthRouteLayout from "@/utils/AuthRouteLayout";
import { axiosinstance } from "@/utils/axiosinstance";
import { ErrorNotificationHandler } from "@/utils/errorHandlers";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { googleRedirect, ClearRedirectUrl } = useContext(
    RedirectGoogleContext
  );
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useSearchParams().get("redirect");
  const code = useSearchParams().get("code");
  const router = useRouter();

  const Redirect = (link) => {
    router.push(link);
  };

  // Reset Password in back end -----------------------------------------------

  const HandleResetPassword = async (e) => {
    e.preventDefault();
    if (SetPassValidation()) {
      setIsLoading(true);
      try {
        await axiosinstance.post("/auth/reset-password", {
          code: code,
          password: pass?.password,
          passwordConfirmation: pass?.passwordConfirmation,
        });
        toast.success("Password Updated");
        googleRedirect ? Redirect(googleRedirect) : Redirect("/login");
        ClearRedirectUrl();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        ErrorNotificationHandler(error);
        setIsLoading(false);
      }
    }
  };

  // Set Password Validation -----

  const SetPassValidation = () => {
    if (!pass?.password) {
      toast.error("Please enter new password");
      return false;
    } else if (!pass?.passwordConfirmation) {
      toast.error("Please enter confirm password");
      return false;
    } else if (pass?.passwordConfirmation !== pass?.password) {
      toast.error("Password & Confirm Password must be same");
      return false;
    } else {
      return true;
    }
  };

  // Get Reset Password Email Link
  const HandleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosinstance.post("/auth/forgot-password", {
        email,
      });
      toast.success("Email Sent successfully");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      ErrorNotificationHandler(error);
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
                {code ? <h2>Reset Password</h2> : <h2>Forgot Password</h2>}
                <p>with BFS</p>
              </div>

              <div className="inputAuthenticationContainer">
                {code ? (
                  <>
                    <div className="inputBx">
                      <input
                        type="password"
                        placeholder="New Password"
                        onChange={(e) =>
                          setPass((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="inputBx">
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        onChange={(e) =>
                          setPass((prev) => ({
                            ...prev,
                            passwordConfirmation: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <button onClick={HandleResetPassword} disabled={isLoading}>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={30} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="inputBx">
                      <input
                        type="email"
                        placeholder="Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={HandleForgotPassword}
                      disabled={isLoading || !email}
                    >
                      {isLoading ? (
                        <CircularProgress color="inherit" size={30} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </>
                )}

                <div className="bottomtextForm">
                  <p>
                    Already have an account ?{" "}
                    <Link
                      href={
                        googleRedirect
                          ? `/login?redirect=${googleRedirect}`
                          : "/login"
                      }
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthRouteLayout>
  );
};

export default ForgotPassword;
