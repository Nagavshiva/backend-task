const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware"); 
const bcrypt = require("bcryptjs");

// Signup function
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
       // Check if user already exists with the same email
        const existingUser = await User.findOne({ email });

        // If user already exists, return an error response
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" }); 
        }
        // Hash the password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with hashed password 
        const user = new User({ name, email, password: hashedPassword }); 

        // Save the user object to the database
        await user.save(); 

        // Generate a JWT token for the user
        const token = authMiddleware.generateToken(user._id); 
        return res.status(201).json({ message: "Signup created successfully", token }); 
    } catch (error) {
        console.error(error); // Log any errors
        return res.status(500).json({ message: "Internal server error" }); 
    }
};

// Login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with the given email
        const user = await User.findOne({ email }); 

        // If user doesn't exist, return an error response
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" }); 
        }

        // Compare the hashed password with the entered password
        const passwordMatches = await bcrypt.compare(password, user.password); 

        // If password doesn't match, return an error response
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" }); 
        }

        // Generate a JWT token for the user
        const token = authMiddleware.generateToken(user._id); 
        return res.json({ message: "Login successfully", token }); 
    } catch (error) {
        console.error(error); // Log any errors
        return res.status(500).json({ message: "Internal server error" }); 
    }
};
