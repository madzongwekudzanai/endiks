const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Nexmo = require('nexmo');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const vonageApiKey = process.env.VONAGE_API_KEY;
const vonageApiSecret = process.env.VONAGE_API_SECRET;
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Freight = require('../../models/Freight');
const FreightInvite = require('../../models/FreightInvite');

const nexmo = new Nexmo({
	apiKey: vonageApiKey,
	apiSecret: vonageApiSecret,
});

// @router  POST api/freights/email
// @desc    Register cargo using email
// @access  Public
router.post(
	'/email',
	[
		check('name', '名称为必填项').not().isEmpty().escape(),
		check('email', '请附上有效的电子邮件').isEmail(),
		check('password', '请输入8个或更多字符的密码')
			.isLength({ min: 8 })
			.escape(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password, loc } = req.body;

		try {
			let invite = await FreightInvite.findOne({ email });

			if (!invite) {
				return res
					.status(400)
					.json(loc === 'english' ? 'Invalid email' : '不合规电邮');
			}

			const { tradeName, locale, currency, currencyCode } = invite;

			let user = await Freight.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid email or password'
							: '无效的电子邮件或密码',
					);
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new Freight({
				name,
				tradeName,
				locale,
				currency,
				currencyCode,
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
					tradeName: invite.tradeName,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				const enOutput = `
          <h1>Account Verification</h1>
          <p>Please click the link below to complete the registration<p/>
          <a href="https://endiks.herokuapp.com/freight/auth/sign-in?freightToken=${token}">Verify account</a>
        `;
				const zhOutput = `
          <h1>帐户验证</h1>
          <p>请点击下面的链接完成注册<p/>
          <a href="https://endiks.herokuapp.com/freight/auth/sign-in?freightToken=${token}">验证账户</a>
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
					from: `${
						loc === 'english' ? 'Email Verification' : '电子邮件验证'
					} ${myEmail}`,
					to: email,
					subject: loc === 'english' ? 'Account Verification' : '帐户验证',
					html: loc === 'english' ? enOutput : zhOutput,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
				res.json('You are now registered and can now log in');
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json(loc === 'english' ? 'Server Error' : '服务器错误');
		}
	},
);

// @router  POST api/freights/phone
// @desc    Register cargo using phone number
// @access  Public
router.post(
	'/phone',
	[
		check('name', '名称为必填项').not().isEmpty().escape(),
		check('phone', '电话号码为必填项').not().isEmpty().escape(),
		check('password', '请输入8个或更多字符的密码')
			.isLength({ min: 8 })
			.escape(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, phone, password, loc } = req.body;

		try {
			let invite = await FreightInvite.findOne({ phone });

			if (!invite) {
				return res
					.status(400)
					.json(loc === 'english' ? 'Invalid phone number' : '无效的电话号码');
			}

			const { tradeName, locale, currency, currencyCode } = invite;

			let user = await Freight.findOne({ phone });

			if (user) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid phone number or password'
							: '无效的电话号码或密码',
					);
			}

			user = new Freight({
				name,
				tradeName,
				locale,
				currency,
				currencyCode,
				phone,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
					tradeName: invite.tradeName,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				const from = 'Endiks';
				const enText = `【Endiks】Endiks cargo registration completed`;
				const zhText = `【Endiks】Endiks货运登记完成`;
				const opts = {
					type: 'unicode',
				};
				nexmo.message.sendSms(
					from,
					phone,
					loc === 'english' ? enText : zhText,
					opts,
					(err, responseData) => {
						if (err) {
							console.log(err);
						} else {
							if (responseData.messages[0]['status'] === '0') {
								console.log('Message sent successfully.');
							} else {
								console.log(
									`Message failed with error: ${responseData.messages[0]['error-text']}`,
								);
							}
						}
					},
				);
				res.json('You are now registered and can now log in');
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json(loc === 'english' ? 'Server Error' : '服务器错误');
		}
	},
);

module.exports = router;
