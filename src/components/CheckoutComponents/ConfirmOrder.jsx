import React from "react";
import CartItems from "../CartComponents/CartItems";

const ConfirmOrder = ({ values, setStage }) => {
  return (
    <div className="mainChexkoutOrderConfirmation">
      <div className="mainConfirmationContainer">
        <div className="confirmProducts">
          <CartItems hidecta={true} />
        </div>
        <div className="confirmDetails">
          <div className="innerConfirmDetails">
            <div className="addressDetailsBx">
              <div className="detailsBx">
                <p>Full Name</p>
                <h4>{values?.username}</h4>
              </div>
              <div className="detailsBx">
                <p>Email</p>
                <h4>{values?.email}</h4>
              </div>
              <div className="detailsBx">
                <p>Mobile Number</p>
                <h4>{values?.mobileno}</h4>
              </div>
              <div className="detailsBx">
                <p>Address</p>
                <h4>
                  {values?.username +
                    ", " +
                    values?.street +
                    ", " +
                    values?.city +
                    ", " +
                    values?.postCode}
                </h4>
              </div>

              <div className="confirmandPayBtn">
                <button onClick={() => setStage(3)}>Confirm & Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
