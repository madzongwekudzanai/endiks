const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
	try {
		const decoded = jwt.verify(req.params.token, jwtSecret);

		req.id = decoded.user.id;
		next();
	} catch (err) {
		res.status(401).json('Token is not valid');
	}
};
