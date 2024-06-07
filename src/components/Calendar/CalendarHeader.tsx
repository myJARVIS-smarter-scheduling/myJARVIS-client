import { MdChevronLeft, MdOutlineChevronRight } from "react-icons/md";

import useCurrentMonthStore from "../../store/dates";
import { CALENDAR_MONTHS } from "../../constant/calendar";

function CalendarHeader({ isDatePicker = false }) {
  const { currentMonth, setCurrentMonth } = useCurrentMonthStore();

  const currentMonthName = CALENDAR_MONTHS[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  function setPreviousMonth() {
    const previousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
    );

    setCurrentMonth(previousMonth);
  }

  function setNextMonth() {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
    );

    setCurrentMonth(nextMonth);
  }

  function setToday() {
    setCurrentMonth(new Date());
  }

  return (
    <header className="flex items-center justify-between w-full">
      <section className="flex items-center w-full space-x-30">
        {!isDatePicker && (
          <button
            type="button"
            onClick={setToday}
            className="text-sm font-light border border-b-2 rounded min-w-70 min-h-30 text-slate-700"
          >
            TODAY
          </button>
        )}
        <nav className="flex items-center justify-between w-80">
          <button onClick={setPreviousMonth}>
            <MdChevronLeft size={30} aria-label="Go to previous month" />
          </button>
          <button onClick={setNextMonth}>
            <MdOutlineChevronRight size={30} aria-label="Go to next month" />
          </button>
        </nav>
        <section>
          <p className="space-x-10 text-xl font-light sm:text-lg">
            <span>{currentMonthName}</span>
            <span>{currentYear}</span>
          </p>
        </section>
      </section>
    </header>
  );
}

export default CalendarHeader;
