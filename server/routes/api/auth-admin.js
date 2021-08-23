const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const verifyToken = require('../../middleware/verifyToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const Admin = require('../../models/Admin');

// @router  GET api/auth-user
// @desc    Get Admin
// @access  Private
router.get('/', adminAuth, async (req, res) => {
	try {
		const user = await Admin.findById(req.admin.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @router  GET api/auth-admin/verify/:token
// @desc    Verify Admin
// @access  Public
router.get('/verify/:token', verifyToken, async (req, res) => {
	try {
		const user = await Admin.findById(req.id);
		if (user.verified) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Email already verified' }] });
		}
		await Admin.findOneAndUpdate(
			{ _id: req.id },
			{ verified: true },
			{ new: true },
		);
		res.json('Thank you, your email was verified successfully');
	} catch (err) {
		console.error(user);
		res.status(500).send('Server Error');
	}
});

// @router  POST api/auth-admin
// @desc    Authenticate admin & get token
// @access  Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 8 or more characters')
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
			let user = await Admin.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			if (!user.verified) {
				return res.status(400).json({
					errors: [{ msg: 'this account in not yet verified' }],
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
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
			res.status(500).send('Server error');
		}
	},
);

// @router  POST api/auth-user/forgot
// @desc    Admin forgot password
// @access  Public
router.post(
	'/forgot',
	[check('email', 'Please include a valid email').isEmail()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email } = req.body;

		try {
			let user = await Admin.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
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
          <a href="https://endiks.herokuapp.com/account/reset-password/admin/${token}">reset password</a>
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
			res.status(500).send('Server error');
		}
	},
);

// @router  POST api/auth-user/reset-password/:token
// @desc    Reset Admin Password
// @access  Public
router.post(
	'/reset-password/:token',
	[
		verifyToken,
		[
			check('password', 'Please enter a password with 8 or more characters')
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
			const user = await Admin.find({ _id: req.id });
			if (!user.verified) {
				return res.status(401).json({
					errors: [
						{
							msg: "You cannot perform this action because you're not verified",
						},
					],
				});
			}
			const salt = await bcrypt.genSalt(10);

			const password = await bcrypt.hash(req.body.password, salt);
			await Admin.findOneAndUpdate(
				{ _id: req.id },
				{ password },
				{ new: true },
			);
			res.json('Thank you, your password has been changed successfully');
		} catch (err) {
			console.error(user);
			res.status(500).send('Server Error');
		}
	},
);

module.exports = router;
