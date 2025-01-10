const jwt = require('jsonwebtoken');

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Extract token from header
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' + token });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
        req.user = user; // Attach user object to the request for later use
        next();
    });
};

/// Middleware to check if the user has the required role(s)
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.roleName)) {
            return res.status(403).json({ message: 'Access Denied. You do not have the required role.' });
        }
        next();
    };
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.roleName !== 'Admin') { // Check if roleName is 'admin'
        return res.status(403).json({ message: 'Access Denied. You are not an admin.' });
    }
    next();
};

// Middleware to check if the user is an operator
const isOperator = (req, res, next) => {
    if (req.user.roleName !== 'Operator') {
        return res.status(403).json({ message: 'Access Denied. You are not an operator.' });
    }
    next();
};

// Middleware to check if the user is a commuter
const isCommuter = (req, res, next) => {
    if (req.user.roleName !== 'Commuter') {
        return res.status(403).json({ message: 'Access Denied. You are not a commuter.' });
    }
    next();
};

module.exports = {
    authenticateToken,
    isAdmin,
    isOperator,
    isCommuter,
    checkRole // Export the general checkRole middleware
};

// // Example protected route
// router.get('/protected', verifyToken, (req, res) => {
//     res.status(200).json({ success: true, message: 'This is a protected route' });
// });
