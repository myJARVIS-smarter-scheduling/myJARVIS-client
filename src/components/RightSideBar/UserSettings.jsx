import { IoIosCheckboxOutline, IoIosCheckbox } from "react-icons/io";

import DropdownMenu from "../../shared/DropdownMenu";

import {
  useLoginProviderStore,
  useAccountEventStore,
} from "../../store/account";
import { useCalendarSelectionStore } from "../../store/navbar";
import { CALENDAR_COLOR_TEXT } from "../../constant/calendar";

const viewOptions = [
  { label: "all-in-one", value: "all-in-one" },
  { label: "multiple", value: "multiple" },
];

function UserSettings() {
  // const { user } = useLoginProviderStore();
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
          <DropdownMenu options={viewOptions} />
        </div>
      </nav>
      {/* TODO: 추후 advanced로 구현합니다. */}
      {/* <nav className="w-full h-150">
        <p className="flex mb-10 font-light text-center text-20">
          Select Timezone
        </p>
        <div className="w-250">
          <DropdownMenu options={timezone} />
        </div>
      </nav> */}
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
