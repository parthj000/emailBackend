// src/pages/api/events.js
import clientPromise from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

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
      const { name, startDate, endDate, category, description, recurrence } = req.body;
        // if (!name || !startDate || !endDate || !category || !description || !recurrence) {
        //   return res.status(400).json({ message: 'All fields are required' });
        // }
      if (!name || !startDate || !category || !description || !recurrence) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      let endDateValue = endDate;
      if (!endDateValue) {    //If endDate not given, event pesist for 3 months
        const startDateDate = new Date(startDate);
        endDateValue = new Date(startDateDate.setMonth(startDateDate.getMonth() + 3));
      }
   
      const newEvent = {
        userId: decoded.userId,
        name,
        startDate: new Date(startDate),
        endDate: endDateValue,
        category,
        description,
        recurrence,
        createdAt: new Date(),
      };

      await eventsCollection.insertOne(newEvent);
      // return res.status(201).json({ message: 'Event created successfully', event: newEvent });

      return res.status(201).json({ message: 'Event created successfully'  });
    }

    if (method === 'GET') {
      const { date } = req.body;

      if (!date) {
        return res.status(400).json({ message: 'Date is required' });
      }

      const events = await eventsCollection.find({
        userId: decoded.userId
      }).toArray();

      const filteredEvents = generateRecurringEvents(events, new Date(date));

      return res.status(200).json({ events: filteredEvents });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


function generateRecurringEvents(events, targetDate) {
    const result = [];
  
    events.forEach(event => {
      const { startDate, endDate, recurrence } = event;
  
      const start = new Date(startDate);
      const end = new Date(endDate);
      const target = new Date(targetDate);
  
      if (recurrence === 'none') {
        if (isSameDay(start, target)) {
          result.push(event);
        }
      } else if (recurrence === 'daily') {
        if (isWithinDateRange(start, end, target)) {
          result.push({...event, startDate: target, endDate: new Date(target).setHours(end.getHours(), end.getMinutes()) });
        }
      } else if (recurrence === 'weekly') {
        const weeklyOffset = (target - start) / (7 * 24 * 60 * 60 * 1000);
        const weeklyDate = new Date(start.getTime() + weeklyOffset * 7 * 24 * 60 * 60 * 1000);
        if (isWithinDateRange(start, end, weeklyDate)) {
          result.push({...event, startDate: weeklyDate, endDate: new Date(weeklyDate).setHours(end.getHours(), end.getMinutes()) });
        }
      } else if (recurrence === 'monthly') {
        const monthlyOffset = (target.getFullYear() - start.getFullYear()) * 12 + (target.getMonth() - start.getMonth());
        const monthlyDate = new Date(start.getTime() + monthlyOffset * 30 * 24 * 60 * 60 * 1000);
        if (isWithinDateRange(start, end, monthlyDate)) {
          result.push({...event, startDate: monthlyDate, endDate: new Date(monthlyDate).setHours(end.getHours(), end.getMinutes()) });
        }
      }
    });
  
    return result;
  }
function isSameDay(date1, date2) {
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate();
  }
  
  function isWithinDateRange(startDate, endDate, targetDate) {
    return targetDate >= startDate && targetDate <= endDate;
  }
  
  function isSameDayOfWeek(date1, date2) {
    return date1.getUTCDay() === date2.getUTCDay();
  }
  
  function isSameDayOfMonth(date1, date2) {
    return date1.getUTCDate() === date2.getUTCDate();
  }