import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type DecodedToken = {
  id: string;
  name: string;
  email: string;
};

export const getUserDataFromToken = () => {
  const token = Cookies.get("token");

  if (!token) return null;

  return jwtDecode<DecodedToken>(token);
};