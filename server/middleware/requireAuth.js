const jwt = require('jsonwebtoken');
const User = require("../models/userModels");

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Authorization Token Required" });
    }

    // Check for Bearer token
    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authorization format is 'Bearer <token>'" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET); 
        const user = await User.findOne({ _id }).select('_id');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid Token, Request is not authorized" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired, please login again" });
        } else {
            // Generic error for unexpected issues
            return res.status(500).json({ message: "An error occurred while processing your request" });
        }
    }
};

module.exports = requireAuth;
