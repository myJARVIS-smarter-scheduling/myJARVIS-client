export const getCalendarDates = (thisMonth: Date): Date[] => {
  const dateList: Date[] = [];

  const firstDateOfMonth = new Date(
    thisMonth.getFullYear(),
    thisMonth.getMonth(),
    1,
  );
  const lastDateOfMonth = new Date(
    thisMonth.getFullYear(),
    thisMonth.getMonth() + 1,
    0,
  );

  const daysBeforeStart = firstDateOfMonth.getDay();

  for (let i = daysBeforeStart; i > 0; i -= 1) {
    const date = new Date(firstDateOfMonth);

    date.setDate(date.getDate() - i);
    dateList.push(date);
  }

  for (let i = 1; i <= lastDateOfMonth.getDate(); i += 1) {
    const date = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), i);

    dateList.push(date);
  }

  const nextMonthDaysAfterCurrentMonth = 7 - lastDateOfMonth.getDay();

  if (nextMonthDaysAfterCurrentMonth > 0) {
    for (let i = 1; i < nextMonthDaysAfterCurrentMonth; i += 1) {
      const date = new Date(lastDateOfMonth);

      date.setDate(date.getDate() + i);
      dateList.push(date);
    }
  }

  return dateList;
};

export const buildCalendarWeeks = (dateList: Date[]): Date[][] => {
  const weeks: Date[][] = [];
  let week: Date[] = [];

  dateList.forEach((date, index) => {
    week.push(date);

    if ((index + 1) % 7 === 0) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length > 0) {
    weeks.push(week);
  }

  return weeks;
};
