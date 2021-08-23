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
const Admin = require('../../models/Admin');

// @router  POST api/admins
// @desc    Register Admin
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
			let user = await Admin.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new Admin({
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
          <h1>Hie ${name},</h1>
          <h2>Welcome to Endiks</h2>
          <p>Please click the link below to complete your admin registration<p/>
          <a href="https://endiks.herokuapp.com/admin/${token}">verify email</a>
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
					from: `Admin verification ${myEmail}`,
					to: email,
					subject: 'Admin request',
					html: output,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
						res.status(400).send('Server error');
					} else {
						res.json('Thank you, your email has been sent');
						console.log('Email sent: ' + info.response);
					}
				});
				res.json('Thank you, please verify your email');
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	},
);

module.exports = router;
