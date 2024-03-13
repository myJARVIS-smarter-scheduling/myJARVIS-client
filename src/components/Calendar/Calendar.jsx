import useCurrentMonthStore from "../../store/dates";

import CalendarBody from "./CalendarBody";

function Calendar() {
  const { currentMonth, selectedDate, setSelectedDate } =
    useCurrentMonthStore();

  return (
    <main className="flex items-center justify-center flex-auto w-full h-full bg-white">
      <CalendarBody
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </main>
  );
}

export default Calendar;
