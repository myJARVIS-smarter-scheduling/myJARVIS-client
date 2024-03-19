import { useState, useEffect, useRef } from "react";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

function DropdownMenu({ options = [], placeholder, handleOptionChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    placeholder || (options.length ? options[0].label : ""),
  );

  const dropdownRef = useRef();

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);

    handleOptionChange(option.label);
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
    <div className="flex items-center justify-start w-full h-full pr-30">
      <div
        className="relative inline-block w-full h-full text-left"
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center h-full px-5 py-10 overflow-hidden font-normal text-left text-gray-700 border border-gray-300 rounded-md shadow-sm whitespace-nowrap text-1em md:px-10 min-h-30 min-w-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {selectedOption}
          {isOpen ? (
            <HiOutlineChevronUp size={15} className="ml-5" />
          ) : (
            <HiOutlineChevronDown size={15} className="ml-5" />
          )}
        </button>
        {isOpen && (
          <div className="absolute right-0 z-10 w-full mt-5 font-thin origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="w-full overflow-auto max-h-300">
              {options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className="block w-full py-6 overflow-hidden text-left text-gray-700 px-15 hover:bg-gray-100"
                  onClick={() => handleSelect(option)}
                >
                  {option.value}
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
