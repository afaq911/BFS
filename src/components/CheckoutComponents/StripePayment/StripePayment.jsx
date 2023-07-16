import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { axiosinstance } from "@/utils/axiosinstance";
import { useSelector } from "react-redux";
import CheckoutPayFormSkelton from "@/components/Skeltons/CheckoutPayFormSkelton";
import { Skeleton } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51KFJnqCSsuQl1s5iYKUTclxtP86dyyc8CD5Uaof5n7oiNtY05colukj68wmB77DAUJtFSHworGoCz0bP2YYoTbe100C6cf4WWk"
);

const StripePayment = ({ values }) => {
  const currentUser = useSelector((state) => state.user.user);
  const cartProducts = useSelector((state) => state.cart.cart);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const CreateOrder = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.post("/orders", {
          products: cartProducts,
          subTotal,
          userId: currentUser?.user?.id,
          shipping_address: values,
        });

        setClientSecret(res.data?.clientSecret);
        setOrderDetails(res?.data?.orderDetails);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    CreateOrder();
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#FA698E",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="mainStripePaymentContainer">
      {isLoading ? (
        <div className="mainLoaderContainer">
          <div className="loader_checkout_form">
            <CheckoutPayFormSkelton />
          </div>
          <div className="skeltonBtn">
            <Skeleton width={"200%"} height={"200%"} />
          </div>
        </div>
      ) : (
        <div className="innerStripPaymentContainer">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <StripeCheckoutForm orderDetails={orderDetails} values={values} />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default StripePayment;
