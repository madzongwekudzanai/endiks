const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');
const { check, validationResult } = require('express-validator');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const vonageApiKey = process.env.VONAGE_API_KEY;
const vonageApiSecret = process.env.VONAGE_API_SECRET;
const commissionTwo = process.env.COMMISSION_TWO;
const nodemailer = require('nodemailer');
const axios = require('axios');
const sellerAuth = require('../../middleware/sellerAuth');
const auth = require('../../middleware/auth');
const freightAuth = require('../../middleware/freightAuth');

const Order = require('../../models/Order');
const User = require('../../models/User');
const Product = require('../../models/Product');
const SellerProfile = require('../../models/SellerProfile');
const FreightProfile = require('../../models/FreightProfile');
const Destination = require('../../models/Destination');
const Seller = require('../../models/Seller');
const Freight = require('../../models/Freight');
const BankDeposit = require('../../models/BankDeposit');

const nexmo = new Nexmo({
	apiKey: vonageApiKey,
	apiSecret: vonageApiSecret,
});

// @route    POST api/orders
// @desc     Order items from cart
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'full name is required').not().isEmpty().escape(),
			check('email', 'email is required').isEmail(),
			check('phone', 'phone number are required').not().isEmpty().escape(),
			check('address', 'address is required').not().isEmpty().escape(),
			check('depositToken', 'deposit token is required')
				.not()
				.isEmpty()
				.escape(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			enFreightType,
			zhFreightType,
			destinationId,
			freightId,
			name,
			email,
			phone,
			address,
			depositToken,
		} = req.body;

		let sellersSet = new Set();
		try {
			const singleUser = await User.findById(req.user.id);
			singleUser.cart.items.forEach(({ seller }) =>
				sellersSet.add(seller.toString()),
			);
			const allSellers = Array.from(sellersSet);

			const orderProdID = singleUser.cart.items.map(
				({ productId }) => productId,
			);
			const sellerOrderProd = await Product.find().where('_id').in(orderProdID);

			const shippingArr = allSellers.map(
				(sel) =>
					sellerOrderProd.filter(({ seller }) => seller.toString() === sel)[0]
						.shipping,
			);
			const shippingTotal = shippingArr.reduce((a, b) => a + b, 0);
			const totalPriceOrder = singleUser.cart.items
				.map(({ productId, quantity }) => {
					const qIndex = sellerOrderProd
						.map((item) => item._id.toString())
						.indexOf(productId.toString());
					return sellerOrderProd[qIndex].price * quantity;
				})
				.reduce((a, b) => a + b, 0);
			const config = {
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRANSFER_WISE_TOKEN}`,
				},
			};
			const exchange = await axios.get(
				`https://api.transferwise.com/v1/rates?source=CNY&target=USD`,
				config,
			);
			const json = exchange.data;
			const rate = json[0].rate;
			const totalOrderPrice = Math.ceil(
				totalPriceOrder * commissionTwo * rate + shippingTotal * rate,
			);
			sellerOrderProd.forEach(async (it) => {
				const originalQuantity = it.quantity;
				const originalTitle = it.title;
				const inCartQuantity =
					singleUser.cart.items[
						singleUser.cart.items.map((item) => item.productId).indexOf(it._id)
					].quantity;
				if (originalQuantity < inCartQuantity) {
					return res
						.status(400)
						.json(
							`There are only ${originalQuantity} "${originalTitle}" left, but there are ${inCartQuantity} in your shopping cart`,
						);
				}
			});

			const dest = await Destination.findById(destinationId);

			const shipmentAddress = dest.originAddress;
			const shipperId = dest.freight;
			const freightProf = await FreightProfile.findOne({ freight: freightId });
			const freightAcc = await Freight.findById(freightId);
			const deposit = await BankDeposit.findById(depositToken);

			// Check for ObjectId format and token
			if (!depositToken.match(/^[0-9a-fA-F]{24}$/) || !deposit) {
				return res.status(404).json('Invalid token');
			}

			// Check if token was used
			if (deposit.used) {
				return res.status(404).json('Invalid token');
			}

			await BankDeposit.findByIdAndUpdate(
				{ _id: depositToken },
				{
					$set: {
						totalOrderPrice,
						used: true,
					},
				},
				{ new: true },
			);
			singleUser.cart.items.forEach(async ({ productId, quantity }) => {
				const prod = await Product.findById(productId);
				const newQuantity = prod.quantity - quantity;
				return await Product.findByIdAndUpdate(
					{ _id: productId },
					{
						$set: {
							quantity: newQuantity,
						},
					},
					{ new: true },
				);
			});
			allSellers.forEach(async (sell) => {
				const profile = await SellerProfile.findOne({
					seller: sell,
				});
				const sellerAcc = await Seller.findById(sell);

				const orderItems = singleUser.cart.items
					.filter(({ seller }) => seller.toString() === sell)
					.map(({ productId, quantity }) => {
						return { productId, quantity };
					});

				const orderProdIDS = orderItems.map(({ productId }) => productId);
				const sellerOrderProds = await Product.find()
					.where('_id')
					.in(orderProdIDS);

				const totalPrice = orderItems
					.map(({ productId, quantity }) => {
						const qIndex = sellerOrderProds
							.map((item) => item._id.toString())
							.indexOf(productId.toString());
						return sellerOrderProds[qIndex].price * quantity;
					})
					.reduce((a, b) => a + b, 0);
				const estimateWeight = orderItems
					.map(({ productId, quantity }) => {
						const qIndex = sellerOrderProds
							.map((item) => item._id.toString())
							.indexOf(productId.toString());
						return sellerOrderProds[qIndex].weight * quantity;
					})
					.reduce((a, b) => a + b, 0);
				const newOder = new Order({
					'buyer.buyerId': req.user.id && req.user.id,
					'buyer.name': name && name,
					'buyer.email': email && email,
					'buyer.phone': phone && phone,
					'buyer.address': address,
					'seller.sellerId': sell && sell,
					'seller.sellerAliPayId': profile.aliPayID && profile.aliPayID,
					'seller.sellerWeChatId': profile.weChatID && profile.weChatID,
					'seller.name': profile.storeName && profile.storeName,
					'seller.email': sellerAcc.email && sellerAcc.email,
					'seller.phone': sellerAcc.phone && sellerAcc.phone,
					'seller.shipmentAddress': shipmentAddress && shipmentAddress,
					'seller.shipping': sellerAcc.shipping && sellerAcc.shipping,
					'seller.locale': sellerAcc.locale && sellerAcc.locale,
					'seller.currencyCode':
						sellerAcc.currencyCode && sellerAcc.currencyCode,
					'seller.totalPrice': totalPrice,
					'seller.estimateWeight': estimateWeight,
					'freight.freightId': shipperId && shipperId,
					'freight.freightAliPayId':
						freightProf.aliPayID && freightProf.aliPayID,
					'freight.freightWeChatId':
						freightProf.weChatID && freightProf.weChatID,
					'freight.name': dest.freightName && dest.freightName,
					'freight.email': freightAcc.email && freightAcc.email,
					'freight.phone': freightAcc.phone && freightAcc.phone,
					'freight.destinationAddress':
						dest.destinationAddress && dest.destinationAddress,
					'freight.locale': sellerAcc.locale && sellerAcc.locale,
					'freight.currencyCode':
						sellerAcc.currencyCode && sellerAcc.currencyCode,
					'freight.country.en': dest.country.en && dest.country.en,
					'freight.country.zh': dest.country.zh && dest.country.zh,
					'freight.city.en': dest.city.en && dest.city.en,
					'freight.city.zh': dest.city.zh && dest.city.zh,
					'freight.stateObject.state.en':
						dest.stateObject.state.en && dest.stateObject.state.en,
					'freight.stateObject.state.zh':
						dest.stateObject.state.zh && dest.stateObject.state.zh,
					'freight.stateObject.city.en':
						dest.stateObject.city.en && dest.stateObject.city.en,
					'freight.stateObject.city.zh':
						dest.stateObject.city.zh && dest.stateObject.city.zh,
					'freight.freightType.en': enFreightType,
					'freight.freightType.zh': zhFreightType,
					currentLocation: profile.storeAddress && profile.storeAddress,
					products: {
						items: orderItems,
					},
				});
				await newOder.save();

				if (sellerAcc.email) {
					const sellerOutput = `
          <h1>您有新订单</h1>
          <p>点击下面的链接查看订单<p/>
          <a href="https://endiks.herokuapp.com/seller/dashboard?page=orders">查看订单</a>
        `;

					let sellerTransporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							user: myEmail,
							pass: myPassword,
						},
						tls: {
							rejectUnauthorized: false,
						},
					});

					let sellerMailOptions = {
						from: `您有新订单${myEmail}`,
						to: sellerAcc.email,
						subject: '您有新订单',
						html: sellerOutput,
					};
					return await sellerTransporter.sendMail(
						sellerMailOptions,
						function (error, info) {
							if (error) {
								console.log(error);
							} else {
								console.log('Email sent: ' + info.response);
							}
						},
					);
				}

				if (sellerAcc.phone) {
					const from = 'Endiks';
					const text = `【Endiks】您有新订单`;
					const opts = {
						type: 'unicode',
					};
					return nexmo.message.sendSms(
						from,
						phone,
						text,
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
				}
			});

			const user = await User.findById(req.user.id);

			user.cart.items = [];

			await user.save();

			res.json(
				'Thank you for the success of your order. After the agent receives your package, the freight will be sent to you by email',
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	},
);

