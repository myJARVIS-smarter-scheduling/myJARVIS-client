import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { useLoginProviderStore } from "../store/account";

import API from "../config/api";

export const handleLogout = async () => {
  const { user } = useLoginProviderStore();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "accessToken",
  ]);

  // if (user?.provider === "microsoft") {
  if (typeof user !== "string" && user?.provider === "microsoft") {
    removeCookie("userId");
    removeCookie("accessToken");

    navigate("/");
  } else {
    const response = await axios.post(
      API.AUTH.LOGOUT,
      {},
      { withCredentials: true },
    );

    if (response.data.message === "success") {
      navigate("/");
    }
  }
};
