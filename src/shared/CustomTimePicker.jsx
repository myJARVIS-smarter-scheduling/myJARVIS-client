import React, { useState, useRef, useEffect } from "react";

import TIME_OPTIONS from "../constant/schedule";

function TimePicker({ initialTime, handleTimeClick, labelForTest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    typeof initialTime !== "string"
      ? initialTime.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : initialTime,
  );
  const [filter, setFilter] = useState("");
  const timeRef = useRef(null);

  const filteredTimes = filter
    ? TIME_OPTIONS.filter((time) => time.includes(filter))
    : TIME_OPTIONS;

  useEffect(() => {
    function handleClickOutside(event) {
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectTime = (time) => {
    setSelectedTime(time);
    handleTimeClick(time);
    setIsOpen(false);
    setFilter("");
  };

  return (
    <div className="relative inline-block text-left" ref={timeRef}>
      <div className="flex flex-col items-center shadow-sm">
        <input
          aria-label={labelForTest}
          type="text"
          value={selectedTime}
          onChange={(event) => {
            setFilter(event.target.value);
            setSelectedTime(event.target.value);
          }}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="Select time"
          className="h-40 p-10 text-sm border border-gray-300 rounded-md shadow-sm max-w-100 form-input focus:ring focus:border-blue-500"
        />
        {isOpen && (
          <div className="absolute left-0 w-full overflow-y-auto origin-top-right bg-white rounded-md shadow-lg mt-45 ring-1 ring-black ring-opacity-5 max-h-120">
            <ul className="py-1 text-sm">
              {filteredTimes.map((time, index) => (
                <li
                  key={time}
                  aria-hidden="true"
                  className="px-10 py-6 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    selectTime(time);
                    setIsOpen(false);
                  }}
                >
                  {time.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimePicker;
