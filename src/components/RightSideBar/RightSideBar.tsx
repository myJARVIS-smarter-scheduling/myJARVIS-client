import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { useNavbarStore } from "../../store/navbar";

function RightSideBar() {
  const {
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    navbarItem,
    setNavbarItem,
    clearNavbarItem,
  } = useNavbarStore();

  function handleIconClick(itemType: string) {
    if (navbarItem === itemType) {
      setIsRightSidebarOpen(false);
      clearNavbarItem();
    } else {
      setIsRightSidebarOpen(true);
      setNavbarItem(itemType);
    }
  }

  const selectedBackgroundBlue = "bg-blue-100 rounded-full";
  const selectedBackgroundPink = "bg-[#ffc3c2] rounded-full";

  return (
    <aside className="h-full py-20 bg-white border-l space-y-25 max-w-65 w-65 min-w-75">
      <nav className="relative flex items-center justify-center">
        <button
          aria-label="Profile"
          onClick={() => handleIconClick("profile")}
          className={`flex items-center justify-center w-45 h-45 ${navbarItem === "profile" && isRightSidebarOpen && selectedBackgroundBlue} hover:bg-slate-200 hover:rounded-full`}
        >
          <FaUserCircle size={30} className="text-[#0058cc] cursor-pointer" />
        </button>
        {navbarItem === "profile" && (
          <div className="w-4 h-40 bg-[#0058cc] rounded-tl-lg rounded-bl-lg absolute right-0"></div>
        )}
      </nav>
      <nav className="relative flex items-center justify-center">
        <button
          aria-label="Settings"
          onClick={() => handleIconClick("settings")}
          className={`flex items-center justify-center w-45 h-45 ${navbarItem === "settings" && isRightSidebarOpen && selectedBackgroundBlue} hover:bg-slate-200 hover:rounded-full`}
        >
          <IoSettingsSharp
            size={30}
            className="text-[#2684fc] cursor-pointer"
          />
        </button>
        {navbarItem === "settings" && (
          <div className="w-4 h-40 bg-[#2684fc] rounded-tl-lg rounded-bl-lg absolute right-0"></div>
        )}
      </nav>
      <hr className="m-5" />
      <nav className="relative flex items-center justify-center">
        <div
          className={`flex items-center justify-center w-45 h-45 ${navbarItem === "asana" && isRightSidebarOpen && selectedBackgroundPink} hover:bg-slate-200 hover:rounded-full`}
        >
          <button
            aria-label="Asana"
            onClick={() => handleIconClick("asana")}
            className="flex items-center justify-center"
          >
            <img
              src="/assets/asana_logo_pink.png"
              alt="asana_logo"
              className="h-auto cursor-pointer w-30"
            />
          </button>
        </div>
        {navbarItem === "asana" && (
          <div className="w-4 h-40 bg-[#FE6F73] rounded-tl-lg rounded-bl-lg absolute right-0"></div>
        )}
      </nav>
    </aside>
  );
}

export default RightSideBar;