// @route    GET api/orders/seller
// @desc     Get all seller orders
// @access   Private
router.get('/seller', sellerAuth, async (req, res) => {
	try {
		const orders = await Order.find({
			'seller.sellerId': req.seller.id,
			'freight.freightReceived': false,
		}).sort({
			'buyer.dateOrdered': -1,
		});

		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('服务器错误');
	}
});

// @route    GET api/orders/freight
// @desc     Get all freight orders
// @access   Private
router.get('/freight', freightAuth, async (req, res) => {
	try {
		const orders = await Order.find({
			'freight.freightId': req.freight.id,
			'seller.sent': true,
			'buyer.received': false,
		}).sort({
			'seller.dateSent': -1,
		});

		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('服务器错误');
	}
});

// @route    GET api/orders/buyer
// @desc     Get all buyer orders
// @access   Private
router.get('/buyer', auth, async (req, res) => {
	try {
		const orders = await Order.find({
			'buyer.buyerId': req.user.id,
			'buyer.received': false,
		}).sort({
			'buyer.dateOrdered': -1,
		});

		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @route    GET api/orders/seller/recent-orders
// @desc     Get recent seller orders
// @access   Private
router.get('/seller/recent-orders', sellerAuth, async (req, res) => {
	try {
		const orders = await Order.find({
			'seller.sellerId': req.seller.id,
			'freight.freightReceived': false,
		})
			.sort({
				'buyer.dateOrdered': -1,
			})
			.limit(2);

		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('服务器错误');
	}
});

// @route    GET api/orders/freight/recent-orders
// @desc     Get recent freight orders
// @access   Private
router.get('/freight/recent-orders', freightAuth, async (req, res) => {
	try {
		const orders = await Order.find({
			'freight.freightId': req.freight.id,
			'seller.sent': true,
			'buyer.received': false,
		})
			.sort({
				'seller.dateSent': -1,
			})
			.limit(2);

		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('服务器错误');
	}
});

// @route    GET api/orders/view-detail/seller/products/:order_id
// @desc     View products in seller order
// @access   Private
router.get(
	'/view-detail/seller/products/:order_id',
	sellerAuth,
	async (req, res) => {
		try {
			const order = await Order.findById(req.params.order_id);

			// Check for ObjectId format and order
			if (!req.params.order_id.match(/^[0-9a-fA-F]{24}$/) || !order) {
				return res.status(404).json('找不到订单');
			}

			const ids = order.products.items.map(({ productId }) => productId);
			const products = await Product.find().where('_id').in(ids);

			res.json({ products, order });
		} catch (err) {
			console.error(err.message);
			res.status(500).json('服务器错误');
		}
	},
);

// @route    GET api/orders/view-detail/buyer/products/:order_id
// @desc     View buyer products in order
// @access   Private
router.get('/view-detail/buyer/products/:order_id', auth, async (req, res) => {
	try {
		const order = await Order.findById(req.params.order_id);

		// Check for ObjectId format and order
		if (!req.params.order_id.match(/^[0-9a-fA-F]{24}$/) || !order) {
			return res.status(404).json('Order not found');
		}

		const ids = order.products.items.map(({ productId }) => productId);
		const products = await Product.find().where('_id').in(ids);

		res.json({ products, originalProducts: order.products.items });
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @route    POST api/orders/track-order
// @desc     Track order
// @access   Public
router.post(
	'/track-order',
	check('orderId', 'Order ID is required').not().isEmpty().escape(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { orderId } = req.body;
		try {
			const order = await Order.findById(orderId);

			// Check for ObjectId format and order
			if (!orderId.match(/^[0-9a-fA-F]{24}$/) || !order) {
				return res.status(404).json('Order not found');
			}

			res.json(order);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	},
);

// @route    PUT api/orders/send-order-seller/:order_id
// @desc     Seller send order
// @access   Private
router.put(
	'/send-order-seller/:order_id',
	[
		sellerAuth,
		[
			check('trackingCode', 'tracking code is required')
				.not()
				.isEmpty()
				.escape(),
		],
	],
	async (req, res) => {
		const { trackingCode } = req.body;
		const orderId = req.params.order_id;
		const order = await Order.findById(orderId);

		// Check for ObjectId format and order
		if (!orderId.match(/^[0-9a-fA-F]{24}$/) || !order) {
			return res.status(404).json('找不到订单');
		}

		// Check user
		if (order.seller.sellerId.toString() !== req.seller.id) {
			return res.status(401).json('卖方未经授权');
		}

		try {
			const sentOrder = await Order.findByIdAndUpdate(
				{ _id: orderId },
				{
					$set: {
						'seller.sent': true,
						'seller.trackingCode': trackingCode && trackingCode,
						'seller.dateSent': Date.now(),
					},
				},
				{ new: true },
			);

			const sellerOutput = `
          <h1>The supplier has sent this order ${orderId} to ${
				order && order.freight.name
			}</h1>
          <p>Click the link below to view the order<p/>
          <a href="https://endiks.herokuapp.com/shop/orders/order-detail?order_id=${orderId}">View Order</a>
        `;

			let sellerTransporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: myEmail,
					pass: myPassword,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			let sellerMailOptions = {
				from: `Supplier Has Sent Order ${myEmail}`,
				to: sentOrder && sentOrder.buyer.email,
				subject: 'Supplier Has Sent Order',
				html: sellerOutput,
			};

			await sellerTransporter.sendMail(
				sellerMailOptions,
				function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				},
			);

			res.json(sentOrder);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('服务器错误');
		}
	},
);

// @route    PUT api/orders/freight-receive-order/:order_id
// @desc     Freight receive order
// @access   Private
router.put(
	'/freight-receive-order/:order_id',
	freightAuth,
	async (req, res) => {
		const orderId = req.params.order_id;
		const order = await Order.findById(orderId);

		// Check for ObjectId format and order
		if (!orderId.match(/^[0-9a-fA-F]{24}$/) || !order) {
			return res.status(404).json('Order not found');
		}

		// Check if order is not yet sent
		if (!order.seller.sent) {
			return res.status(404).json('Order not yet sent');
		}

		try {
			const receivedOrder = await Order.findByIdAndUpdate(
				{ _id: orderId },
				{
					$set: {
						'freight.freightReceived': true,
						'freight.dateReceived': Date.now(),
						currentLocation: order.seller.shipmentAddress,
					},
				},
				{ new: true },
			);

			const freightOutput = `
          <h1>${order && order.freight.name} has received your order</h1>
          <p>Click the link below to view the order<p/>
          <a href="https://endiks.herokuapp.com/shop/orders/order-detail?order_id=${orderId}">View Order</a>
        `;

			let freightTransporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: myEmail,
					pass: myPassword,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			let freightMailOptions = {
				from: `Freight Has Received Order ${myEmail}`,
				to: order && order.buyer.email,
				subject: 'Freight Has Received Order',
				html: freightOutput,
			};

			await freightTransporter.sendMail(
				freightMailOptions,
				function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				},
			);

			res.json(receivedOrder);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	},
);

// @route    PUT api/orders/freight-send-order/:order_id
// @desc     Freight send order
// @access   Private
router.put(
	'/freight-send-order/:order_id',
	[
		freightAuth,
		[
			check('actualWeight', 'Weight is required').isDecimal(),
			check('shipping', 'Shipping cost is required').isInt(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { actualWeight, shipping, trackingCode } = req.body;
		const order = await Order.findById(req.params.order_id);

		// Check for ObjectId format and order
		if (!req.params.order_id.match(/^[0-9a-fA-F]{24}$/) || !order) {
			return res.status(404).json('Order not found');
		}

		// Check if order is not yet sent
		if (!order.freight.freightReceived) {
			return res.status(404).json('You have not yet received this order');
		}

		try {
			const sentOrder = await Order.findByIdAndUpdate(
				{ _id: req.params.order_id },
				{
					$set: {
						'freight.freightSent': true,
						'freight.trackingCode': trackingCode && trackingCode,
						'freight.shipping': shipping,
						'freight.actualWeight': actualWeight,
						'freight.dateSent': Date.now(),
						currentLocation: order && order.seller.shipmentAddress,
					},
				},
				{ new: true },
			);
			const trackMsg = `
          <h1>${order && order.freight.name} has sent your order</h1>
          <ul>  
            <li>Shipping cost(RMB): ${new Intl.NumberFormat('zh-CN', {
							style: 'currency',
							currency: 'CNY',
						}).format(shipping)}</li>
            <li>Weight(kg): ${actualWeight}</li>
            <li>Tracking Code: ${actualWeight}</li>
          </ul>
          `;
			const unTrackMsg = `
          <h1>${order && order.freight.name} has sent your order</h1>
          <ul>  
            <li>Shipping cost(RMB): ${new Intl.NumberFormat('zh-CN', {
							style: 'currency',
							currency: 'CNY',
						}).format(shipping)}</li>
            <li>Weight(kg): ${actualWeight}</li>
          </ul>
        `;
			const freightOutput = trackingCode ? trackMsg : unTrackMsg;

			let freightTransporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: myEmail,
					pass: myPassword,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			let freightMailOptions = {
				from: `Freight Has Sent Order ${myEmail}`,
				to: order && order.buyer.email,
				subject: 'Freight Has Sent Order',
				html: freightOutput,
			};

			await freightTransporter.sendMail(
				freightMailOptions,
				function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				},
			);

			res.json(sentOrder);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	},
);

// @route    PUT api/orders/freight-notify-user/:order_id
// @desc     Freight notify user
// @access   Private
router.put('/freight-notify-user/:order_id', freightAuth, async (req, res) => {
	const order = await Order.findById(req.params.order_id);

	// Check for ObjectId format and order
	if (!req.params.order_id.match(/^[0-9a-fA-F]{24}$/) || !order) {
		return res.status(404).json('Order not found');
	}

	// Check if order is not yet sent
	if (!order.freight.freightSent) {
		return res.status(404).json('You have not yet sent this order');
	}

	try {
		const notifiedOrder = await Order.findByIdAndUpdate(
			{ _id: req.params.order_id },
			{
				$set: {
					'buyer.readyForCollection': true,
					'buyer.dateReadyForCollection': Date.now(),
					currentLocation: order && order.freight.destinationAddress,
				},
			},
			{ new: true },
		);

		const freightOutput = `
          <h1>${req.params.order_id} is ready for collection</h1>
          <ul>  
            <li>Country: ${order && order.freight.country.en}</li>
            <li>Address: ${order && order.freight.destinationAddress}</li>
          </ul>
        `;

		let freightTransporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: myEmail,
				pass: myPassword,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		let freightMailOptions = {
			from: `Order Ready For Collection ${myEmail}`,
			to: order && order.buyer.email,
			subject: 'Order Ready For Collection',
			html: freightOutput,
		};

		await freightTransporter.sendMail(
			freightMailOptions,
			function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			},
		);

		res.json(notifiedOrder);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

// @route    PUT api/orders/freight-confirm-buyer-receive/:order_id
// @desc     Freight Confirm that buyer has received order
// @access   Private
router.put(
	'/freight-confirm-buyer-receive/:order_id',
	freightAuth,
	async (req, res) => {
		const order = await Order.findById(req.params.order_id);

		// Check for ObjectId format and order
		if (!req.params.order_id.match(/^[0-9a-fA-F]{24}$/) || !order) {
			return res.status(404).json('Order not found');
		}

		// Check if order is not yet sent
		if (!order.buyer.readyForCollection) {
			return res.status(404).json('Order not yet ready for collection');
		}

		try {
			const receivedOrder = await Order.findByIdAndUpdate(
				{ _id: req.params.order_id },
				{
					$set: {
						'buyer.received': true,
						'buyer.dateReceived': Date.now(),
						currentLocation: order && order.buyer.address,
					},
				},
				{ new: true },
			);

			res.json(receivedOrder);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	},
);

module.exports = router;
