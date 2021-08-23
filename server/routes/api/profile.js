const express = require("express");
const router = express.Router();
const sellerAuth = require("../../middleware/sellerAuth");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

const SellerProfile = require("../../models/SellerProfile");
const Seller = require("../../models/Seller");
const Product = require("../../models/Product");

const ITEMS_PER_PAGE = 6;

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", sellerAuth, async (req, res) => {
  try {
    const profile = await SellerProfile.findOne({
      seller: req.seller.id,
    });

    if (!profile) {
      return res.status(400).json("该卖家没有个人资料");
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("服务器错误");
  }
});

// @route    POST api/profile
// @desc     Create or update seller profile
// @access   Private
router.post(
  "/",
  [
    sellerAuth,
    [
      check("storeAddress", "商店地址为必填项").not().isEmpty().escape(),
      check("bio", "说明为必填项").not().isEmpty().escape(),
      check("storeImage", "徽标或封面图片为必填项").not().isEmpty().escape(),
      check("aliPayID", "需要支付宝ID").not().isEmpty().escape(),
      check("weChatID", "必须提供微信ID").not().isEmpty().escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      storeAddress,
      storeImage,
      aliPayID,
      weChatID,
      bio,
      edit
    } = req.body;

    const seller = await Seller.findById(req.seller.id);
    const sellerProf = await SellerProfile.findOne({ seller: req.seller.id });
    if (edit) fs.unlink(
      path.join(__dirname, `../../../public${sellerProf.storeImage}`),
      (err) => {
        if (err) res.status(400).json("无法更新徽标");
        console.log(`Previous logo removed`);
      }
    )

    const ajdStoreImage = storeImage.split("&#x2F;").join("/");
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = ajdStoreImage.match(regex);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    try {
      // Using upsert option (creates new doc if no match is found):
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex");
        fs.writeFile(
          path.join(
            __dirname,
            `../../../public/uploads/profiles/${filename}.${ext}`
          ),
          buffer,
          async (err) => {
            if (err) res.status(400).json("该文件无法上传");
            let profile = await SellerProfile.findOneAndUpdate(
              { seller: req.seller.id },
              {
                $set: {
                  user: req.seller.id,
                  storeName: seller.tradeName,
                  storeImage: `/uploads/profiles/${filename}.${ext}`,
                  storeAddress,
                  aliPayID,
                  weChatID,
                  bio,
                },
              },
              { new: true, upsert: true }
            );
            res.json(profile);
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json("服务器错误");
    }
  }
);

// @route    GET api/profile/count
// @desc     Get number of profile pages
// @access   Public
router.get("/count", async (req, res) => {
  try {
    const totalItems = await SellerProfile.find().countDocuments();
    const pages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    res.json(pages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    GET api/profile/:page
// @desc     Get paginated profiles
// @access   Public
router.get("/:page", async (req, res) => {
  const page = +req.params.page;
  try {
    const profiles = await SellerProfile.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .select("-payPalEmail");
    const totalItems = await SellerProfile.find().countDocuments();
    const pages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    res.json({ profiles, pages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    POST api/profile/autocomplete/search
// @desc     Auto complete
// @access   Public
router.post("/autocomplete", async (req, res) => {
  try {
    const results = await SellerProfile.aggregate([
      {
        $search: {
          autocomplete: {
            path: "storeName",
            query: req.body.content,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1,
              maxExpansions: 256,
            },
          },
        },
      },
      {
        $project: {
          storeName: 1,
        },
      },
      {
        $limit: 6,
      },
    ]);
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    POST api/profile/search/:page
// @desc     Search sellers
// @access   Public
router.post(
  "/search/:page",
  [check("content", "This field is required").not().isEmpty().escape()],
  async (req, res) => {
    const page = +req.params.page;
    try {
      const results = await SellerProfile.aggregate([
        {
          $search: {
            autocomplete: {
              query: req.body.content,
              path: "storeName",
              fuzzy: {
                maxEdits: 1,
                maxExpansions: 255,
              },
            },
          },
        },
        { $skip: (page - 1) * ITEMS_PER_PAGE },
        {
          $project: {
            _id: 1,
            storeName: 1,
            storeAddress: 1,
            storeImage: 1,
            seller: 1,
            reviews: 1,
          },
        },
        {
          $limit: ITEMS_PER_PAGE,
        },
      ]);
      const totalItems = await SellerProfile.aggregate([
        {
          $search: {
            autocomplete: {
              query: req.body.content,
              path: "storeName",
              fuzzy: {
                maxEdits: 1,
                maxExpansions: 255,
              },
            },
          },
        },
        {
          $count: "pages",
        },
      ]);
      const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
      res.json({ results, pages });
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

// @route    GET api/profile/seller/:seller_id
// @desc     Get profile by user ID
// @access   Public
router.get("/seller/:seller_id", async (req, res) => {
  try {
    const profile = await SellerProfile.findOne({
      seller: req.params.seller_id,
    });

    if (!profile) return res.status(400).json({ msg: "Seller not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Seller not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", sellerAuth, async (req, res) => {
  try {
    // Remove user posts

    await Product.deleteMany({ seller: req.seller.id });
    // Remove profile
    await SellerProfile.findOneAndRemove({ seller: req.seller.id });
    // Remove user
    await Seller.findOneAndRemove({ _id: req.seller.id });

    res.json("卖家已删除");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("服务器错误");
  }
});

module.exports = router;
