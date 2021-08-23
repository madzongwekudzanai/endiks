const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
	// Get token from then header
	const token = req.header('z-auth-token');

	// Check in not token
	if (!token) {
		return res.status(401).json('No token, authorization denied');
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, jwtSecret);

		req.seller = decoded.user;
		next();
	} catch (err) {
		res.status(401).json('Token is not valid');
	}
};
