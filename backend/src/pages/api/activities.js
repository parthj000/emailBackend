// src/pages/api/activities/activities.js
import clientPromise from "../../lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.headers["x-auth-token"];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await clientPromise;
    const db = client.db();

    const activitiesCollection = db.collection("activity_type");
    const subActivitiesCollection = db.collection("activity_sub_type");

    const activities = await activitiesCollection.find({}).toArray();
    
    // Fetch and add subtypes to each activity
    const result = await Promise.all(activities.map(async (activity) => {
      const subtypes = await subActivitiesCollection.find({ activity_type_id: activity._id.toString() }).toArray();
      
      return {
        id: activity._id,
        display_name: activity.name,
        slug: activity.slug,
        active: activity.active,
        subtypes: subtypes.map(sub => ({
          id: sub._id,
          display_name: sub.name,
          slug: sub.slug,
          active: sub.active,
        }))
      };
    }));

    return res.status(200).json({ activities: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
