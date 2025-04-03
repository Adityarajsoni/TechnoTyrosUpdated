const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoURI || !jwtSecret) {
    console.error("❌ Missing environment variables! Check your .env file.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

// 🔹 Helper function to generate JWT Token
const generateToken = (userId, email) => {
    return jwt.sign({ id: userId, email }, jwtSecret, { expiresIn: "1h" });
};

// 🔹 Signup Route (with password hashing)
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Check if user already exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User already exists." });
        }

        // 🔹 Enforce strong password policy
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        // Hash password with explicit salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const newUser = await new User({ email, password: hashedPassword }).save();
        
        // Generate token and set it in cookie
        const token = generateToken(newUser._id, email);
        res.cookie("authToken", token, { httpOnly: true, secure: false, sameSite: "strict" });

        res.status(201).json({ message: "Signup successful!", token });

    } catch (error) {
        console.error("❌ Error during signup:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// 🔹 Login Route (with JWT Token in cookie)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found. Please sign up first." });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Generate JWT Token
        const token = generateToken(existingUser._id, email);
        res.cookie("authToken", token, { httpOnly: true, secure: false, sameSite: "strict" });

        res.status(200).json({ message: "Login successful!", token });

    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// 🔹 Protected Route Example
app.get('/dashboard', (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        res.status(200).json({ message: `Welcome, ${decoded.email}!` });
    });
});

// Start server
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server started on port ${port}`);
});
