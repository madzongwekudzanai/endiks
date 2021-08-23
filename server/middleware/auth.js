const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
	// Get token from the header
	const token = req.header('x-auth-token');

	// Check in not token
	if (!token) {
		return res.status(401).json('No token, authorization denied');
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, jwtSecret);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json('Token is not valid');
	}
};
