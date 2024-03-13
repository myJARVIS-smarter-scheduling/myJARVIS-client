import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

function RightSideBar({
  handleNavBarToggle,
  setNavbarItems,
  navbarItem,
  isSideBarOpen,
}) {
  function handleIconClick(itemType) {
    if (navbarItem === itemType) {
      handleNavBarToggle(false);
      setNavbarItems("");
    } else {
      handleNavBarToggle(true);
      setNavbarItems(itemType);
    }
  }

  const selectedBackground = "bg-blue-100 rounded-full";

  return (
    <aside className="py-20 bg-white border-l space-y-25 max-w-65 w-65 min-w-65">
      <nav className="relative flex items-center justify-center">
        <div
          className={`flex items-center justify-center w-45 h-45 ${navbarItem === "profile" && isSideBarOpen && selectedBackground} hover:bg-slate-200 hover:rounded-full`}
        >
          <FaUserCircle
            size={30}
            className="text-[#0058cc] cursor-pointer"
            onClick={() => handleIconClick("profile")}
          />
        </div>
        {navbarItem === "profile" && (
          <div className="w-4 h-40 bg-[#0058cc] rounded-tl-lg rounded-bl-lg absolute right-0"></div>
        )}
      </nav>
      <nav className="relative flex items-center justify-center">
        <div
          className={`flex items-center justify-center w-45 h-45 ${navbarItem === "settings" && isSideBarOpen && selectedBackground} hover:bg-slate-200 hover:rounded-full`}
        >
          <IoSettingsSharp
            size={30}
            className="text-[#2684fc] cursor-pointer"
            onClick={() => handleIconClick("settings")}
          />
        </div>
        {navbarItem === "settings" && (
          <div className="w-4 h-40 bg-[#2684fc] rounded-tl-lg rounded-bl-lg absolute right-0"></div>
        )}
      </nav>
      <hr className="m-5" />
    </aside>
  );
}

export default RightSideBar;
