"use client";
import Image from "next/image";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { RemoveFromCart, UpdateCart } from "@/redux/cartSlice";

const CartProduct = ({ item, hidecta }) => {
  const dispatch = useDispatch();

  const RemoveSingleItem = () => {
    dispatch(RemoveFromCart(item));
  };

  const HandleUpdateCart = (action) => {
    if (item?.quantity <= 1 && action === "subtract") {
      RemoveSingleItem();
    } else {
      dispatch(UpdateCart({ uniqueId: item?.uniqueId, action }));
    }
  };

  return (
    <div className="mainCartProductContainer">
      <div className="innerCardProduct">
        <div className="ProductImgCart">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.image}
            alt="CartProduct01"
            fill="cover"
            style={{
              objectFit: "cover",
            }}
            className="CartProductImg"
          />
        </div>

        <div className="cartProductInfo">
          <div className="productDetails">
            <div>
              <h2>{`${item?.size?.name ? item?.size?.name + "-" : ""} ${
                item?.title
              }`}</h2>
              <p className="profuctAvailability">Available</p>
            </div>

            <label className="cartProductPrice">
              <h2>£{item?.price}</h2>
            </label>
          </div>

          <div className="cartProductOrderInfo">
            <div className="cartProductColors">
              <h2>Color </h2>

              <label
                className="productColor"
                style={{ background: item?.color }}
              ></label>
            </div>
            {!hidecta ? (
              <>
                <div className="productQuantityInfo">
                  <div className="quantityInputBx">
                    <button onClick={() => HandleUpdateCart("subtract")}>
                      -
                    </button>
                    <input
                      type="number"
                      value={item?.quantity}
                      disabled={true}
                    />
                    <button onClick={() => HandleUpdateCart("add")}>+</button>
                  </div>
                </div>

                <button
                  className="removeCartProductBtn"
                  onClick={RemoveSingleItem}
                >
                  <DeleteIcon />
                </button>
              </>
            ) : (
              <div className="quantityInputBx">
                <h2>Quantity :</h2>{" "}
                <input type="number" disabled value={item?.quantity} />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
