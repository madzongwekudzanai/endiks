const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const adminAuth = require("../../middleware/adminAuth");
const auth = require("../../middleware/auth");

const ShippingAgent = require("../../models/ShippingAgent");
const Destination = require("../../models/Destination");

// @route    POST api/shipping-agents
// @desc     Add a shipping agents
// @access   Private
router.post(
  "/",
  [
    adminAuth,
    [
      check("name", "company name is required").not().isEmpty().escape(),
      check("destinations", "destination countries are required")
        .not()
        .isEmpty()
        .escape(),
      check("email", "company email is required").isEmail(),
      check("phone", "company phone number is required")
        .not()
        .isEmpty()
        .escape(),
      check("address", "shipment address is required").not().isEmpty().escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, address, destinations } = req.body;
    // Create shipper object
    const obj = {};
    obj.name = name;
    obj.email = email;
    obj.phone = phone;
    obj.address = address;
    // Create sub category object
    obj.location = {};
    const dest = destinations
      .split(";")
      .map((destination) => destination.trim());
    dest.forEach((tit) => (obj.location[tit] = req.body[tit]));
    try {
      const newShippingAgent = new ShippingAgent(obj);

      const agent = await newShippingAgent.save();
      let cits = new Set();
      dest.forEach(async (country) => {
        const loc = await Destination.findOne({ country });
        if (loc) {
          const cities = loc.cities;
          const updCities = `${cities}; ${req.body[country]}`;
          updCities
            .split(";")
            .map((upd) => upd.trim())
            .forEach((city) => cits.add(city));
          const allCities = Array.from(cits).join(";");
          return await Destination.findOneAndUpdate(
            { country },
            {
              $set: {
                cities: allCities,
              },
            },
            { new: true, upsert: true }
          );
        }
        const newDestination = new Destination({
          country,
          cities: req.body[country].trim(),
        });

        await newDestination.save();
      });

      res.json(agent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/shipping-agents/destinations
// @desc     Get all shipping destinations
// @access   Private
router.get("/destinations", auth, async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
