// src/pages/api/events.js
import clientPromise from '../../lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST' && method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await clientPromise;
    const db = client.db('');
    const eventsCollection = db.collection('events');

    if (method === 'POST') {
      const { title, startDate, endDate, category, description, recurrence } = req.body;

      if (!title || !startDate || !category || !description || recurrence === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Validate and convert startDate
      const startDateTimestamp = new Date(startDate).getTime();
      const endDateTimestamp = new Date(endDate).getTime();
      console.log(endDateTimestamp);
      if (isNaN(startDateTimestamp)) {
        return res.status(400).json({ message: 'Invalid startDate format' });
      }

      // // Determine endDate if not provided
      // let endDateValue = endDate? new Date().getTime() : new Date().getTime() + 90 * 24 * 60 * 60 * 1000;
      // if (isNaN(endDateValue)) {
      //   return res.status(400).json({ message: 'Invalid endDate format' });
      // }

      const newEvent = {
        userId: decoded.userId,
        title,
        startDate: startDateTimestamp,
        endDate: endDateTimestamp,
        category,
        description,
        recurrence: recurrence, // Convert recurrence to integer
        // createdAt: Date.now(),
        createdAt: Math.floor(Date.now() / 1000) // Store createdAt as Unix timestamp in seconds
        // createdAt: Math.floor(new Date().getTime() / 1000) // Convert current time to Unix timestamp in seconds
      };

      await eventsCollection.insertOne(newEvent);
      return res.status(201).json({ message: 'Event created successfully' });
    }

    if (method === 'GET') {
      const { startDate, endDate } = req.body;

      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Date is required' });
      }

      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();

      if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
        return res.status(400).json({ message: 'Invalid date format' });
      }

      const events = await eventsCollection.find({
        userId: decoded.userId,
        startDate: { $lte: endTimestamp },
        endDate: { $gte: startTimestamp }
      }).toArray();

      // const recurringEvents = generateRecurringEvents(events, startTimestamp, endTimestamp);

      return res.status(200).json({ events });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

function generateRecurringEvents(events, startTimestamp, endTimestamp) {
  const result = [];

  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  events.forEach(event => {
    const { startDate: eventStartDate, endDate: eventEndDate, recurrence } = event;

    const start = new Date(eventStartDate);
    const end = new Date(eventEndDate);

    if (recurrence === 'none') {
      if (isWithinDateRange(start, end, startDate, endDate)) {
        result.push({ ...event, startDate: start.getTime(), endDate: end });
      }
    } else if (recurrence === 'daily') {
      let current = new Date(startTimestamp);
      while (current <= endDate) {
        if (isWithinDateRange(start, end, current, current)) {
          result.push({
            ...event,
            startDate: current.getTime(),
            endDate: new Date(current.setHours(end.getHours(), end.getMinutes()))
          });
        }
        current.setDate(current.getDate() + 1);
      }
    } else if (recurrence === 'weekly') {
      let current = new Date(startTimestamp);
      while (current <= endDate) {
        if (isWithinDateRange(start, end, current, current) && isSameDayOfWeek(start, current)) {
          result.push({
            ...event,
            startDate: current.getTime(),
            endDate: new Date(current.setHours(end.getHours(), end.getMinutes()))
          });
        }
        current.setDate(current.getDate() + 1);
      }
    } else if (recurrence === 'monthly') {
      let current = new Date(startTimestamp);
      while (current <= endDate) {
        if (isWithinDateRange(start, end, current, current) && isSameDayOfMonth(start, current)) {
          result.push({
            ...event,
            startDate: current.getTime(),
            endDate: new Date(current.setHours(end.getHours(), end.getMinutes()))
          });
        }
        current.setMonth(current.getMonth() + 1);
      }
    }
  });

  return result;
}

function isWithinDateRange(start, end, startDate, endDate) {
  return (start >= startDate && start <= endDate) || (end >= startDate && end <= endDate) || (start <= startDate && end >= endDate);
}

function isSameDayOfWeek(date1, date2) {
  return date1.getUTCDay() === date2.getUTCDay();
}

function isSameDayOfMonth(date1, date2) {
  return date1.getUTCDate() === date2.getUTCDate();
}
