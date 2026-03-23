import { axiosInstance } from "../lib/axios";

export const getUserOrders = (userId: string) => {
  return axiosInstance.get(`/orders/user/${userId}`);
};