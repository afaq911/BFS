"use client";
import { createContext, useEffect, useState } from "react";

export const RedirectGoogleContext = createContext();

const GoogleRedirectProvider = ({ children }) => {
  const [redirect, setRedirect] = useState(
    window.localStorage.getItem("googleRedirectUrl") || ""
  );

  const SetRedirectUrl = (url) => {
    setRedirect(url);
    window.localStorage.setItem("googleRedirectUrl", url);
  };

  const ClearRedirectUrl = () => {
    setRedirect("");
    window.localStorage.removeItem("googleRedirectUrl");
  };

  useEffect(() => {
    setRedirect(window.localStorage.getItem("googleRedirectUrl") || "");
  }, []);

  return (
    <RedirectGoogleContext.Provider
      value={{
        SetRedirectUrl,
        ClearRedirectUrl,
        googleRedirect: redirect,
      }}
    >
      {children}
    </RedirectGoogleContext.Provider>
  );
};

export default GoogleRedirectProvider;
