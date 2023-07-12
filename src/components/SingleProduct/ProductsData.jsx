import React from "react";
import RatingStars from "@/components/ReactStars";
import ShopingCartIcon from "@/components/Icons/ShopingCartIcon";
import PhoneIcon from "@/components/Icons/PhoneIcon";
import QuantityInput from "@/components/QuantityInput";
import WhatsappIcon from "@/components/Icons/WhatsappIcon";
import { useDispatch } from "react-redux";
import { AddtoCart } from "@/redux/cartSlice";
import GenerateRandomId from "@/utils/GenerateRandomId";

const ProductsData = ({ data, productData, setProductData }) => {
  const dispatch = useDispatch();
  let newPrice =
    data?.data?.attributes?.price + (productData?.size?.price || 0);

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

  // Selection Functions ----------------------------------------------------------

  const isColorActive = (data) => {
    return productData?.color === data ? "active" : "";
  };

  const UpdateColor = (color) => {
    setProductData((prev) => ({ ...prev, color }));
  };

  return (
    <div className="ViewProductDetails">
      <h2 className="titleProduct">{data?.data?.attributes?.title}</h2>
      <p className="ProductDescription">
        {data?.data?.attributes?.description} <span>More</span>
      </p>

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
          <button onClick={HandleAddtoCart}>
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

      <p className="othercalltoactionsHeading">Save 5% with direct order on</p>

      <div className="otherBuyingOptions">
        <button>
          <span>
            <WhatsappIcon />
          </span>
          WhatsApp
        </button>
        <button>
          <span>
            <PhoneIcon />
          </span>
          Call
        </button>
      </div>
    </div>
  );
};

export default ProductsData;
