import { axiosInstance } from "../lib/axios";

export const getAllBrands = () => {
  return axiosInstance.get("/brands");
};

export const getProductsByBrand = (brandId: string) => {
  return axiosInstance.get(`/products?brand=${brandId}`);
};