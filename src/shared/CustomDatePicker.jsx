import { useState, useEffect, useRef } from "react";

import CalendarHeader from "../components/Calendar/CalendarHeader";
import CalendarBody from "../components/Calendar/CalendarBody";

function CustomDatePicker({ initialTime, handleDateClick, placeholder }) {
  function getFormattedDate(date) {
    return new Date(date).toDateString().split(" ").slice(0, 4).join(" ");
  }

  const [eventDate, seteventDate] = useState(getFormattedDate(initialTime));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef();

  function toggleCalendar() {
    setIsCalendarOpen(!isCalendarOpen);
  }

  function handleDateChange(selectedDate) {
    const formattedDate = getFormattedDate(selectedDate);

    seteventDate(formattedDate);
    handleDateClick(selectedDate);
    toggleCalendar();
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex space-x-20">
        <input
          type="text"
          className="h-40 p-10 font-light text-center border-b-2 border-gray-300 rounded-md max-w-150 form-input bg-slate-100 focus:border-blue-500 focus:ring-0"
          placeholder={placeholder}
          value={eventDate}
          onClick={toggleCalendar}
          readOnly
        />
      </div>
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className="absolute z-10 flex flex-col items-center justify-center px-10 space-y-20 bg-white rounded-lg shadow-md py-15 min-h-280 min-w-300"
        >
          <CalendarHeader isDatePicker />
          <CalendarBody
            isMiniCalendar
            handleEventDateChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
