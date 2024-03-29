import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

import CalendarBody from "../Calendar/CalendarBody";
import ConflictList from "./ConflictList";
// import AsanaNewTask from "../RightSideBar/Asana/AsanaNewTask";

const selectOptions = [
  { label: "Event", value: "calendar" },
  // { label: "Asana Task", value: "asana" },
];

function LeftSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClick(option) {
    const today = new Date();

    if (option.value === "calendar") {
      navigate("/events/new", { state: { dateOfEvent: today } });
    }
  }

  return (
    <aside className="relative flex flex-col items-center justify-start h-full py-10 bg-white border-r px-15 max-w-320">
      <div className="relative flex items-center w-full h-70" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-10 transition duration-300 ease-in-out transform h-45 w-140 shadow-down rounded-3xl hover:scale-105 hover:shadow-3xl hover:bg-slate-200"
        >
          <AiOutlinePlus size={30} />
          <p className="font-normal text-15">Create</p>
          {isOpen ? (
            <MdOutlineArrowDropDown size={25} />
          ) : (
            <MdOutlineArrowDropUp size={25} />
          )}
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-5 font-thin origin-top-right bg-white rounded-md shadow-lg left-10 w-140 top-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="w-full overflow-auto max-h-400">
              {selectOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="block w-full py-10 overflow-hidden text-left text-gray-700 truncate px-15 hover:bg-gray-100"
                  onClick={() => handleClick(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <AsanaNewTask isClicked={isClicked} setIsClicked={setIsClicked} /> */}
      <section className="flex flex-col items-center justify-center w-full py-10 space-y-10">
        <div className="h-auto px-20 max-w-280 w-280 sm:text-10 md:text-15">
          <CalendarBody isMiniCalendar />
        </div>
        <div className="w-full">
          <p className="mt-20 font-normal text-center center text-20">
            Weekly Schedule Conflicts
          </p>
          <hr />
          <div className="w-full overflow-y-auto" style={{ maxHeight: "50vh" }}>
            <ConflictList />
          </div>
        </div>
      </section>
    </aside>
  );
}

export default LeftSideBar;
