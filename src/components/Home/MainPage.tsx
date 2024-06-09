/* eslint-disable */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { HiOutlineMenu } from "react-icons/hi";
import axios from "axios";

import {
  useLoginProviderStore,
  useAccountEventStore,
} from "../../store/account";
import { useNavbarStore } from "../../store/navbar";

import Header from "../../shared/Header";
import Logo from "../../shared/Logo";
import CalendarHeader from "../Calendar/CalendarHeader";
import Calendar from "../Calendar/Calendar";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import RightSideBarItems from "../RightSideBar/RightSideBarItems";
import EventFetching from "./EventFetching";

import { handleLogout } from "../../apis/usePostAuth";
import fetchCalendarData from "../../apis/usePostCalendar";
import getAccessTokenForAccount from "../../utils/microsoft/getAccessToken";
import {
  fetchDataWithRetry,
  sendAllDataToServer,
} from "../../utils/handleData";

import API from "../../config/api";
import { protectedResources, loginRequest } from "../../config/authConfig";
import { AccountInfo } from "../../types/account";
import {
  UserInfo,
  MailboxSettings,
  MicrosoftEventResponse,
  MicrosoftEvent,
  AccountData,
} from "../../types/microsoft";

function MainPage() {
  const navigate = useNavigate();
  // const { instance: msalInstance } = useMsal();
  const { instance: msalInstance } = useMsal() as {
    instance: IPublicClientApplication;
  };
  const [graphData, setGraphData] = useState<MicrosoftEvent[]>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "accessToken",
  ]);
  const { deleteEvent, connectAccount, accounts } = useAccountEventStore();
  const { setUser, setAccountInfo, accountInfo, user } =
    useLoginProviderStore();
  const { isRightSidebarOpen, isLeftSidebarOpen, setIsLeftSidebarOpen } =
    useNavbarStore();
  const microsoftAccountList = msalInstance.getAllAccounts();
  const connectedMicrosoftAccounts = accountInfo.filter((account) =>
    account.email.includes("outlook"),
  );

  async function requestReLogin(
    email: string,
    instance: IPublicClientApplication,
  ) {
    instance
      .loginRedirect({
        ...loginRequest,
        loginHint: email,
      })
      .catch((error: Error) => console.log(error));
  }

  useEffect(() => {
    if (microsoftAccountList.length > 0 && user !== null) {
      const fetchAndSendData = async () => {
        const allAccountData: AccountData[] = [];

        for (const account of microsoftAccountList) {
          const accessToken = await getAccessTokenForAccount(
            msalInstance,
            account,
          );

          if (
            account === microsoftAccountList[0] &&
            typeof user !== "string" &&
            user?.provider === "microsoft"
          ) {
            const currentAccessToken = cookies.accessToken;

            if (accessToken !== currentAccessToken) {
              setCookie("accessToken", accessToken, { path: "/" });
            }
          }

          if (accessToken) {
            try {
              const userInfo: UserInfo = await fetchDataWithRetry(
                protectedResources.graphMe.endpoint,
                accessToken,
              );

              const mailboxSettings: MailboxSettings = await fetchDataWithRetry(
                protectedResources.graphMailSetting.endpoint,
                accessToken,
              );

              const calendarEvents: MicrosoftEventResponse =
                await fetchDataWithRetry(
                  protectedResources.graphCalendarEvents.endpoint,
                  accessToken,
                );

              allAccountData.push({
                userInfo,
                mailboxSettings,
                calendarEvents,
                accessToken,
              });
            } catch (error) {
              console.error("Fail to load data:", error);

              continue;
            }
          }
        }

        if (allAccountData.length > 0) {
          await sendAllDataToServer(
            allAccountData,
            setGraphData,
            connectAccount,
            setUser,
            setAccountInfo,
          );
        } else {
          console.log("Failed to fetch valid data.");
        }
      };

      fetchAndSendData().catch(console.error);
    }
  }, [microsoftAccountList.length]);

  useEffect(() => {
    // async function fetchCalendarData() {
    //   try {
    //     const response = await axios.post(
    //       API.CALENDAR.EVENTS,
    //       {},
    //       {
    //         withCredentials: true,
    //       },
    //     );

    //     if (response.data.result === "success") {
    //       const userInfo = response.data.user;
    //       const accountEvents = response.data.accountEventList;
    //       const accountInfoList = response.data.accountEventList.map(
    //         (account: AccountInfo) => {
    //           return {
    //             accountId: account.accountId,
    //             accessToken: account.accessToken,
    //             provider: account.provider,
    //             email: account.email,
    //           };
    //         },
    //       );

    //       setUser(userInfo);
    //       setAccountInfo(accountInfoList);
    //       connectAccount(accountEvents);
    //     }

    //     if (response.data.result === "fail") {
    //       navigate("/");
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch data from server:", error);
    //   }
    // }

    fetchCalendarData();
  }, [deleteEvent, accounts, setAccountInfo, setGraphData]);

  useEffect(() => {
    if (connectedMicrosoftAccounts.length !== microsoftAccountList.length) {
      connectedMicrosoftAccounts.forEach(async (account) => {
        const msalAccount = microsoftAccountList.find(
          (msalLogined) => msalLogined.username === account.email,
        );

        if (!msalAccount) {
          requestReLogin(account.email, msalInstance);
        }
      });
    }
  }, [msalInstance]);

  return (
    <main className="flex w-screen h-screen">
      <div className="flex flex-col items-center w-full h-full overflow-hidden">
        <Header>
          <section className="flex items-center w-full h-full py-10 border-b px-15">
            <div className="flex items-center space-x-10">
              <div className="flex items-center justify-center w-40 h-40 rounded-full cursor-pointer hover:bg-slate-100">
                <HiOutlineMenu
                  size={30}
                  onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                />
              </div>
              <Logo />
            </div>
            <CalendarHeader />
            <button
              type="button"
              className="text-sm font-light border border-b-2 rounded w-70 h-30 text-slate-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </section>
        </Header>
        <div className="flex w-full h-full">
          {isLeftSidebarOpen && <LeftSideBar />}
          <div className="flex justify-between w-full h-full overflow-hidden">
            <Calendar />
            <RightSideBar />
          </div>
        </div>
      </div>
      {isRightSidebarOpen && <RightSideBarItems />}
      <EventFetching />
    </main>
  );
}

export default MainPage;
