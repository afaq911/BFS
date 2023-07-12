import BackBtnAuth from "@/components/BackBtnAuth";
import LoginForm from "@/components/LoginForm";
import AuthRouteLayout from "@/utils/AuthRouteLayout";
import React from "react";

const Login = () => {
  return (
    <AuthRouteLayout>
      <div className="mainAuthenticationContainer">
        <div className="innerAuthenticationContainer">
          <BackBtnAuth />
          <LoginForm />
        </div>
      </div>
    </AuthRouteLayout>
  );
};

export default Login;
