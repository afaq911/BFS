import BackBtnAuth from "@/components/BackBtnAuth";
import RegisterForm from "@/components/RegisterForm";
import AuthRouteLayout from "@/utils/AuthRouteLayout";
import React from "react";

const Register = () => {
  return (
    <AuthRouteLayout>
      <div className="mainAuthenticationContainer">
        <div className="innerAuthenticationContainer">
          <BackBtnAuth />
          <RegisterForm />
        </div>
      </div>
    </AuthRouteLayout>
  );
};

export default Register;
