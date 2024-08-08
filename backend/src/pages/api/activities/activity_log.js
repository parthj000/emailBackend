// src/pages/api/activities/activity_log.js
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  const token = req.headers["x-auth-token"];
  if (!token) {
     return res.status(401).json({ message: "Missing or invalid token" });
   }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("activity_log");

    if (method === "GET") {
      const activityLogs = await collection.find(
        { user_id: decoded.userId }, 
        { projection: { user_id: 0 }}
      ).toArray();
      return res.status(200).json(activityLogs);
    }

    if (method === "POST") {
      const {  activity_type_id, activity_sub_type_id, date, duration } = req.body;
      if (!activity_type_id || !date || !duration) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newActivityLog = {
        user_id: decoded.userId,
        activity_type_id,
        activity_sub_type_id,
        date,
        duration,
        createdAt: Math.floor(Date.now() / 1000), // Store createdAt as Unix timestamp in seconds

      };
      const result = await collection.insertOne(newActivityLog);
      return res.status(201).json(result);
    }
    return res.status(405).json({ message: "Method not allowed" });
  } 
  
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}