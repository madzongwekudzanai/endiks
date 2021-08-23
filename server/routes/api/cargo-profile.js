const express = require("express");
const router = express.Router();
const freightAuth = require("../../middleware/freightAuth");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

const FreightProfile = require("../../models/FreightProfile");
const Freight = require("../../models/Freight");
const Destination = require("../../models/Destination");

// @route    GET api/cargo-profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", freightAuth, async (req, res) => {
  try {
    const profile = await FreightProfile.findOne({
        freight: req.freight.id,
    });

    if (!profile) {
      return res.status(400).json("货运公司暂无资料");
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("服务器错误");
  }
});

// @route    POST api/cargo-profile
// @desc     Create or update seller profile
// @access   Private
router.post(
  "/",
  [
    freightAuth,
    [
      check("freightAddress", "必须填写货运公司地址").not().isEmpty().escape(),
      check("freightImage", "徽标或封面图片为必填项").not().isEmpty().escape(),
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
      freightAddress,
      freightImage,
      aliPayID,
      weChatID,
      edit,
    } = req.body;

    const freight = await Freight.findById(req.freight.id);
    const freightProf = await FreightProfile.findOne({ freight: req.freight.id });
    if (edit) fs.unlink(
      path.join(__dirname, `../../../public${freightProf.freightImage}`),
      (err) => {
        if (err) res.status(400).json("无法更新徽标");
        console.log(`Previous logo removed`);
      }
    )
      
    const ajdFreightImage = freightImage.split("&#x2F;").join("/");
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = ajdFreightImage.match(regex);
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
            `../../../public/uploads/cargoprofiles/${filename}.${ext}`
          ),
          buffer,
          async (err) => {
            if (err) res.status(400).json("该文件无法上传");
            let profile = await FreightProfile.findOneAndUpdate(
              { freight: req.freight.id },
              {
                $set: {
                  user: req.freight.id,
                  freightName: freight.tradeName,
                  freightImage: `/uploads/cargoprofiles/${filename}.${ext}`,
                  freightAddress,
                  aliPayID,
                  weChatID,
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

// @route    DELETE api/cargo-profile
// @desc     Delete profile, freight and destinations
// @access   Private
router.delete("/", freightAuth, async (req, res) => {
  try {
    // Remove freight destinations

    await Destination.deleteMany({ freight: req.freight.id });
    // Remove profile
    await FreightProfile.findOneAndRemove({ freight: req.freight.id });
    // Remove freight
    await Freight.findOneAndRemove({ _id: req.freight.id });

    res.json("货运公司已删除");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("服务器错误");
  }
});

module.exports = router;
