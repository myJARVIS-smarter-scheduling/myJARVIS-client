import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useLoginProviderStore, useAccountEventStore } from "../../store";
import API from "../../config/api";

import Header from "../../shared/Header";
import RightBar from "../Setting/RightBar";
import RightBarItems from "../Setting/RightBarItems";

function MainPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbarItem, setNavbarItems] = useState("");
  const { provider } = useLoginProviderStore();
  const { connectAccount } = useAccountEventStore();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(
        API.CALENDAR.EVENTS,
        { provider },
        { withCredentials: true },
      );

      const eventListOfAccounts = response.data;

      if (eventListOfAccounts.result === "success") {
        connectAccount(eventListOfAccounts.accountEventList);
      }

      if (response.data.result === "fail") {
        navigate("/");
      }
    }

    fetchData();
  }, []);

  return (
    <main className="relative z-0 flex w-screen h-screen bg-white">
      <section className="relative w-full h-full overflow-hidden">
        <Header className="absolute top-0 left-0 z-10 w-full" />
        <section className="absolute right-0 h-full border-l">
          <RightBar
            handleNavBarToggle={setIsSidebarOpen}
            setNavbarItems={setNavbarItems}
            navbarItem={navbarItem}
          />
        </section>
      </section>
      {isSidebarOpen && (
        <RightBarItems
          className="absolute top-0 right-0 z-20"
          itemTypse={navbarItem}
        />
      )}
    </main>
  );
}

export default MainPage;
