import { createUser, verifyPassword } from "../models/User.js";
import asyncHandler from "express-async-handler";
import { genToken } from "../utils/genToken.js";
import { db } from '../config/db.js';

const register = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const connection = await db();

    // Check if the email already exists
    const [existingUser] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create the new user
    const userId = await createUser({ name, email, password });

    // Generate the authentication token
    const token = await genToken(userId);

    // Retrieve the newly created user
    const [newUser] = await connection.query(
        'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?',
        [userId]
    );

    res.status(201).json({
        status: "success",
        data: newUser[0],
        token
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const connection = await db();

    // Check if the user exists
    const [existingUser] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (existingUser.length === 0) {
        return res.status(404).json({ message: "User email is not registered. Please sign up." });
    }

    const user = existingUser[0];

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate the authentication token
    const token = await genToken(user.id);

    // Exclude the password field from the response
    const { password: pwd, ...userData } = user;

    res.status(200).json({
        status: "Success!",
        data: userData,
        token
    });
});

export { register, login };
