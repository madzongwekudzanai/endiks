const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const adminAuth = require("../../middleware/adminAuth");

const BankDeposit = require("../../models/BankDeposit");

// @route    POST api/deposits/receive-order
// @desc     Receive Payment
// @access   Private
router.put(
  "/receive-order",
  [
    adminAuth,
    [
      check("message", "Notification message is required")
        .not()
        .isEmpty()
        .escape(),
      check("amount", "amount required").not().isEmpty().escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newDeposit = new BankDeposit({
        sellerId: sell,
        buyerId: req.user.id,
        shipperId: shipperId,
      });
      await newDeposit.save();

      res.json("A deposit was successfully made");
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  }
);

module.exports = router;
