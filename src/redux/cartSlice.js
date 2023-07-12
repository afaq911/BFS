import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    subTotal: 0,
  },
  reducers: {
    AddtoCart: (state, action) => {
      // Check if Product Already Exists -------------------------------------------------
      let checkProduct = action.payload.size.name
        ? state.cart?.filter(
            (item) =>
              item.id === action.payload.id &&
              item?.color === action.payload.color &&
              item?.size?.name === action.payload.size?.name
          )
        : state.cart?.filter(
            (item) =>
              item.id === action.payload.id &&
              item.color === action.payload.color
          );

      if (checkProduct?.length > 0) {
        let newProduct = action.payload;
        state.cart = [...state.cart]?.map((item) => {
          if (newProduct?.size) {
            toast.success("Cart Updated");
            return item?.id === newProduct.id &&
              item?.color === newProduct.color &&
              item?.size?.name === newProduct?.size?.name
              ? {
                  ...item,
                  quantity: item?.quantity + newProduct.quantity,
                  totalPrice:
                    item?.totalPrice + newProduct.price * newProduct.quantity,
                }
              : item;
          } else {
            toast.success("Cart Updated");
            return item?.id === newProduct.id &&
              item?.color === newProduct.color
              ? {
                  ...item,
                  quantity: item?.quantity + newProduct.quantity,
                  totalPrice:
                    item?.totalPrice + newProduct.price * newProduct.quantity,
                }
              : item;
          }
        });
      } else {
        console.log(state);
        state.cart.push(action.payload);
        toast.success("Product Added to cart");
      }

      state.subTotal = state.cart?.reduce((accumulator, object) => {
        return accumulator + object.totalPrice;
      }, 0);
    },

    RemoveFromCart: (state, action) => {
      state.cart = [...state.cart]?.filter(
        (item) => item?.uniqueId !== action.payload.uniqueId
      );

      state.subTotal = state.cart?.reduce((accumulator, object) => {
        return accumulator + object.totalPrice;
      }, 0);

      toast.success("Product Removed From Cart");
    },

    UpdateCart: (state, action) => {
      state.cart = [...state.cart]?.map((item) => {
        if (item?.uniqueId === action.payload.uniqueId) {
          return action.payload.action === "add"
            ? {
                ...item,
                quantity: item?.quantity + 1,
                totalPrice: item?.totalPrice + item?.price,
              }
            : {
                ...item,
                quantity: item?.quantity - 1,
                totalPrice: item?.totalPrice - item?.price,
              };
        } else {
          return item;
        }
      });
      state.subTotal = state.cart?.reduce((accumulator, object) => {
        return accumulator + object?.totalPrice;
      }, 0);
    },
    EmptyCart: (state, action) => {
      state.cart = [];
      state.subTotal = 0;
      !action?.payload?.showToast && toast.success("Cart Cleared");
    },
  },
});

export const { AddtoCart, EmptyCart, RemoveFromCart, UpdateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
