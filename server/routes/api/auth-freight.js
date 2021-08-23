const express = require('express');
const router = express.Router();
const freightAuth = require('../../middleware/freightAuth');
const verifyToken = require('../../middleware/verifyToken');
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

const nexmo = new Nexmo({
	apiKey: vonageApiKey,
	apiSecret: vonageApiSecret,
});

// @router  GET api/auth-freight
// @desc    Get cargo
// @access  Private
router.get('/', freightAuth, async (req, res) => {
	try {
		const user = await Freight.findById(req.freight.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('服务器错误');
	}
});

// @router  GET api/auth-freight/verify/:token
// @desc    Verify Cargo
// @access  Public
router.get('/verify/:token', verifyToken, async (req, res) => {
	try {
		const user = await Freight.findById(req.id);
		if (user.verified) {
			return res.status(400).json('此帐户已通过验证');
		}
		await Seller.findOneAndUpdate(
			{ _id: req.id },
			{ verified: true },
			{ new: true },
		);
		res.json('您的帐户已通过验证');
	} catch (err) {
		res.status(500).json('服务器错误');
	}
});

// @router  POST api/auth-freight/email
// @desc    Authenticate seller & get token using email
// @access  Public
router.post(
	'/email',
	[
		check('email', '请输入有效电子邮件').isEmail(),
		check('password', '请输入8个或更多字符的密码')
			.isLength({ min: 8 })
			.escape(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password, loc } = req.body;

		try {
			let user = await Freight.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid email or password'
							: '无效的电子邮件或密码',
					);
			}

			if (!user.verified) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'This account has not been verified'
							: '此帐户尚未验证',
					);
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid email or password'
							: '无效的电子邮件或密码',
					);
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
			res.status(500).json(loc === 'english' ? 'Server Error' : '服务器错误');
		}
	},
);

// @router  POST api/auth-freight/phone
// @desc    Authenticate seller & get token using phone number
// @access  Public
router.post(
	'/phone',
	[
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
		const { phone, password, loc } = req.body;

		try {
			let user = await Freight.findOne({ phone });

			if (!user) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid phone number or password'
							: '无效的电话号码或密码',
					);
			}

			if (!user.verified) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'This account has not been verified'
							: '此帐户尚未验证',
					);
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid phone number or password'
							: '无效的电话号码或密码',
					);
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
			res.status(500).json(loc === 'english' ? 'Server Error' : '服务器错误');
		}
	},
);

// @router  POST api/auth-freight/forgot/email
// @desc    Freight forgot password using email
// @access  Public
router.post(
	'/forgot/email',
	[check('email', '请输入有效电子邮件').isEmail()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, loc } = req.body;

		try {
			let user = await Freight.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid email or password'
							: '无效的电子邮件或密码',
					);
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				const enOutput = `
          <h1>Hello ${user.name}</h1>
          <p>Please click the link below to reset your password<p/>
          <a href="https://endiks.herokuapp.com/freight/auth/reset-password?token=${token}">change password</>
        `;
				const zhOutput = `
          <h1>你好${user.name}</h1>
          <p>请点击下面的链接重设密码<p/>
          <a href="https://endiks.herokuapp.com/freight/auth/reset-password?token=${token}">更改密码</>
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
						loc === 'english' ? 'Reset Password' : '重设密码'
					} ${myEmail}`,
					to: email,
					subject: loc === 'english' ? 'Reset Password' : '更改密码',
					html: loc === 'english' ? enOutput : zhOutput,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
				res.json('Password reset link has been sent to your email');
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json(loc === 'english' ? 'Server Error' : '服务器错误');
		}
	},
);

// @router  POST api/auth-freight/forgot/phone
// @desc    Seller forgot password using phone number
// @access  Public
router.post(
	'/forgot/phone',
	[check('phone', '电话号码为必填项').not().isEmpty().escape()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { phone, loc } = req.body;

		try {
			let user = await Freight.findOne({ phone });

			if (!user) {
				return res
					.status(400)
					.json(
						loc === 'english'
							? 'Invalid phone number or password'
							: '无效的电话号码或密码',
					);
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				const code = Math.floor(1000 + Math.random() * 9000);
				const from = 'Endiks';
				const opts = {
					type: 'unicode',
				};
				const enText = `【Endiks】Verification code: ${code}`;
				const zhText = `【Endiks】您的验证码是${code}`;
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
				res.json({ code, token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json(loc === 'english' ? 'Server Error' : '服务器错误');
		}
	},
);

// @router  POST api/auth-freight/reset-password/:token
// @desc    Reset Seller Password
// @access  Public
router.post(
	'/reset-password/:token',
	[
		verifyToken,
		[
			check('password', '请输入8个或更多字符的密码')
				.isLength({ min: 8 })
				.escape(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const loc = req.body.loc;
		try {
			const user = await Freight.findById(req.id);
			if (!user.verified) {
				return res
					.status(401)
					.json(
						loc === 'english'
							? 'You cannot perform this operation because your email is not verified'
							: '您无法执行此操作，因为您的电子邮件未通过验证',
					);
			}
			const salt = await bcrypt.genSalt(10);

			const password = await bcrypt.hash(req.body.password, salt);
			await Freight.findByIdAndUpdate(
				{ _id: req.id },
				{ password },
				{ new: true },
			);
			res.json('Your password has been successfully changed');
		} catch (err) {
			console.error(user);
			res.status(500).json(loc === 'english' ? 'Server Error' : '服务器错误');
		}
	},
);

module.exports = router;
