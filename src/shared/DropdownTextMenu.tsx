import React, { useState, useRef, useEffect } from "react";

interface DropOption {
  label: string;
  value: string;
}

interface Timezone {
  label: string;
  value: string;
  lat: number;
  long: number;
}

interface DropDownTextMenuProps {
  options: Timezone[];
  placeholder: string;
  testIdName: string;
  handleOptionChange: (value: string) => void;
}

function DropDownTextMenu({
  options,
  placeholder,
  testIdName,
  handleOptionChange,
}: DropDownTextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayView = options.filter((option) => option.value === placeholder);
  const [selectedOption, setselectedOption] = useState(
    displayView[0].label || (options.length ? options[0].label : ""),
  );
  const [filter, setFilter] = useState("");
  const optionRef = useRef<HTMLDivElement>(null);
  const filteredOption = filter
    ? options.filter(
        (option) =>
          option.label &&
          option.label.toLowerCase().includes(filter.toLowerCase()),
      )
    : options;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectOption = (option: DropOption) => {
    setselectedOption(option.label);
    handleOptionChange(option.value);
    setIsOpen(false);
    setFilter("");
  };

  return (
    <div className="relative inline-block w-full text-left" ref={optionRef}>
      <div className="flex flex-col items-center w-full shadow-sm">
        <input
          data-testid={testIdName}
          type="text"
          value={selectedOption}
          onChange={(event) => {
            setFilter(event.target.value);
            setselectedOption(event.target.value);
          }}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="Select time"
          className="w-full h-40 p-10 text-sm border border-gray-300 rounded-md shadow-sm form-input focus:ring focus:border-blue-500"
        />
        {isOpen && (
          <div className="absolute left-0 w-full overflow-y-auto origin-top-right bg-white rounded-md shadow-lg mt-45 ring-1 ring-black ring-opacity-5 max-h-200">
            <ul className="py-1 text-sm">
              {filteredOption.map((option, index) => (
                <li
                  key={option.value}
                  aria-hidden="true"
                  className="px-4 py-10 cursor-pointer hover:bg-gray-100"
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDownTextMenu;
