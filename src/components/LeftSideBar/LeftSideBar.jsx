import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineArrowDropDown } from "react-icons/md";

import CalendarBody from "../Calendar/CalendarBody";

function LeftSideBar() {
  return (
    <aside className="flex flex-col items-center justify-start h-full py-10 bg-white border-r px-15 min-w-320">
      <div className="flex items-center w-full h-70">
        <button className="flex items-center justify-between px-10 transition duration-300 ease-in-out transform h-45 w-140 shadow-down rounded-3xl hover:scale-105 hover:shadow-3xl hover:bg-slate-200">
          <AiOutlinePlus size={30} />
          <p className="font-normal text-15">Create</p>
          <MdOutlineArrowDropDown size={25} />
        </button>
      </div>
      <section className="flex flex-col items-center justify-center w-full py-10 space-y-10">
        <div className="h-auto px-20 max-w-280 w-280 sm:text-10 md:text-15">
          <CalendarBody isMiniCalendar />
        </div>
        <div className="w-full">
          <p className="mt-20 font-normal text-center center text-20">
            Weekly Schedule Conflicts
          </p>
          <hr />
          <div className="overflow-y-scroll min-h-300"></div>
        </div>
      </section>
    </aside>
  );
}

export default LeftSideBar;
