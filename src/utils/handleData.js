/* eslint-disable */
import axios from "axios";

import { useLoginProviderStore, useAccountEventStore } from "../store/account";

import fetchData from "./graphFetch";
import API from "../config/api";

export async function fetchDataWithRetry(endpoint, accessToken, retries = 3) {
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
}

export async function sendAllDataToServer(allAccountData, handleGraphData) {
  const { connectAccount } = useAccountEventStore();
  const { setUser, setAccountInfo } = useLoginProviderStore();

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
      const accountInfoList = response.data.accountEventList.map((account) => {
        return {
          accountId: account.accountId,
          provider: account.provider,
          email: account.email,
        };
      });

      if (response.data.user) {
        setUser(userInfo);
      }

      handleGraphData(accountEvents);
      // setGraphData(accountEvents);
      setAccountInfo(accountInfoList);
      connectAccount(accountEvents);
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}
