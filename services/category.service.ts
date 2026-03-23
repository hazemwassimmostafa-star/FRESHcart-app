import { axiosInstance } from "../lib/axios";

export const getAllCategories = () => {
  return axiosInstance.get("/categories");
};

export const getSubCategories = (categoryId: string) => {
  return axiosInstance.get(`/categories/${categoryId}/subcategories`);
};

export const getProductsBySubCategory = (subCategoryId: string) => {
  return axiosInstance.get(`/products?subCategory=${subCategoryId}`);
};