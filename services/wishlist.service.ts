import { axiosInstance } from "../lib/axios";

export const addProductToWishlist = (productId: string) => {
  return axiosInstance.post("/wishlist", { productId });
};

export const getLoggedUserWishlist = () => {
  return axiosInstance.get("/wishlist");
};

export const removeWishlistItem = (productId: string) => {
  return axiosInstance.delete(`/wishlist/${productId}`);
};