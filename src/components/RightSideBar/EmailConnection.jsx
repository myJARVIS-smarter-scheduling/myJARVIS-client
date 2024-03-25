import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaCirclePlus } from "react-icons/fa6";
import { loginRequest } from "../../config/authConfig";

import API from "../../config/api";

import {
  useLoginProviderStore,
  useAccountEventStore,
} from "../../store/account";
import { useNavbarStore } from "../../store/navbar";

function EmailConnection() {
  const { instance } = useMsal();
  const { user } = useLoginProviderStore();
  const { accounts } = useAccountEventStore();
  const { setisRightSidebarOpen } = useNavbarStore();
  const navigate = useNavigate();
  const accountEmailList = accounts
    .map((account) => account.email)
    .filter((email) => email !== user.email);

  function getLogoPath(email) {
    if (email.includes("gmail")) {
      return "/assets/google_calendar_logo.png";
    }

    return "/assets/outlook_calendar_logo.png";
  }

  async function handleOutlookRedirect() {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "select_account",
      })
      .then((response) => {
        const account = response.account[response.account.length - 1];

        setisRightSidebarOpen(false);
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  async function handleAddAccountClick(ev) {
    ev.preventDefault();

    const provider = ev.currentTarget.id;

    if (provider === "google") {
      window.location.href = API.AUTH.GOOGLE;
    }

    if (provider === "microsoft") {
      handleOutlookRedirect();
    }
  }

  return (
    <section className="flex flex-col items-start justify-center w-full p-10 my-15">
      <aside className="w-full min-h-200">
        <p className="flex mb-10 font-light text-center text-20">
          Connected Calendars
        </p>
        <section className="flex items-center justify-start px-10 space-x-5 font-thin text-15">
          <img
            src={`${getLogoPath(user.email)}`}
            className="w-20 h-auto"
            alt="calendar logo"
          />
          <p className="text-center">{user.email}</p>
          <FaCrown size={20} className="text-yellow-300" />
        </section>
        <section>
          {accountEmailList.map((account) => {
            return (
              <div
                key={account}
                className="flex items-center justify-start px-10 space-x-5 space-y-5 font-thin text-15"
              >
                <img
                  src={`${getLogoPath(account)}`}
                  className="w-20 h-auto"
                  alt="Outlook Calendar"
                />
                <p className="text-center">{account}</p>
              </div>
            );
          })}
        </section>
      </aside>
      {/* TODO. 버튼 클릭시 추가 연동 로직을 구현합니다. */}
      <nav className="flex-col items-start justify-center w-full space-y-20 min-h-100">
        <p className="font-light text-20">Add Calendar</p>
        <form className="flex items-center justify-around">
          <div className="relative flex items-center justify-center rounded-lg w-60 h-60 hover:bg-slate-100">
            <button
              id="google"
              aria-label="Add Google Calendar Account"
              className="hover:bg-slate-100"
              onClick={handleAddAccountClick}
            >
              <img
                src="/assets/google_calendar_logo.png"
                className="w-40 h-auto"
                alt="google_calendar"
              />
              <FaCirclePlus
                size={20}
                className="absolute bottom-4 opacity-70 -right-2"
              />
            </button>
          </div>
          <div className="relative flex items-center justify-center rounded-lg w-60 h-60 hover:bg-slate-100">
            <button
              id="microsoft"
              aria-label="Add Outlook Calendar Account"
              className="hover:bg-slate-100"
              onClick={handleAddAccountClick}
            >
              <img
                src="/assets/outlook_calendar_logo.png"
                className="h-auto w-45"
                alt="Outlook Calendar"
              />
              <FaCirclePlus
                size={20}
                className="absolute bottom-5 opacity-70 -right-3"
              />
            </button>
          </div>
        </form>
      </nav>
    </section>
  );
}

export default EmailConnection;
