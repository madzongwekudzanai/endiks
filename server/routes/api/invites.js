const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const adminAuth = require('../../middleware/adminAuth');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Invite = require('../../models/Invite');

// @router  POST api/invites
// @desc    Invite seller
// @access  Public
router.post(
	'/',
	[
		adminAuth,
		[
			check('tradeName', 'Trade name is required').not().isEmpty().escape(),
			check('currency', 'currency is required').not().isEmpty().escape(),
			check('shipping', 'shipping is required').not().isEmpty().escape(),
			check('locale', 'locale/language is required').not().isEmpty().escape(),
			check('currencyCode', 'currencyCode is required')
				.not()
				.isEmpty()
				.escape(),
			check('email', 'Please include a valid email').isEmail(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { tradeName, email, currency, currencyCode, locale, shipping } =
			req.body;

		try {
			let user = await Invite.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Seller already exists' }] });
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new Invite({
				tradeName,
				email,
				shipping,
				avatar,
				currency,
				currencyCode,
				locale,
			});

			await user.save();

			const output = `
          <h1>卖方邀请</h1>
          <p>您现在可以在Endiks上出售您的产品.使用此电子邮件${email}进行注册，否则您将收到无效的凭据错误<p/>
          <a href="https://endiks.herokuapp.com/seller/auth/register">寄存器</>
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
				from: `卖方邀请 ${myEmail}`,
				to: email,
				subject: '卖方邀请',
				html: output,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					res.json(`${tradeName} was successfully invited to sell on endiks`);
					console.log('Email sent: ' + info.response);
				}
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	},
);

module.exports = router;
