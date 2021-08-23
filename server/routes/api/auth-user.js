const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const verifyToken = require('../../middleware/verifyToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const User = require('../../models/User');

// @router  GET api/auth-user
// @desc    Get User
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @router  GET api/auth-user/verify/:token
// @desc    Verify User email
// @access  Public
router.get('/verify/:token', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.id);
		if (user.verified) {
			return res.status(400).json('This account has been verified');
		}
		await User.findOneAndUpdate(
			{ _id: req.id },
			{ verified: true },
			{ new: true },
		);
		res.json('Your email has been successfully verified');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

// @router  POST api/auth-user
// @desc    Authenticate user & get token
// @access  Public
router.post(
	'/',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password of 8 or more characters')
			.isLength({ min: 8 })
			.escape(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json('Invalid Credentials');
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json('Invalid Credentials');
			}

			if (!user.verified) {
				return res.status(400).json("This account isn't verified");
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	},
);

// @router  POST api/auth-user/forgot
// @desc    User forgot password
// @access  Public
router.post(
	'/forgot',
	[check('email', 'Please enter a valid email').isEmail()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json('Invalid Credentials');
			}

			if (!user.verified) {
				return res.status(400).json("This account isn't verified");
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				const output = `
          <h1>Hie ${user.name}</h1>
          <h2>Password reset</h2>
          <p>Please click the link below to reset your password<p/>
          <a href="https://endiks.herokuapp.com/user/reset-password?token=${token}">reset password</a>
        `;

				let transporter = nodemailer.createTransport({
					host: 'mail.endiksltd.com',
					port: 587,
					secure: false,
					auth: {
						user: myEmail,
						pass: myPassword,
					},
					tls: {
						rejectUnauthorized: false,
					},
				});

				let mailOptions = {
					from: `Password reset ${myEmail}`,
					to: email,
					subject: 'Password reset',
					html: output,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						res.json('Thank you, your email has been sent');
						console.log('Email sent: ' + info.response);
					}
				});
				res.json('A password reset link has been sent to your email');
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	},
);

// @router  POST api/auth-user/reset-password/:token
// @desc    Reset User Password
// @access  Public
router.post(
	'/reset-password/:token',
	[
		verifyToken,
		[
			check('password', 'Please enter a password of 8 or more characters')
				.isLength({ min: 8 })
				.escape(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.id);
			if (!user.verified) {
				return res
					.status(401)
					.json(
						'You cannot perform this action because your email is not verified',
					);
			}
			const salt = await bcrypt.genSalt(10);

			const password = await bcrypt.hash(req.body.password, salt);
			await User.findByIdAndUpdate(
				{ _id: req.id },
				{ password },
				{ new: true },
			);
			res.json('Your password has been successfully changed');
		} catch (err) {
			console.error(user);
			res.status(500).json('Server Error');
		}
	},
);

module.exports = router;
