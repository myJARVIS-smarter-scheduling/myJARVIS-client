import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { PublicClientApplication } from "@azure/msal-browser";

import API from "../config/api";
import { loginRequest } from "../config/authConfig";
import { useLoginProviderStore } from "../store/account";

interface LogoutResponse {
  message: string;
}

export const requestReLogin = async (
  email: string,
  instance: PublicClientApplication,
): Promise<void> => {
  instance
    .loginRedirect({
      ...loginRequest,
      loginHint: email,
    })
    .catch((error) => console.log(error));
};

export const handleLogout = async (): Promise<void> => {
  const navigate = useNavigate();
  const { user } = useLoginProviderStore();
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "accessToken",
  ]);

  if (user && user.provider === "microsoft") {
    removeCookie("userId");
    removeCookie("accessToken");

    navigate("/");
  } else {
    try {
      const response = await axios.post<LogoutResponse>(
        API.AUTH.LOGOUT,
        {},
        { withCredentials: true },
      );

      if (response.data.message === "success") {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
};
