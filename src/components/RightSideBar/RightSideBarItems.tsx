import { IoClose } from "react-icons/io5";

import EmailConnection from "./EmailConnection";
import UserSettings from "./UserSettings";
import AsanaPage from "./Asana/AsanaPage";

import { useNavbarStore } from "../../store/navbar";

function RightSideBarItems() {
  const { setIsRightSidebarOpen, navbarItem, clearNavbarItem } =
    useNavbarStore();

  function handleCloseButtonClick() {
    setIsRightSidebarOpen(false);
    clearNavbarItem();
  }

  return (
    <aside
      className={`flex-shrink-0 h-full w-340 shadow-left ${navbarItem === "asana" ? "bg-[#dadada]" : "bg-white"}`}
    >
      <nav className="flex items-center justify-between w-full border-b flex-nowrap py-13 px-15 text-slate-700">
        <p className="text-2xl font-normal capitalize">{navbarItem}</p>
        <IoClose
          size={30}
          className="rounded-full cursor-pointer hover:bg-slate-100"
          onClick={() => handleCloseButtonClick()}
        />
      </nav>
      <nav className="h-full px-10">
        {navbarItem === "profile" && <EmailConnection />}
        {navbarItem === "settings" && <UserSettings />}
        {navbarItem === "asana" && <AsanaPage />}
      </nav>
    </aside>
  );
}

export default RightSideBarItems;
