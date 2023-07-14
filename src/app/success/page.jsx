"use client";
import React, { useEffect } from "react";
import "../../styles/success.css";
import Image from "next/image";
import { axiosinstance } from "@/utils/axiosinstance";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { EmptyCart } from "@/redux/cartSlice";
import Link from "next/link";

const Success = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stripe_id = useSearchParams().get("payment_intent");

  useEffect(() => {
    const ConfirmOrderStatus = async () => {
      try {
        await axiosinstance.put(`/orders/${stripe_id}`, {
          data: {},
        });

        dispatch(EmptyCart({ showToast: "none" }));

        setTimeout(() => {
          router.push("/");
        }, 10000);
      } catch (error) {
        console.log(error);
      }
    };

    stripe_id ? ConfirmOrderStatus() : router.push("/");
  }, [stripe_id]);

  return (
    <div className="mainSuccessContainer">
      <div className="innerOrderSuccessContainer">
        <div className="successOrderImage">
          <Image
            src={require("../../media/orderConfirm.jpg")}
            alt="OrderConfirmed"
            fill="cover"
          />
        </div>

        <div className="orderSuccessDetails">
          <h2>Your Order Has Been Placed Successfully</h2>

          <p>You will recive a order confirmation call to arrange delivery .</p>

          <Link href={"/shop"}>
            <button>Continue Shoping</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
