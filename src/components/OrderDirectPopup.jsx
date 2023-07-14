import React, { useState } from "react";
import "../styles/orderdirectpopup.css";
import CloseIcon from "@mui/icons-material/Close";
import { phone_options } from "@/constants/WebData";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosinstance } from "@/utils/axiosinstance";
import { CircularProgress } from "@mui/material";

const OrderDirectPopup = ({
  ToggleDirectOrder,
  data,
  price,
  quantity,
  size,
  color,
  whatsAppNumber,
}) => {
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let totalPrice = price * quantity;

  const HandlePlaceOrder = async () => {
    if (await HandleValidate()) {
      setIsLoading(true);
      try {
        const res = await axiosinstance.post("/direct-orders", {
          values: values,
          orderData: {
            product: data,
            quantity,
            size,
            color,
          },
          totalPrice,
        });
        toast.success(res?.data?.message);
        setIsLoading(false);
        ToggleDirectOrder();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  //   Validate Users Data --------------------------------------------------------

  const PostAutoCompletes = async (code) => {
    try {
      const res = await axios.get(`https://api.postcodes.io/postcodes/${code}`);

      return res?.data?.result;
    } catch (error) {
      console.log(error);
    }
  };

  // Form Validation ---------------------------------------------------------
  const HandleValidate = async () => {
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
      return true;
    }
  };

  //   Handle Values ------------------------------------------------------------------

  const HandleValues = (e, name) => {
    name
      ? setValues((prev) => ({ ...prev, [name]: e }))
      : setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="mainDirectOrderPopup">
      <div className="innerDirectOrder">
        <div className="directOrderPopupHeader">
          <h2>Place Order Directly</h2>

          <button className="closeDirectPopup" onClick={ToggleDirectOrder}>
            <CloseIcon />
          </button>
        </div>

        <div className="innerBodyOrderPlaceMent">
          <div className="productOrderDirectDetails">
            <div className="productImg">
              <Image
                src={
                  process.env.NEXT_PUBLIC_IMAGE_URL +
                  data?.attributes?.thumbnail?.data?.attributes?.url
                }
                fill="cover"
                alt="DirectOrderProductImg"
              />
            </div>
            <div className="productDetails">
              <h2>{data?.attributes?.title}</h2>
              <h4 className="quanityDirectOrder">
                Quantity : <span>{quantity}</span>
              </h4>
              <h4 className="quanityDirectOrder">
                Size : <span>{size?.name}</span>
              </h4>
              <h4 className="quanityDirectOrder">
                Color :
                <span className="color" style={{ background: color }}></span>
              </h4>
              <label className="priceDirectOrder">
                Total : <span>£{totalPrice}</span>
              </label>
            </div>
          </div>
          <div className="innerFormDataDetails">
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
        </div>

        <div className="submitDirectOrder">
          <button onClick={HandlePlaceOrder} disabled={isLoading}>
            {isLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDirectPopup;
