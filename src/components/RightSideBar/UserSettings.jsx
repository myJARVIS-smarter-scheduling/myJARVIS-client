import { useState } from "react";
import { IoIosCheckboxOutline, IoIosCheckbox } from "react-icons/io";

import DropdownMenu from "../../shared/DropdownMenu.tsx";

import {
  useLoginProviderStore,
  useAccountEventStore,
} from "../../store/TypeScript/account.ts";
import { useCalendarSelectionStore } from "../../store/TypeScript/navbar.ts";
import { CALENDAR_COLOR_TEXT } from "../../constant/calendar.ts";

const viewOptions = [
  { label: "all-in-one", value: "all-in-one" },
  { label: "multiple", value: "multiple" },
];

function UserSettings() {
  const [view, setView] = useState(viewOptions[0].value);
  const { accounts } = useAccountEventStore();
  const { selectedCalendars, addAccount, removeAccount } =
    useCalendarSelectionStore();

  function handleCalendarClick(email) {
    if (selectedCalendars.includes(email)) {
      removeAccount(email);
    } else {
      addAccount(email);
    }
  }

  return (
    <main className="flex flex-col items-start justify-center w-full p-10 my-15">
      <nav className="w-full h-150">
        <p className="flex mb-10 font-light text-center text-20">
          Calendar View
        </p>
        <div className="w-150">
          <DropdownMenu options={viewOptions} handleOptionChange={setView} />
        </div>
      </nav>
      <aside className="w-full space-y-20 mt-50 min-h-200">
        <p className="flex mb-10 font-light text-center text-20">
          Select Calendars
        </p>
        <div className="space-y-10">
          {accounts.map((accountInfo, index) => (
            <div
              key={accountInfo.email}
              className="flex items-center justify-start w-full space-x-10 h-30"
            >
              <button
                type="button"
                className="flex items-center justify-center rounded-full hover:bg-slate-200 w-35 h-35"
                onClick={() => handleCalendarClick(accountInfo.email)}
              >
                {selectedCalendars.includes(accountInfo.email) ? (
                  <IoIosCheckboxOutline
                    size={26}
                    className={`${CALENDAR_COLOR_TEXT[index]}`}
                  />
                ) : (
                  <IoIosCheckbox
                    size={26}
                    className={`${CALENDAR_COLOR_TEXT[index]}`}
                  />
                )}
              </button>
              <span className="font-normal text-center text-17">
                {accountInfo.email.split("@")[0]}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}

export default UserSettings;
