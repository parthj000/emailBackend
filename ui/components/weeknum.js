export const getWeekNumberInMonth = (date) => {
  // Start of the month
  const startOfMonth = dayjs(date).startOf("month");
  // Current date
  const currentDate = dayjs(date);

  // Calculate the week number
  const weekNumber = Math.ceil((currentDate.date() + startOfMonth.day()) / 7);

  return weekNumber;
};

// Function to generate week numbers for a given month
export const generateWeekNumbersForMonth = (date) => {
  const startOfMonth = dayjs(date).startOf("month");
  const endOfMonth = dayjs(date).endOf("month");

  let current = startOfMonth;
  let weeks = [];

  while (current.isBefore(endOfMonth) || current.isSame(endOfMonth)) {
    const weekNumber = getWeekNumberInMonth(current);
    if (!weeks.includes(weekNumber)) {
      weeks.push(weekNumber);
    }
    current = current.add(1, "week");
  }

  return weeks;
};
