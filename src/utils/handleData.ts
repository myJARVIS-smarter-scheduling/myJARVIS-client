/* eslint-disable */
import axios from "axios";

import fetchData from "./graphFetch";
import API from "../config/api";
import {
  MicrosoftEvent,
  AccountData,
  AccountEventData,
} from "../types/microsoft";
import { User, AccountInfo } from "../types/account";

export const fetchDataWithRetry = async (
  endpoint: string,
  accessToken: string,
  retries = 3,
) => {
  for (let i = 0; i < retries; i += 1) {
    const result = await fetchData(endpoint, accessToken);
    if (result !== undefined) {
      return result;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(
    `Failed to fetch data from ${endpoint} after ${retries} attempts`,
  );
};

export const sendAllDataToServer = async (
  allAccountData: AccountData[],
  handleGraphData: (data: MicrosoftEvent[]) => void,
  connectAccount: (events: AccountEventData[]) => void,
  setUser: (user: User) => void,
  setAccountInfo: (info: AccountInfo) => void,
) => {
  try {
    const response = await axios.post(
      API.CALENDAR.OUTLOOK,
      {
        accountsData: allAccountData,
      },
      { withCredentials: true },
    );

    if (response.data.result === "success") {
      const userInfo = response.data.user;
      const accountEvents = response.data.accountEventList;
      const accountInfoList = response.data.accountEventList.map(
        (account: AccountEventData) => {
          console.log("account", account);
          return {
            accountId: account.accountId,
            provider: account.provider,
            email: account.email,
          };
        },
      );

      if (response.data.user) {
        setUser(userInfo);
      }

      handleGraphData(accountEvents);
      setAccountInfo(accountInfoList);
      connectAccount(accountEvents);
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};
