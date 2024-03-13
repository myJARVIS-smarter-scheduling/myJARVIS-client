import { IoClose } from "react-icons/io5";

import EmailConnection from "./EmailConnection";
import UserSettings from "./UserSettings";

function RightSideBarItems({
  itemType,
  handleNavBarToggle,
  handleNavbarItems,
}) {
  function handleCloseButtonClick() {
    handleNavBarToggle((prevState) => !prevState);
    handleNavbarItems("");
  }

  return (
    <aside className="flex-shrink-0 h-full bg-white w-330 shadow-left">
      <nav className="flex items-center justify-between w-full border-b flex-nowrap py-13 px-15 text-slate-700">
        <p className="text-2xl font-normal capitalize">{itemType}</p>
        <IoClose
          size={30}
          className="rounded-full cursor-pointer hover:bg-slate-100"
          onClick={handleCloseButtonClick}
        />
      </nav>
      <nav className="px-10">
        {itemType === "profile" && <EmailConnection />}
        {itemType === "settings" && <UserSettings />}
      </nav>
    </aside>
  );
}

export default RightSideBarItems;
