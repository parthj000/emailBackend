// src/pages/api/events.js
import clientPromise from "../../lib/mongodb";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST" && method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  var token;
  if (method === "GET") {
    token = req.query.token;
  } else {
    token = req.body.token;
  }
  // const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await clientPromise;
    const db = client.db("");
    const eventsCollection = db.collection("events");

    if (method === "POST") {
      const { title, startDate, endDate, category, description, recurrence } =
        req.body;

      if (
        !title ||
        !startDate ||
        !category ||
        !description ||
        recurrence === undefined
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const startDateTimestamp = new Date(startDate).getTime();
      const endDateTimestamp = new Date(endDate).getTime();

      if (isNaN(startDateTimestamp)) {
        return res.status(400).json({ message: "Invalid startDate format" });
      }

      const newEvent = {
        userId: decoded.userId,
        title,
        startDate: Math.floor(startDateTimestamp / 1000), // Convert to seconds
        endDate: Math.floor(endDateTimestamp / 1000), // Convert to seconds
        category,
        description,
        recurrence,
        createdAt: Math.floor(Date.now() / 1000), // Store createdAt as Unix timestamp in seconds
      };

      await eventsCollection.insertOne(newEvent);
      return res.status(201).json({ message: "Event created successfully" });
    }

    if (method === "GET") {
      const { mode, startDate, endDate } = req.query;
      console.log(req.query);
      let startTimestamp, endTimestamp, prevStart, prevEnd, nextStart, nextEnd;

      if (startDate && endDate) {
        startTimestamp = parseInt(startDate); // Assuming provided in seconds
        endTimestamp = parseInt(endDate); // Assuming provided in seconds

        if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
          return res.status(400).json({ message: "Invalid date format" });
        }

        const startDayjs = dayjs.unix(startTimestamp);
        const endDayjs = dayjs.unix(endTimestamp);

        if (mode) {
          switch (mode) {
            case "D":
              prevStart = startDayjs.subtract(1, "day").startOf("day").unix();
              prevEnd = startDayjs.subtract(1, "day").endOf("day").unix();
              nextStart = startDayjs.add(1, "day").startOf("day").unix();
              nextEnd = startDayjs.add(1, "day").endOf("day").unix();
              break;
            case "W":
              prevStart = startDayjs.subtract(1, "week").startOf("week").unix();
              prevEnd = startDayjs.subtract(1, "week").endOf("week").unix();
              nextStart = startDayjs.add(1, "week").startOf("week").unix();
              nextEnd = startDayjs.add(1, "week").endOf("week").unix();
              break;
            case "M":
              prevStart = startDayjs.subtract(1, "month").startOf("month").unix();
              prevEnd = startDayjs.subtract(1, "month").endOf("month").unix();
              nextStart = startDayjs.add(1, "month").startOf("month").unix();
              nextEnd = startDayjs.add(1, "month").endOf("month").unix();
              break;
            default:
              return res.status(400).json({ message: "Invalid mode" });
          }
        }
      } else if (mode) {
        const now = dayjs();
        switch (mode) {
          case "D":
            startTimestamp = now.startOf("day").unix();
            endTimestamp = now.endOf("day").unix();
            prevStart = now.subtract(1, "day").startOf("day").unix();
            prevEnd = now.subtract(1, "day").endOf("day").unix();
            nextStart = now.add(1, "day").startOf("day").unix();
            nextEnd = now.add(1, "day").endOf("day").unix();
            break;
          case "W":
            startTimestamp = now.startOf("week").unix();
            endTimestamp = now.endOf("week").unix();
            prevStart = now.subtract(1, "week").startOf("week").unix();
            prevEnd = now.subtract(1, "week").endOf("week").unix();
            nextStart = now.add(1, "week").startOf("week").unix();
            nextEnd = now.add(1, "week").endOf("week").unix();
            break;
          case "M":
            startTimestamp = now.startOf("month").unix();
            endTimestamp = now.endOf("month").unix();
            prevStart = now.subtract(1, "month").startOf("month").unix();
            prevEnd = now.subtract(1, "month").endOf("month").unix();
            nextStart = now.add(1, "month").startOf("month").unix();
            nextEnd = now.add(1, "month").endOf("month").unix();
            break;
          default:
            return res.status(400).json({ message: "Invalid mode" });
        }
      } else {
        return res.status(400).json({
          message: "Either mode or startDate and endDate are required",
        });
      }

      const events = await eventsCollection
        .find({
          userId: decoded.userId,
          startDate: { $lte: endTimestamp },
          endDate: { $gte: startTimestamp },
        })
        .toArray();

      return res.status(200).json({
        events,
        prev: { startDate: prevStart, endDate: prevEnd },
        next: { startDate: nextStart, endDate: nextEnd },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function generateRecurringEvents(events, startTimestamp, endTimestamp) {
  const result = [];

  const startDate = new Date(startTimestamp * 1000); // Convert to milliseconds
  const endDate = new Date(endTimestamp * 1000); // Convert to milliseconds

  events.forEach((event) => {
    const {
      startDate: eventStartDate,
      endDate: eventEndDate,
      recurrence,
    } = event;

    const start = new Date(eventStartDate * 1000); // Convert to milliseconds
    const end = new Date(eventEndDate * 1000); // Convert to milliseconds

    if (recurrence === "none") {
      if (isWithinDateRange(start, end, startDate, endDate)) {
        result.push({ ...event, startDate: start.getTime(), endDate: end });
      }
    } else if (recurrence === "daily") {
      let current = new Date(startTimestamp * 1000); // Convert to milliseconds
      while (current <= endDate) {
        if (isWithinDateRange(start, end, current, current)) {
          result.push({
            ...event,
            startDate: current.getTime(),
            endDate: new Date(
              current.setHours(end.getHours(), end.getMinutes())
            ),
          });
        }
        current.setDate(current.getDate() + 1);
      }
    } else if (recurrence === "weekly") {
      let current = new Date(startTimestamp * 1000); // Convert to milliseconds
      while (current <= endDate) {
        if (
          isWithinDateRange(start, end, current, current) &&
          isSameDayOfWeek(start, current)
        ) {
          result.push({
            ...event,
            startDate: current.getTime(),
            endDate: new Date(
              current.setHours(end.getHours(), end.getMinutes())
            ),
          });
        }
        current.setDate(current.getDate() + 1);
      }
    } else if (recurrence === "monthly") {
      let current = new Date(startTimestamp * 1000); // Convert to milliseconds
      while (current <= endDate) {
        if (
          isWithinDateRange(start, end, current, current) &&
          isSameDayOfMonth(start, current)
        ) {
          result.push({
            ...event,
            startDate: current.getTime(),
            endDate: new Date(
              current.setHours(end.getHours(), end.getMinutes())
            ),
          });
        }
        current.setMonth(current.getMonth() + 1);
      }
    }
  });

  return result;
}

function isWithinDateRange(start, end, rangeStart, rangeEnd) {
  return (
    (start >= rangeStart && start <= rangeEnd) ||
    (end >= rangeStart && end <= rangeEnd)
  );
}

function isSameDayOfWeek(date1, date2) {
  return date1.getDay() === date2.getDay();
}

function isSameDayOfMonth(date1, date2) {
  return date1.getDate() === date2.getDate();
}
