import { axiosInstance } from "../lib/axios";

export const addProductToCart = (productId: string) => {
  return axiosInstance.post("/cart", { productId });
};

export const getLoggedUserCart = () => {
  return axiosInstance.get("/cart");
};

export const removeCartItem = (productId: string) => {
  return axiosInstance.delete(`/cart/${productId}`);
};

export const updateCartItemCount = (productId: string, count: number) => {
  return axiosInstance.put(`/cart/${productId}`, { count });
};

export const clearUserCart = () => {
  return axiosInstance.delete("/cart");
};

export const createCheckoutSession = (
  cartId: string,
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  }
) => {
  return axiosInstance.post(
    `/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    { shippingAddress }
  );
};