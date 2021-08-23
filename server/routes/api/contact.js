const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;

// @route    POST api/contact
// @desc     Contact request
// @access   Public
router.post(
	'/',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('name', 'Full name is required').not().isEmpty().escape(),
		check('subject', 'Subject is required').not().isEmpty().escape(),
		check('message', 'message is required').not().isEmpty().escape(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, subject, message } = req.body;
		try {
			const output = `
          <p>You have a new contact request</p>
          <h3>Contact Details</h3>
          <ul>  
            <li>full name: ${name}</li>
            <li>email: ${email}</li>
            <li>subject: ${subject}</li>
          </ul>
          <h3>message</h3>
          <p>${message}</p>
        `;

			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: myEmail,
					pass: myPassword,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			let mailOptions = {
				from: `"Endiks Contact" <${myEmail}>`,
				to: myEmail,
				subject: 'Contact request',
				html: output,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					res.status(400).json('Your email was not sent');
					console.log(error);
				} else {
					res.json('Thank you, your email has been sent');
					console.log('Email sent: ' + info.response);
				}
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	},
);

// @route    POST api/contact/newsletter
// @desc     Sent newsletter subscription
// @access   Public
router.post('/newsletter', async (req, res) => {
	const output = `
          <p>You have a new newsletter subscription</p>
          <h3>Newsletter Subscription</h3>
          <ul>  
            <li>Email: ${req.body.email}</li>
          </ul>
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
		from: myEmail,
		to: myEmail,
		subject: 'Newsletter Subscription',
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
});

module.exports = router;
