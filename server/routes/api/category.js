const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const adminAuth = require("../../middleware/adminAuth");

const Category = require("../../models/Category");
const SellerCategory = require("../../models/SellerCategory");
const Product = require("../../models/Product");

// @route    GET api/category/user-category
// @desc     Create a category
// @access   Private
router.get("/user-category", async (req, res) => {
  let enCategories = new Set();
  let zhCategories = new Set();
  try {
    const products = await Product.find().select("category");
    const allCategories = await Category.find();
    const array1 = allCategories.map((cat) => cat.category.en);
    const prodsLength = await Product.find().countDocuments();
    if (prodsLength <= 0) {
      Category.deleteMany({}, () => console.log("no products"));
    }
    products.forEach(({ category }) => {
      enCategories.add(category.categoryTitle.en)
      zhCategories.add(category.categoryTitle.zh)
    }
    );
    const enCats = Array.from(enCategories);
    const zhCats = Array.from(zhCategories);

    const diffArr = array1.filter(x => !enCats.includes(x));
    if (diffArr.length > 0) {
      return (
        diffArr.forEach(async (difCat) => {
        const delCat = await Category.findOne({
          "category.en": difCat
        })
        await delCat.remove()
        })
      )
    }
    enCats.forEach(async (cat, index) => {
      const obj = {};
      obj.category = {};
      obj.category.en = cat;
      obj.category.zh = zhCats[index];
      obj.subCategory = {};
      obj.subCategory.en = {};
      obj.subCategory.zh = {};
      let enSubCats = new Set();
      let zhSubCats = new Set();
      const prods = await Product.find({
        "category.categoryTitle.en": cat,
      });
      prods.forEach(({ category }) => {
        enSubCats.add(category.subCategory.subCategoryTitle.en)
        zhSubCats.add(category.subCategory.subCategoryTitle.zh)
      }
      );
      const enSubCategories = Array.from(enSubCats);
      const zhSubCategories = Array.from(zhSubCats);
      enSubCategories.forEach(async (sCat, sIndex) => {
        let enGroupCats = new Set();
        let zhGroupCats = new Set();
        const groupedProds = await Product.find({
          "category.categoryTitle.en": cat,
          "category.subCategory.subCategoryTitle.en": sCat,
        });
        groupedProds.forEach(({ category }) => {
          enGroupCats.add(category.subCategory.groupTitle.en)
          zhGroupCats.add(category.subCategory.groupTitle.zh)
        }
        );
        const enGroups = Array.from(enGroupCats).join("; ");
        const zhGroups = Array.from(zhGroupCats).join("; ");
        obj.subCategory.en[sCat] = enGroups;
        obj.subCategory.zh[zhSubCategories[sIndex]] = zhGroups;
        await Category.findOneAndUpdate(
          { "category.en": cat },
          { $set: obj },
          { new: true, upsert: true }
        );
      });
    });
    res.json("done");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/category/product-category
// @desc     Create all products categories
// @access   Private
router.post(
  "/",
  [
    adminAuth,
    [
      check("categoryTitle", "category is required").not().isEmpty().escape(),
      check("subCategoryTitle", "sub category is required")
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
    const { categoryTitle, subCategoryTitle } = req.body;
    // Create category object
    const obj = {};
    obj.category = {};
    obj.category = categoryTitle;
    // Create sub category object
    obj.subCategory = {};
    const subTitles = subCategoryTitle.split("; ");
    subTitles.forEach((tit) => (obj.subCategory[tit] = req.body[tit]));
    try {
      const newCategory = new Category(obj);

      const category = await newCategory.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/category/seller-category
// @desc     Create a seller category
// @access   Private
router.post(
  "/seller-category",
  [
    adminAuth,
    [
      check("enCategoryTitle", "english category is required")
        .not()
        .isEmpty()
        .escape(),
      check("zhCategoryTitle", "chinese category is required")
        .not()
        .isEmpty()
        .escape(),
      check("subCategoryTitle", "sub category is required")
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
    const { enCategoryTitle, zhCategoryTitle, subCategoryTitle } = req.body;
    // Create category object
    const obj = {};
    obj.category = {};
    obj.category.en = enCategoryTitle;
    obj.category.zh = zhCategoryTitle;
    // Create sub category object
    obj.subCategory = {};
    obj.subCategory.en = {};
    obj.subCategory.zh = {};
    const subTitles = subCategoryTitle.split(" zh ");
    const enSubCats = subTitles[0].split("; ");
    const zhSubCats = subTitles[1].split("; ");
    enSubCats.forEach((tit) => (obj.subCategory.en[tit] = req.body[tit]));
    zhSubCats.forEach((tit) => (obj.subCategory.zh[tit] = req.body[tit]));
    try {
      const newCategory = new SellerCategory(obj);

      const category = await newCategory.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/category
// @desc     Get all product categories
// @access   Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ category: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    GET api/category/seller
// @desc     Get all seller categories
// @access   Public
router.get("/seller", async (req, res) => {
  try {
    const categories = await SellerCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
