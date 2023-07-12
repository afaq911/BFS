import React from "react";
import LoginForm from "../LoginForm";

const CheckOutAuth = ({ setStage }) => {
  return (
    <div className="maincheckoutAuthContainer">
      <div className="innerAuthenticationContainer">
        <LoginForm redirect={"/checkout"} />
      </div>

      <div className="skipcheckoutContainer">
        <div className="innerSkipCheckoutContainer">
          <div className="skipCheckoutBtn">
            <h2>Continue By Adding Manual Information</h2>

            <button onClick={() => setStage(1)}>Skip Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutAuth;
