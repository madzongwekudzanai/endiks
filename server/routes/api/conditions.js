const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/adminAuth");
const sellerAuth = require("../../middleware/sellerAuth");
const { check, validationResult } = require("express-validator");
const Condition = require("../../models/Condition");

// @router  POST api/conditions
// @desc    Add product condition
// @access  Private
router.post(
  "/",
  [
    adminAuth,
    [
      check("en", "English condition is required").not().isEmpty().escape(),
      check("zh", "Chinese condition is required").not().isEmpty().escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { en, zh } = req.body;

    try {
      condition = new Condition({
        en,
        zh,
      });

      await condition.save();

      res.json("Condition added");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/conditions
// @desc     Get all product conditions
// @access   Private
router.get("/", sellerAuth, async (req, res) => {
  try {
    const conditions = await Condition.find();
    res.json(conditions);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
