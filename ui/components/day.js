import dayjs from "dayjs";

const getWeekRange = (dateString) => {
  const date = dayjs(dateString);
  const dayOfWeek = date.format("dddd"); // Get the day of the week

  // Calculate the start and end of the week (assuming week starts on Monday)
  const startOfWeek = date.startOf("week").add(1, "day").format("YYYY-MM-DD");
  const endOfWeek = date.endOf("week").add(1, "day").format("YYYY-MM-DD");

  return {
    dayOfWeek,
    startOfWeek,
    endOfWeek,
  };
};

// Example usage
const date = "2024-07-23";
const result = getWeekRange(date);

console.log(`Day of the week: ${result.dayOfWeek}`);
console.log(`Start of the week: ${result.startOfWeek}`);
console.log(`End of the week: ${result.endOfWeek}`);
