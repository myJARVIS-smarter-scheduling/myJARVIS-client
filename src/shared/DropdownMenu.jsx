import { useState, useEffect, useRef } from "react";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

function DropdownMenu({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);

  const dropdownRef = useRef();

  const handleSelect = (label) => {
    setSelectedOption(label);
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
    <div className="pr-30">
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center w-full px-5 text-sm font-normal text-left text-gray-700 border border-gray-300 rounded-md shadow-sm min-w-100 min-h-30 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {selectedOption}
          {isOpen ? (
            <HiOutlineChevronUp size={15} className="ml-5" />
          ) : (
            <HiOutlineChevronDown size={15} className="ml-5" />
          )}
        </button>
        {isOpen && (
          <div className="absolute right-0 z-10 w-full mt-5 text-sm font-thin origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="overflow-auto max-h-300">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="block w-full py-6 text-sm text-left text-gray-700 px-15 hover:bg-gray-100"
                  onClick={() => handleSelect(option.label)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
