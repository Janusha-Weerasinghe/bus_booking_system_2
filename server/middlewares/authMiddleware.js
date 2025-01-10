const jwt = require('jsonwebtoken');

// Middleware for verifying JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
        return res.status(401).json({ message: 'Access Denied. Invalid token format. Expected "Bearer <token>".' + req.headers['authorization'] });
    }

    const token = tokenParts[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        req.user = decoded;
        next();
    });

};

// Middleware to check if the user has specific roles
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.roleName)) {
            return res.status(403).json({ message: 'Access Denied. Insufficient role privileges.' });
        }
        next();
    };
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.roleName !== 'Admin') {
        return res.status(403).json({ message: 'Access Denied. You are not an admin.' });
    }
    next();
};

// Middleware to check if the user is an operator
const isOperator = (req, res, next) => {
    if (!req.user || req.user.roleName !== 'Operator') {
        return res.status(403).json({ message: 'Access Denied. You are not an operator.' });
    }
    next();
};

// Middleware to check if the user is a commuter
const isCommuter = (req, res, next) => {
    if (!req.user || req.user.roleName !== 'Commuter') {
        return res.status(403).json({ message: 'Access Denied. You are not a commuter.' });
    }
    next();
};


module.exports = {
    authenticateToken,
    checkRole,
    isAdmin,
    isOperator,
    isCommuter,
};
