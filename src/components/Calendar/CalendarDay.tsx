/* eslint-disable */
interface CalendarDayProps {
  dayLabels: string[];
}

function CalendarDay({ dayLabels }: CalendarDayProps) {
  return (
    <div className="flex">
      {dayLabels.map((day, index) => (
        <div
          key={`${day}-${index}`}
          style={{ width: "14.2857%" }}
          className="flex-grow p-2 overflow-hidden text-center border-b-1 text-15 max-w-250:text-20"
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default CalendarDay;
