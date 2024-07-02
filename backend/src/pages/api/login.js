// src/pages/api/login.js
import clientPromise from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  if (req.method !== 'POST') {      //NOT EQUAL
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('API');    //handler tries to find a user document with given email
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email ' });
    }
//check if provided password matches the stored hashed password.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
//email and password are valid, handler generates a JWT token using jwt.sign 
//token includes user's ID and email, and it expires in 1 hour.
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
