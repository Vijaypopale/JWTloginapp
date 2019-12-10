const User = require("../models/user");

exports.postUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });
        const token = user.getSignedJwtToken();
        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const user = await User.find();
        res.status(201).json({
            message: "All Users",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Please provide an email and password"
            });
        }
        // Check for user
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const token = user.getSignedJwtToken();
        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};
