const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Product = require("../../models/Product");

// @route    PUT api/cart/:id/:quantity
// @desc     Add item to cart
// @access   Private
router.put("/:id/:quantity", auth, async (req, res) => {
  const cartQuantity = +req.params.quantity;
  try {
    const user = await User.findById(req.user.id);
    const seller = await Product.findById(req.params.id);

    // Check if the product has already been added to cart
    if (
      user.cart.items.filter(
        (item) => item.productId.toString() === req.params.id
      ).length > 0
    ) {
      return res.status(400).json("Item already added to cart");
    }

    // Check if the quantity exceeds provided
    if (cartQuantity > seller.quantity) {
      return res
        .status(400)
        .json(
          `sorry there are only ${seller.quantity} items available in stock`
        );
    }

    user.cart.items.unshift({
      productId: req.params.id,
      quantity: cartQuantity,
      seller: seller.seller,
    });

    await user.save();

    res.json(user.cart.items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    POST api/cart/quantity/:id
// @desc     Update cart quantity
// @access   Private
router.post(
  "/quantity/:id",
  [auth, [check("quantity", "quantity is required").isInt({ min: 1 })]],
  async (req, res) => {
    const cartQuantity = +req.body.quantity;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const quantity = await Product.findById(req.params.id);
      // Check if the quantity exceeds provided
      if (cartQuantity > quantity.quantity) {
        return res
          .status(400)
          .json(
            `sorry there are only ${quantity.quantity} items available in stock`
          );
      }

      let cartIndex = user.cart.items
        .map((item) => item.productId.toString())
        .indexOf(req.params.id);
      user.cart.items[cartIndex].quantity = cartQuantity;
      await user.save();
      res.json("quantity updated");
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

// @route    PUT api/cart/cart-items/remove/:id
// @desc     Remove item from cart
// @access   Private
router.put("/cart-items/remove/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if the product has already been removed from cart
    if (
      user.cart.items.filter(
        (item) => item.productId.toString() === req.params.id
      ).length === 0
    ) {
      return res.status(400).json("this item is already not in your cart");
    }

    // Get remove index
    const removeIndex = user.cart.items
      .map((item) => item.productId.toString())
      .indexOf(req.params.id);

    user.cart.items.splice(removeIndex, 1);

    await user.save();

    const ids = user.cart.items.map(({ productId }) => productId);
    const cartItems = await Product.find().where("_id").in(ids);
    cartItems.forEach(async (item) => {
      const userProd = await User.findById(req.user.id);
      if (
        item.quantity <
        user.cart.items[
          user.cart.items.map((item) => item.productId).indexOf(item._id)
        ].quantity
      ) {
        const secondRemoveIndex = userProd.cart.items
          .map((cartItem) => cartItem.productId)
          .indexOf(item._id);
        userProd.cart.items.splice(secondRemoveIndex, 1);
        return await userProd.save();
      }
    });
    const newCartItems = cartItems.filter(
      (ite) =>
        ite.quantity >=
        user.cart.items[
          user.cart.items.map((item) => item.productId).indexOf(ite._id)
        ].quantity
    );

    res.json(newCartItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    GET api/cart
// @desc     Get cart items
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const ids = user.cart.items.map(({ productId }) => productId);
    ids.forEach(async (prod) => {
      const checkProd = await Product.findById(prod);
      if (!checkProd) {
        const remIndex = user.cart.items
          .map((item) => item.productId)
          .indexOf(prod);
        user.cart.items.splice(remIndex, 1);
        return await user.save();
      }
    });
    const cartItems = await Product.find().where("_id").in(ids);
    cartItems.forEach(async (item) => {
      const userProd = await User.findById(req.user.id);
      if (
        item.quantity <
        user.cart.items[
          user.cart.items.map((item) => item.productId).indexOf(item._id)
        ].quantity
      ) {
        const removeIndex = userProd.cart.items
          .map((cartItem) => cartItem.productId)
          .indexOf(item._id);
        userProd.cart.items.splice(removeIndex, 1);
        return await userProd.save();
      }
    });
    const newCartItems = cartItems.filter(
      (ite) =>
        ite.quantity >=
        user.cart.items[
          user.cart.items.map((item) => item.productId).indexOf(ite._id)
        ].quantity
    );
    res.json(newCartItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
