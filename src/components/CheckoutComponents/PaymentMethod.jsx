import React from "react";

const PaymentMethod = () => {
  return (
    <div className="mainPaymentContainer">
      <div className="innerPaymentContainer">
        <h2>Payment Method</h2>

        <div className="paymettypeselectorgrid">
          <div className="paymentTypeInputBx">
            <div className="paymentDetailsType">
              <h4>Full Payment</h4>
              <p>Pay full price Now</p>
            </div>
            <div className="paymentactiveRadioIcons">
              <label></label>
            </div>
          </div>
          <div className="paymentTypeInputBx">
            <div className="paymentDetailsType">
              <h4>Interest free credit</h4>
              <p>Pay full price Now</p>
            </div>
            <div className="paymentactiveRadioIcons">
              <label></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentMethodCard = () => {
  return <div className=""></div>;
};

export default PaymentMethod;
