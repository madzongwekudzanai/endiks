const express = require('express');
const router = express.Router();
const translate = require('@vitalets/google-translate-api');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');
const freightAuth = require('../../middleware/freightAuth');
const auth = require('../../middleware/auth');

const Destination = require('../../models/Destination');
const FreightDestination = require('../../models/FreightDestination');
const UserDestination = require('../../models/UserDestination');
const FreightType = require('../../models/FreightType');
const Freight = require('../../models/Freight');

// @route    GET api/destinations/user-destinations
// @desc     Create a user destination
// @access   Private
router.get('/user-destinations', freightAuth, async (req, res) => {
	let enDestinations = new Set();
	let zhDestinations = new Set();
	try {
		const destinations = await Destination.find().select('country');
		const userDestinations = await UserDestination.find().select('country');
		const array1 = userDestinations.map((count) => count.country.en);
		const destinationsLength = await Destination.find().countDocuments();
		if (destinationsLength <= 0) {
			UserDestination.deleteMany({}, () => console.log('no destinations'));
		}
		destinations.forEach(({ country }) => {
			enDestinations.add(country.en);
			zhDestinations.add(country.zh);
		});
		const enDest = Array.from(enDestinations);
		const zhDest = Array.from(zhDestinations);

		const diffArr = array1.filter((x) => !enDest.includes(x));
		if (diffArr.length > 0) {
			return diffArr.forEach(async (difDest) => {
				const delDest = await UserDestination.findOne({
					'country.en': difDest,
				});
				await delDest.remove();
			});
		}

		enDest.forEach(async (dest, index) => {
			const destinationArray = await Destination.find({ 'country.en': dest });
			const cityOrState = destinationArray[0];
			if (cityOrState.city.en) {
				const obj = {};
				obj.country = {};
				obj.city = {};
				obj.country.en = dest;
				obj.country.zh = zhDest[index];
				let enCities = new Set();
				let zhCities = new Set();
				destinationArray.forEach(({ city }) => {
					enCities.add(city.en);
					zhCities.add(city.zh);
				});
				const joinedEnCities = Array.from(enCities).join('; ');
				const joinedZhCities = Array.from(zhCities).join('; ');
				obj.city.en = joinedEnCities;
				obj.city.zh = joinedZhCities;
				await UserDestination.findOneAndUpdate(
					{ 'country.en': dest },
					{ $set: obj },
					{ new: true, upsert: true },
				);
			} else if (cityOrState.stateObject.state.en) {
				const obj = {};
				obj.hasState = true;
				obj.country = {};
				obj.country.en = dest;
				obj.country.zh = zhDest[index];
				obj.state = {};
				obj.state.en = {};
				obj.state.zh = {};
				let enStates = new Set();
				let zhStates = new Set();
				destinationArray.forEach(({ stateObject }) => {
					enStates.add(stateObject.state.en);
					zhStates.add(stateObject.state.zh);
				});
				const enStatesArray = Array.from(enStates);
				const zhStatesArray = Array.from(zhStates);
				enStatesArray.forEach(async (state, i) => {
					let enStatesCities = new Set();
					let zhStatesCities = new Set();
					const citiedDest = await Destination.find({
						'country.en': dest,
						'stateObject.state.en': state,
					});
					citiedDest.forEach(({ stateObject }) => {
						enStatesCities.add(stateObject.city.en);
						zhStatesCities.add(stateObject.city.zh);
					});
					const joinedEnStatesCities = Array.from(enStatesCities).join('; ');
					const joinedZhStatesCities = Array.from(zhStatesCities).join('; ');
					obj.state.en[state] = joinedEnStatesCities;
					obj.state.zh[zhStatesArray[i]] = joinedZhStatesCities;
					await UserDestination.findOneAndUpdate(
						{ 'country.en': dest },
						{ $set: obj },
						{ new: true, upsert: true },
					);
				});
			}
		});
		res.json('done');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/destinations/freight-destination
// @desc     Create a freight destination
// @access   Private
router.post(
	'/freight-destination',
	[
		adminAuth,
		[
			check('enCountry', 'english country is required')
				.not()
				.isEmpty()
				.escape(),
			check('zhCountry', 'chinese country is required')
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
		const { enCountry, zhCountry, city, state } = req.body;
		// Create destination object
		const obj = {};
		obj.country = {};
		obj.country.en = enCountry;
		obj.country.zh = zhCountry;
		if (city) {
			// Create city object
			obj.city = {};
			obj.city.en = {};
			obj.city.zh = {};
			const cities = city.split(' zh ');
			obj.city.en = cities[0];
			obj.city.zh = cities[1];
		} else {
			// Create state object
			obj.state = {};
			obj.state.en = {};
			obj.state.zh = {};
			const states = state.split(' zh ');
			const enStates = states[0].split('; ');
			const zhStates = states[1].split('; ');
			enStates.forEach((tit) => (obj.state.en[tit] = req.body[tit]));
			zhStates.forEach((tit) => (obj.state.zh[tit] = req.body[tit]));
		}
		try {
			const newFreightDestination = new FreightDestination(obj);

			const freightDestination = await newFreightDestination.save();
			res.json(freightDestination);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	},
);

// @route    POST api/destinations/freight-type
// @desc     Create a freight type
// @access   Private
router.post(
	'/freight-type',
	[
		adminAuth,
		[
			check('enType', 'english freight type is required')
				.not()
				.isEmpty()
				.escape(),
			check('zhType', 'chinese freight type is required')
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
		const { enType, zhType } = req.body;
		try {
			const newFreightDestination = new FreightType({
				en: enType,
				zh: zhType,
			});

			const freightDestination = await newFreightDestination.save();
			res.json(freightDestination);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	},
);

// @route    POST api/destinations
// @desc     Create a destination
// @access   Private
router.post(
	'/',
	[
		freightAuth,
		[
			check('enCountry', 'english country is required')
				.not()
				.isEmpty()
				.escape(),
			check('zhCountry', 'chinese country is required')
				.not()
				.isEmpty()
				.escape(),
			check('destinationAddress', 'destination address is required')
				.not()
				.isEmpty()
				.escape(),
			check('originAddress', 'origin address is required')
				.not()
				.isEmpty()
				.escape(),
			check('price', 'Average price per kg is required').isInt(),
			check('deliveryDays', 'Estimated delivery days required').isInt(),
			check('charges', 'freight charges required').not().isEmpty().escape(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			enCountry,
			zhCountry,
			enFreightType,
			zhFreightType,
			destinationAddress,
			originAddress,
			enCity,
			zhCity,
			enState,
			zhState,
			enStateCity,
			zhStateCity,
			price,
			charges,
			deliveryDays,
		} = req.body;

		const { tradeName } = await Freight.findById(req.freight.id);
		const tables = charges.split(';').map(async (charge) => {
			const chargeObj = charge.split(',');
			const tableTitle = chargeObj[0].trim();
			const weightFormat = chargeObj[1];
			const specialNote = chargeObj[2].trim();
			const list = chargeObj[3].split('|').map((finPrice) => {
				const finPriceArr = finPrice.split(':');
				const weight = finPriceArr[0].trim();
				const cost = finPriceArr[1].trim();
				return { [weight]: cost };
			});
			const transTableTitle = await translate(tableTitle, { to: 'en' });
			const transSpecialNote = await translate(specialNote, { to: 'en' });
			return {
				tableTitle: {
					seller: tableTitle,
					en: transTableTitle.text,
				},
				weightFormat,
				specialNote: {
					seller: specialNote,
					en: transSpecialNote.text,
				},
				priceList: list,
			};
		});
		const tablesArrayResults = await Promise.all(tables);
		try {
			if (enCity) {
				const destObj = new Destination({
					freight: req.freight.id,
					freightName: tradeName && tradeName,
					'country.en': enCountry && enCountry,
					'country.zh': zhCountry && zhCountry,
					'freightType.en': enFreightType && enFreightType,
					'freightType.zh': zhFreightType && zhFreightType,
					'city.en': enCity && enCity,
					'city.zh': zhCity && zhCity,
					destinationAddress: destinationAddress && destinationAddress,
					originAddress: originAddress && originAddress,
					price: price && price,
					deliveryDays: deliveryDays && deliveryDays,
					tables: tablesArrayResults,
				});
				const newDestObj = await destObj.save();
				res.json(newDestObj);
			} else if (enState) {
				const destObj = new Destination({
					freight: req.freight.id,
					freightName: tradeName && tradeName,
					'country.en': enCountry && enCountry,
					'country.zh': zhCountry && zhCountry,
					'freightType.en': enFreightType && enFreightType,
					'freightType.zh': zhFreightType && zhFreightType,
					'stateObject.state.en': enState && enState,
					'stateObject.state.zh': zhState && zhState,
					'stateObject.city.en': enStateCity && enStateCity,
					'stateObject.city.zh': zhStateCity && zhStateCity,
					destinationAddress: destinationAddress && destinationAddress,
					originAddress: originAddress && originAddress,
					price: price && price,
					deliveryDays: deliveryDays && deliveryDays,
					tables: tablesArrayResults,
				});
				const newDestObj = await destObj.save();
				res.json(newDestObj);
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	},
);
// @route    PUT api/destinations/:id
// @desc     Edit a destination
// @access   Private
router.put(
	'/:id',
	[
		freightAuth,
		[
			check('enCountry', 'english country is required')
				.not()
				.isEmpty()
				.escape(),
			check('zhCountry', 'chinese country is required')
				.not()
				.isEmpty()
				.escape(),
			check('destinationAddress', 'destination address is required')
				.not()
				.isEmpty()
				.escape(),
			check('originAddress', 'origin address is required')
				.not()
				.isEmpty()
				.escape(),
			check('price', 'Average price per kg is required').isInt(),
			check('deliveryDays', 'Estimated delivery days required').isInt(),
			check('charges', 'freight charges required').not().isEmpty().escape(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			enCountry,
			zhCountry,
			enFreightType,
			zhFreightType,
			destinationAddress,
			originAddress,
			enCity,
			zhCity,
			enState,
			zhState,
			enStateCity,
			zhStateCity,
			price,
			charges,
			deliveryDays,
		} = req.body;

		const dest = await Destination.findById(req.params.id);

		// Check user
		if (dest.freight.toString() !== req.freight.id) {
			return res
				.status(401)
				.json("You're not authorized to perform this action");
		}

		const tables = charges.split(';').map(async (charge) => {
			const chargeObj = charge.split(',');
			const tableTitle = chargeObj[0].trim();
			const weightFormat = chargeObj[1];
			const specialNote = chargeObj[2].trim();
			const list = chargeObj[3].split('|').map((finPrice) => {
				const finPriceArr = finPrice.split(':');
				const weight = finPriceArr[0];
				const cost = finPriceArr[1];
				return { [weight]: cost };
			});
			const transTableTitle = await translate(tableTitle, { to: 'en' });
			const transSpecialNote = await translate(specialNote, { to: 'en' });
			return {
				tableTitle: {
					seller: tableTitle,
					en: transTableTitle.text,
				},
				weightFormat,
				specialNote: {
					seller: specialNote,
					en: transSpecialNote.text,
				},
				priceList: list,
			};
		});
		const tablesArrayResults = await Promise.all(tables);
		try {
			if (enCity) {
				let destRes = await Destination.findByIdAndUpdate(
					{
						_id: req.params.id,
					},
					{
						$set: {
							country: {
								en: enCountry,
								zh: zhCountry,
							},
							freightType: {
								en: enFreightType,
								zh: zhFreightType,
							},
							city: {
								en: enCity,
								zh: zhCity,
							},
							destinationAddress,
							originAddress,
							price,
							deliveryDays,
							tables: tablesArrayResults,
						},
					},
					{ new: true, upsert: true },
				);
				res.json(destRes);
			} else if (enState) {
				const destRes = await Destination.findByIdAndUpdate(
					{
						_id: req.params.id,
					},
					{
						$set: {
							freight: req.freight.id,
							country: {
								en: enCountry,
								zh: zhCountry,
							},
							freightType: {
								en: enFreightType,
								zh: zhFreightType,
							},
							stateObject: {
								state: {
									en: enState,
									zh: zhState,
								},
								city: {
									en: enStateCity,
									zh: zhStateCity,
								},
							},
							destinationAddress,
							originAddress,
							price,
							deliveryDays,
							tables: tablesArrayResults,
						},
					},
					{ new: true, upsert: true },
				);
				res.json(destRes);
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	},
);

// @route    POST api/destinations/freight-companies
// @desc     Get checkout shipping companies
// @access   Private
router.post('/freight-companies', auth, async (req, res) => {
	const { enCountry, enCity, enState, enStateCity, enFreightType } = req.body;
	try {
		if (enCity) {
			const companies = await Destination.find({
				'country.en': enCountry,
				'freightType.en': enFreightType,
				'city.en': enCity,
			});
			res.json(companies);
		} else if (enState) {
			const companies = await Destination.find({
				'country.en': enCountry,
				'freightType.en': enFreightType,
				'stateObject.state.en': enState,
				'stateObject.city.en': enStateCity,
			});
			res.json(companies);
		} else {
			res.status(400).send("Sorry we currently don't ship to your destination");
		}
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    GET api/destinations/freight-destination/me
// @desc     Get destinations by freight
// @access   Private
router.get('/freight-destination/me', freightAuth, async (req, res) => {
	try {
		const destinations = await Destination.find({
			freight: req.freight.id,
		}).sort({ date: -1 });
		res.json(destinations);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    GET api/destinations/recent-freight-destination/me
// @desc     Get recent destinations by freight
// @access   Private
router.get('/recent-freight-destination/me', freightAuth, async (req, res) => {
	try {
		const destinations = await Destination.find({ freight: req.freight.id })
			.sort({ date: -1 })
			.limit(2);
		res.json(destinations);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    GET api/destinations/freight-destinations/all
// @desc     Get all freight destinations
// @access   Private
router.get('/freight-destinations/all', freightAuth, async (req, res) => {
	try {
		const destinations = await FreightDestination.find().sort({
			'country.en': 1,
		});
		res.json(destinations);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    GET api/destinations/user-destinations/all
// @desc     Get all user destinations
// @access   Private
router.get('/user-destinations/all', auth, async (req, res) => {
	try {
		const destinations = await UserDestination.find().sort({ 'country.en': 1 });
		res.json(destinations);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    GET api/destinations/freight-types/all
// @desc     Get all freight types
// @access   Private
router.get('/freight-types/all', async (req, res) => {
	try {
		const types = await FreightType.find();
		res.json(types);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/destinations/:id
// @desc     Delete a destination
// @access   Private
router.delete('/:id', freightAuth, async (req, res) => {
	try {
		const destination = await Destination.findById(req.params.id);

		// Check for ObjectId format and post
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !destination) {
			return res.status(404).json('找不到目的地');
		}

		// Check user
		if (destination.freight.toString() !== req.freight.id) {
			return res.status(401).json('未经授权的货运公司');
		}

		await destination.remove();

		res.json('产品已移除');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('服务器错误');
	}
});

module.exports = router;
