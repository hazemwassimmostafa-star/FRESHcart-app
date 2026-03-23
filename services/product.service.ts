import { axiosInstance } from "../lib/axios";

export const getAllProducts = () => {
  return axiosInstance.get("/products");
};

export const getSpecificProduct = (id: string) => {
  return axiosInstance.get(`/products/${id}`);
};

export const getProductsByCategory = (categoryId: string) => {
  return axiosInstance.get(`/products?category[in]=${categoryId}`);
};