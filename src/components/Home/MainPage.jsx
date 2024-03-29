/* eslint-disable */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { HiOutlineMenu } from "react-icons/hi";
import { useMsal } from "@azure/msal-react";
import axios from "axios";

import {
  useLoginProviderStore,
  useAccountEventStore,
} from "../../store/account";
import { useNavbarStore } from "../../store/navbar";

import Header from "../../shared/Header";
import Logo from "../../shared/Logo";
import DropdownMenu from "../../shared/DropdownMenu";
import CalendarHeader from "../Calendar/CalendarHeader";
import Calendar from "../Calendar/Calendar";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import RightSideBarItems from "../RightSideBar/RightSideBarItems";

import API from "../../config/api";
import { CALENDAR_VIEW } from "../../constant/calendar";
import fetchData from "../../config/graphFetch";
import getAccessTokenForAccount from "../../utils/microsoft/getAccessToken";
import { protectedResources } from "../../config/authConfig";

function MainPage() {
  const { instance: msalInstance } = useMsal();
  const navigate = useNavigate();
  const { deleteEvent, connectAccount } = useAccountEventStore();
  const { setUser, setAccountInfo } = useLoginProviderStore();
  const { isRightSidebarOpen, isLeftSidebarOpen, setisLeftSidebarOpen } =
    useNavbarStore();
  const [graphData, setGraphData] = useState();
  const [isFetched, setIsFetched] = useState(false);

  const microsoftAccountList = msalInstance.getAllAccounts();

  const userIdCookie = new Cookies().get("userId");

  const sendAllDataToServer = async (allAccountData) => {
    try {
      const response = await axios.post(
        API.CALENDAR.OUTLOOK,
        {
          accountsData: allAccountData,
        },
        { withCredentials: true },
      );

      if (response.data.result === "success") {
        const userInfo = response.data.accountEventList;
        const accountInfoList = userInfo.map((account) => {
          return {
            accountId: account.accountId,
            provider: account.provider,
            email: account.email,
          };
        });

        if (response.data.user) {
          setUser(response.data.user);
        }

        setAccountInfo(accountInfoList);
        setGraphData(accountInfoList);
        connectAccount(userInfo);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  async function fetchDataWithRetry(endpoint, accessToken, retries = 3) {
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

  useEffect(() => {
    if (microsoftAccountList.length > 0 && !isFetched) {
      const fetchAndSendData = async () => {
        const allAccountData = [];

        for (const account of microsoftAccountList) {
          const accessToken = await getAccessTokenForAccount(
            msalInstance,
            account,
          );

          try {
            const userInfo = await fetchDataWithRetry(
              protectedResources.graphMe.endpoint,
              accessToken,
            );

            const mailboxSettings = await fetchDataWithRetry(
              protectedResources.graphMailSetting.endpoint,
              accessToken,
            );

            const calendarEvents = await fetchDataWithRetry(
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

        if (allAccountData.length > 0) {
          await sendAllDataToServer(allAccountData);
        } else {
          console.log("Failed to fetch valid data.");
        }
      };

      fetchAndSendData().catch(console.error);
      setIsFetched(true);
    }
  }, [isFetched, microsoftAccountList]);

  useEffect(() => {
    if (!userIdCookie) {
      return;
    }

    async function fetchCalendarData() {
      try {
        const response = await axios.post(API.CALENDAR.EVENTS, {
          withCredentials: true,
        });

        if (response.data.result === "success") {
          const userInfo = response.data.accountEventList;
          const accountInfoList = userInfo.map((account) => {
            return {
              accountId: account.accountId,
              provider: account.provider,
              email: account.email,
            };
          });

          setUser(response.data.user);
          setAccountInfo(accountInfoList);
          connectAccount(userInfo);
        }

        if (response.data.result === "fail") {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to fetch data from server:", error);
      }
    }

    fetchCalendarData();
  }, [deleteEvent]);

  return (
    <main className="flex w-screen h-screen">
      <div className="flex flex-col items-center w-full h-full overflow-hidden">
        <Header>
          <section className="flex items-center justify-between w-full h-full border-b p-15">
            <div className="flex items-center space-x-110">
              <div className="flex items-center space-x-10">
                <div className="flex items-center justify-center w-40 h-40 rounded-full cursor-pointer hover:bg-slate-100">
                  <HiOutlineMenu
                    size={30}
                    onClick={() => setisLeftSidebarOpen(!isLeftSidebarOpen)}
                  />
                </div>
                <Logo />
              </div>
              <CalendarHeader />
            </div>
            <div>
              <DropdownMenu options={CALENDAR_VIEW} />
            </div>
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
    </main>
  );
}

export default MainPage;
