const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Product = require("../../models/Product");

// @route    PUT api/wishlist/:id
// @desc     Add item to wishlist
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if the product has already been added to cart
    if (
      user.wishlist.items.filter(
        (item) => item.productId.toString() === req.params.id
      ).length > 0
    ) {
      return res.status(400).json("Item already added to wishlist");
    }

    user.wishlist.items.unshift({
      productId: req.params.id,
    });

    await user.save();

    res.json(user.wishlist.items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    PUT api/wishlist/remove/:id
// @desc     Remove item from wishlist
// @access   Private
router.put("/remove/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if the product has already been removed from wishlist
    if (
      user.wishlist.items.filter(
        (item) => item.productId.toString() === req.params.id
      ).length === 0
    ) {
      return res.status(400).json("this item is not in your wishlist");
    }

    // Get remove index
    const removeIndex = user.wishlist.items
      .map((item) => item.productId.toString())
      .indexOf(req.params.id);

    user.wishlist.items.splice(removeIndex, 1);

    await user.save();

    res.json("item removed from wishlist");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    Get api/wishlist
// @desc     Get wishlist items
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const ids = user.wishlist.items.map(({ productId }) => productId);
    const wishlistItems = await Product.find().where("_id").in(ids);
    res.json(wishlistItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
