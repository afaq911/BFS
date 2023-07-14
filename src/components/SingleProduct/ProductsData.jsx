import React, { useEffect, useState } from "react";
import RatingStars from "@/components/ReactStars";
import ShopingCartIcon from "@/components/Icons/ShopingCartIcon";
import PhoneIcon from "@/components/Icons/PhoneIcon";
import QuantityInput from "@/components/QuantityInput";
import WhatsappIcon from "@/components/Icons/WhatsappIcon";
import { useDispatch } from "react-redux";
import { AddtoCart } from "@/redux/cartSlice";
import GenerateRandomId from "@/utils/GenerateRandomId";
import dynamic from "next/dynamic";
import Link from "next/link";
import { axiosinstance } from "@/utils/axiosinstance";

const ProductsData = ({ data, productData, setProductData }) => {
  const dispatch = useDispatch();
  let descriptionLimit = 140;
  const [showDescription, setShowDescription] = useState(false);
  const [contactNumbers, setContactNumbers] = useState();
  const DirectOrderComponent = dynamic(() => import("../OrderDirectPopup"), {
    ssr: false,
  });
  const [isDirectOrderPopup, setIsDirectOrderPopup] = useState(false);
  let newPrice =
    data?.data?.attributes?.price + (productData?.size?.price || 0);

  let whatsAppTextMessage = `Hi , I want to buy ${data?.data?.attributes?.title} (Refrence Link : ${window.location.href})`;

  // Adding to Cart --------------------------------------------------------------

  const HandleAddtoCart = () => {
    let newProduct = {
      id: data?.data?.id,
      uniqueId: GenerateRandomId(data?.data?.id),
      image: data?.data?.attributes?.thumbnail?.data?.attributes?.url,
      title: data?.data?.attributes?.title,
      description: data?.data?.attributes?.description,
      quantity: productData?.quantity,
      color: productData?.color,
      totalPrice: newPrice * productData?.quantity,
      price: newPrice,
      size: productData?.size,
    };

    dispatch(AddtoCart(newProduct));
  };

  // Toggle Direct Order ---------------------------------------------------------

  const ToggleDirectOrder = () => {
    setIsDirectOrderPopup(!isDirectOrderPopup);
  };

  // Selection Functions ----------------------------------------------------------

  const isColorActive = (data) => {
    return productData?.color === data ? "active" : "";
  };

  const UpdateColor = (color) => {
    setProductData((prev) => ({ ...prev, color }));
  };

  useEffect(() => {
    const GetContactDetails = async () => {
      try {
        const res = await axiosinstance.get(`/contact-numbers`);
        setContactNumbers(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetContactDetails();
  }, [data]);

  return (
    <>
      <div className="ViewProductDetails">
        <h2 className="titleProduct">{data?.data?.attributes?.title}</h2>
        {data?.data?.attributes?.description?.length <= descriptionLimit ? (
          <p className="ProductDescription">
            {data?.data?.attributes?.description}
          </p>
        ) : (
          <p className="ProductDescription">
            {showDescription
              ? data?.data?.attributes?.description
              : data?.data?.attributes?.description?.slice(0, descriptionLimit)}
            <span onClick={() => setShowDescription(!showDescription)}>
              {showDescription ? "Less" : "More"}
            </span>
          </p>
        )}

        <div className="productRatings">
          <div className="ratingsStars">
            <RatingStars value={data?.data?.attributes?.rating} size={35} />
          </div>

          <p>
            {data?.data?.attributes?.rating}{" "}
            <span>({data?.data?.attributes?.rating})</span>
          </p>
        </div>

        {data?.data?.attributes?.options?.colors && (
          <div className="productColorsAvailble">
            <h2>Colors Available</h2>

            <div className="colorsTabAvailable">
              {data?.data?.attributes?.options?.colors?.map((item) => {
                return (
                  <label
                    key={item}
                    className={`${isColorActive(item)}`}
                    onClick={() => UpdateColor(item)}
                  >
                    <span style={{ background: item }}></span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {data?.data?.attributes?.options?.sizes?.length && (
          <div className="productColorsAvailble">
            <h2>Sizes Available</h2>

            <div className="sizesTabAvailable">
              {data?.data?.attributes?.options?.sizes?.map((item) => {
                return (
                  <label
                    onClick={() =>
                      setProductData((prev) => ({ ...prev, size: item }))
                    }
                    key={item?.name}
                    style={{
                      border:
                        productData?.size?.name === item?.name
                          ? "2px solid #000"
                          : "1px solid #e0e0e0",
                    }}
                  >
                    <span>{item?.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="productQualityAvailble">
          <h2>Select quantity</h2>

          <QuantityInput
            productData={productData}
            setProductData={setProductData}
          />
        </div>

        <div className="productCallToAction">
          {data?.data?.attributes?.directOrder ? (
            <button onClick={ToggleDirectOrder}>
              <span>
                <ShopingCartIcon />
              </span>
              Order Now
            </button>
          ) : (
            <button onClick={HandleAddtoCart}>
              <span>
                <ShopingCartIcon />
              </span>
              Add to cart
            </button>
          )}

          <label className="SingleProductPrice">£{newPrice}</label>
        </div>

        <div className="orLineShopingOptions">
          <p>OR</p>
        </div>

        <p className="othercalltoactionsHeading">
          Save 5% with direct order on
        </p>

        <div className="otherBuyingOptions">
          {contactNumbers?.data?.map((item) => {
            if (item?.attributes?.type === "whatsapp") {
              return (
                <Link
                  href={`//api.whatsapp.com/send?phone=${item?.attributes?.number}&text=${whatsAppTextMessage}`}
                  target="_blank"
                  key={item?.id}
                >
                  <button>
                    <span>
                      <WhatsappIcon />
                    </span>
                    WhatsApp
                  </button>
                </Link>
              );
            } else if (item?.attributes?.type === "call") {
              return (
                <Link
                  href={`tel:${item?.attributes?.number}`}
                  key={item?.id}
                  target="_blank"
                >
                  <button>
                    <span>
                      <PhoneIcon />
                    </span>
                    Call
                  </button>
                </Link>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>

      {isDirectOrderPopup && (
        <DirectOrderComponent
          ToggleDirectOrder={ToggleDirectOrder}
          data={data?.data}
          price={newPrice}
          quantity={productData?.quantity}
          size={productData?.size}
          color={productData?.color}
          whatsAppNumber={contactNumbers?.data?.filter(
            (item) => item?.attributes?.type === "whatsapp"
          )}
        />
      )}
    </>
  );
};

export default ProductsData;
