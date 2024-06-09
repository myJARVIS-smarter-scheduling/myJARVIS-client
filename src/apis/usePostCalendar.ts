import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useLoginProviderStore, useAccountEventStore } from "../store/account";

import { AccountInfo } from "../types/account";
import API from "../config/api";

const fetchCalendarData = async () => {
  const navigate = useNavigate();
  const { setUser, setAccountInfo } = useLoginProviderStore();
  const { connectAccount } = useAccountEventStore();

  try {
    const response = await axios.post(
      API.CALENDAR.EVENTS,
      {},
      {
        withCredentials: true,
      },
    );

    if (response.data.result === "success") {
      const userInfo = response.data.user;
      const accountEvents = response.data.accountEventList;
      const accountInfoList = response.data.accountEventList.map(
        (account: AccountInfo) => {
          return {
            accountId: account.accountId,
            accessToken: account.accessToken,
            provider: account.provider,
            email: account.email,
          };
        },
      );

      setUser(userInfo);
      setAccountInfo(accountInfoList);
      connectAccount(accountEvents);
    }

    if (response.data.result === "fail") {
      navigate("/");
    }
  } catch (error) {
    console.error("Failed to fetch data from server:", error);
  }
};

export default fetchCalendarData;
