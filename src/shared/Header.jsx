import { useState, useRef, useEffect } from "react";
import {
  HiOutlineMenu,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Monthly");
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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

  return (
    <header className="flex items-center justify-between border-b px-15 py-7 space-x-100">
      <section className="flex items-center space-x-50">
        <div className="flex items-center space-x-15">
          <HiOutlineMenu size={30} />
          <div className="flex items-center">
            <img
              src="/assets/myJARVIS_logo_square.png"
              alt="myJARVIS_logo"
              className="w-45 h-45"
            />
            <p className="text-xl font-extrabold">myJARVIS</p>
          </div>
        </div>
        <div className="flex items-center space-x-15">
          <form className="flex items-center">
            <button
              type="button"
              className="text-sm font-light border border-b-2 rounded min-w-70 min-h-30 text-slate-700"
            >
              TODAY
            </button>
          </form>
          <div className="flex items-center space-x-10">
            <HiOutlineChevronLeft size={20} className="text-slate-700" />
            <HiOutlineChevronRight size={20} className="text-slate-700" />
          </div>
          <div className="space-x-10 text-xl font-light text-slate-700">
            {/* TODO. 현재 월에 따라 변경되도록 로직을 변경해야합니다. */}
            <span id="headerMonth">March</span>
            <span id="headerYear">2024</span>
          </div>
        </div>
      </section>
      <section className="pr-30">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center px-5 text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm min-w-100 min-h-30 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            {selectedOption}
            {isOpen ? (
              <HiOutlineChevronUp size={15} className="ml-5" />
            ) : (
              <HiOutlineChevronDown size={15} className="ml-5" />
            )}
          </button>
          {isOpen && (
            <div className="absolute right-0 z-10 mt-5 origin-top-right bg-white rounded-md shadow-lg min-w-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 text-sm font-normal">
                <div className="py-1 text-sm font-normal">
                  <button
                    type="button"
                    className="block w-full px-10 py-5 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSelect("Monthly")}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className="block w-full px-10 py-5 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSelect("Weekly")}
                  >
                    Weekly
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </header>
  );
}

export default Header;