import { phone_options } from "@/constants/WebData";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const ShippingAddress = ({ HandleValues, values, setStage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const PostAutoCompletes = async (code) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://api.postcodes.io/postcodes/${code}`);
      setIsLoading(false);
      return res?.data?.result;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Form Validation ---------------------------------------------------------
  const HandleSubmitDetails = async () => {
    const postCode = await PostAutoCompletes(values?.postCode);

    if (!values?.username) {
      toast.error("Please enter your full name");
      return false;
    } else if (!values?.email) {
      toast.error("Please enter your email");
      return false;
    } else if (!values?.email?.includes("@")) {
      toast.error("Please enter valid email");
      return false;
    } else if (!values?.mobileno) {
      toast.error("Please enter Mobile Number");
      return false;
    } else if (!values?.postCode) {
      toast.error("Please enter your Post Code");
      return false;
    } else if (!postCode?.postcode) {
      toast.error("Please enter a valid post code");
      return false;
    } else if (!values?.city) {
      toast.error("Please enter your city");
      return false;
    } else if (!values?.street) {
      toast.error("Please enter street number");
      return false;
    } else {
      setStage(2);
      return true;
    }
  };

  return (
    <div className="mainShippingAddressForm">
      <h2>Shipping Details</h2>

      <div className="innerShippingAddressForm">
        <div className="inputBxGrid">
          <div className="inputBx">
            <input
              type="text"
              placeholder="Full Name"
              name="username"
              defaultValue={values?.username}
              onChange={HandleValues}
            />
          </div>
          <div className="inputBx">
            <input
              type="email"
              name="email"
              value={values?.email}
              placeholder="Email"
              onChange={HandleValues}
            />
          </div>
        </div>
        <div className="inputBxGrid">
          <div className="inputBx mobile">
            <PhoneInput
              {...phone_options}
              onChange={(e) => HandleValues(e, "mobileno")}
              value={values?.mobileno}
              name="mobileno"
            />
            <label>Mobile No ( For Delivery Calls )</label>
          </div>
          <div className="inputBx mobile">
            <PhoneInput
              {...phone_options}
              onChange={(e) => HandleValues(e, "additional_mobileno")}
              value={values?.additional_mobileno}
              name="additional_mobileno"
            />
            <label>Additional Mobile No ( Optional )</label>
          </div>
        </div>

        <h2 className="formInnerHeading">
          <span>Shipping Address</span>
        </h2>

        <div className="inputBxGrid">
          <div className="inputBx">
            <input
              type="text"
              placeholder="Post Code"
              name="postCode"
              value={values?.postCode}
              onChange={HandleValues}
            />
          </div>
          <div className="inputBx">
            <input
              type="email"
              placeholder="City"
              name="city"
              value={values?.city}
              onChange={HandleValues}
            />
          </div>
          <div className="inputBx">
            <input
              type="text"
              name="street"
              placeholder="Street / House Number"
              value={values?.street}
              onChange={HandleValues}
            />
          </div>
          <div className="inputBx">
            <input
              type="email"
              name="address"
              value={values?.address}
              placeholder="Full Address"
              onChange={HandleValues}
            />
          </div>
        </div>
      </div>

      <div className="inputAuthenticationContainer">
        <button onClick={HandleSubmitDetails} disabled={isLoading}>
          {isLoading ? <CircularProgress size={25} color="inherit" /> : "Next"}
        </button>
      </div>
    </div>
  );
};

export default ShippingAddress;
