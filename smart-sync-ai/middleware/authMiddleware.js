const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234';

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to check if user is an Admin
exports.isAdmin = (req, res, next) => {
    if (req.role !== 'Admin') {
        return res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
    next();
};
