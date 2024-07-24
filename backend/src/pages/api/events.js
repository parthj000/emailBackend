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

const DAY = 'D';
const WEEK = 'W';
const MONTH = 'M';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "POST" && method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = method === "GET" ? req.query.token : req.body.token;

  // if (!token) {
  //   return res.status(401).json({ message: "Missing or invalid token" });
  // }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await clientPromise;
    const db = client.db("");
    const eventsCollection = db.collection("events");

    if (method === "POST") {
      const { title, startDate, endDate, category, description, recurrence } = req.body;

      if (!title || !startDate || !category || !description || recurrence === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const startDateTimestamp = Math.floor(new Date(startDate).getTime());
      const endDateTimestamp = Math.floor(new Date(endDate).getTime() );

      if (isNaN(startDateTimestamp)) {
        return res.status(400).json({ message: "Invalid startDate format" });
      }

      const newEvent = {
        userId: decoded.userId,
        title,
        startDate: startDateTimestamp, // Already in seconds
        endDate: endDateTimestamp, // Already in seconds
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
      let startTimestamp, endTimestamp, prevStart, prevEnd, nextStart, nextEnd;
      let startDayjs, endDayjs;
      
      if (startDate && endDate) {
        startDayjs = dayjs.unix(parseInt(startDate));
        endDayjs = dayjs.unix(parseInt(endDate));
      } else {
        const now = dayjs();
        startDayjs = now;
        endDayjs = now;
      }
      
      if (mode) {
        switch (mode) {
          case DAY:
            prevStart = startDayjs.subtract(1, "day").startOf("day").unix();
            prevEnd = startDayjs.subtract(1, "day").endOf("day").unix();
            nextStart = startDayjs.add(1, "day").startOf("day").unix();
            nextEnd = startDayjs.add(1, "day").endOf("day").unix();
            startTimestamp = startDayjs.startOf("day").unix();
            endTimestamp = startDayjs.endOf("day").unix();
            break;
          case WEEK:
            prevStart = startDayjs.subtract(1, "week").startOf("week").unix();
            prevEnd = startDayjs.subtract(1, "week").endOf("week").unix();
            nextStart = startDayjs.add(1, "week").startOf("week").unix();
            nextEnd = startDayjs.add(1, "week").endOf("week").unix();
            startTimestamp = startDayjs.startOf("week").unix();
            endTimestamp = startDayjs.endOf("week").unix();
            break;
          case MONTH:
            prevStart = startDayjs.subtract(1, "month").startOf("month").unix();
            prevEnd = startDayjs.subtract(1, "month").endOf("month").unix();
            nextStart = startDayjs.add(1, "month").startOf("month").unix();
            nextEnd = startDayjs.add(1, "month").endOf("month").unix();
            startTimestamp = startDayjs.startOf("month").unix();
            endTimestamp = startDayjs.endOf("month").unix();
            break;
          default:
            return res.status(400).json({ message: "Invalid mode" });
        }
      } else {
        return res.status(400).json({ message: "Mode is required" });
      }
      
      const events = await eventsCollection
        .find({
          userId: decoded.userId,
          startDate: { $lte: endTimestamp },
          endDate: { $gte: startTimestamp },
        })
        .toArray();

      const allEvents = generateRecurringEvents(events, startTimestamp, endTimestamp);
      
      return res.status(200).json({
        events: allEvents,
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

  events.forEach((event) => {
    const {
      startDate: eventStartDate,
      endDate: eventEndDate,
      recurrence,
    } = event;

    const start = eventStartDate; // Already in seconds
    const end = eventEndDate; // Already in seconds

    if (recurrence === "none") {
      if (isWithinDateRange(start, end, startTimestamp, endTimestamp)) {
        result.push(event);
      }
    } else if (recurrence === "daily") {
      let current = dayjs.unix(start);
      let endDate = dayjs.unix(end);
      while (current.unix() <= endDate.unix()) {
        let eventStartDate = current.unix();
        let eventEndDate = Math.min(current.add(24, 'hour').unix(), endDate.unix());
        if (isWithinDateRange(eventStartDate, eventEndDate, startTimestamp, endTimestamp)) {
          result.push({
            ...event,
            startDate: eventStartDate,
            endDate: eventEndDate,
          });
        }
        current = current.add(1, 'day');
      }
    } else if (recurrence === "weekly") {
      let current = dayjs.unix(start);
      let endDate = dayjs.unix(end);
      while (current.unix() <= endDate.unix()) {
        let eventStartDate = current.unix();
        let eventEndDate = Math.min(current.add(7, 'day').unix(), endDate.unix());
        if (isWithinDateRange(eventStartDate, eventEndDate, startTimestamp, endTimestamp)) {
          result.push({
            ...event,
            startDate: eventStartDate,
            endDate: eventEndDate,
          });
        }
        current = current.add(1, 'week');
      }
    } else if (recurrence === "monthly") {
      let current = dayjs.unix(start);
      let endDate = dayjs.unix(end);
      while (current.unix() <= endDate.unix()) {
        let eventStartDate = current.unix();
        let eventEndDate = Math.min(current.add(1, 'month').unix(), endDate.unix());
        if (isWithinDateRange(eventStartDate, eventEndDate, startTimestamp, endTimestamp)) {
          result.push({
            ...event,
            startDate: eventStartDate,
            endDate: eventEndDate,
          });
        }
        current = current.add(1, 'month');
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
