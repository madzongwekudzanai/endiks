const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
const adminAuth = require('../../middleware/adminAuth');

// @router  POST api/users
// @desc    Register user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty().escape(),
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
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json('Invalid credentials');
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				const output = `
          <h1>Verify Email</h1>
          <h2>Hello ${name},</h2>
          <p>Please click the link below to complete your registration<p/>
          <a href="https://endiks.com?token=${token}">verify email</a>
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
					from: `Account verification ${myEmail}`,
					to: email,
					subject: 'Verify Email',
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
				res.json('Account created, please verify your email');
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	},
);

// @router  GET api/users
// @desc    Get all users
// @access  Private
router.get('/', adminAuth, async (req, res) => {
	try {
		const users = await User.find().select('-password').sort({ date: -1 });
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
