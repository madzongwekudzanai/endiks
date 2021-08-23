const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const translate = require("@vitalets/google-translate-api");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const { check, validationResult } = require("express-validator");
const sellerAuth = require("../../middleware/sellerAuth");

const Product = require("../../models/Product");
const Seller = require("../../models/Seller");
const SellerCategory = require("../../models/SellerCategory");
const Condition = require("../../models/Condition");
const Keyword = require("../../models/Keyword");

const ITEMS_PER_PAGE = 12;

// @route    GET api/products/seller/recent-products/me
// @desc     Get current seller recent products
// @access   Public
router.get("/seller/recent-products/me", sellerAuth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller.id })
      .limit(2)
      .sort({
        date: -1,
      });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    GET api/products/seller/all-products/me
// @desc     Get all current seller products
// @access   Public
router.get("/seller/all-products/me", sellerAuth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller.id }).sort({
      date: -1,
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    GET api/products/new_products/all-products/arrivals
// @desc     Get all current seller products
// @access   Public
router.get("/new_products/all-products/arrivals", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({
        date: -1,
      })
      .limit(8);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    POST api/products
// @desc     Create a product
// @access   Private
router.post(
  "/",
  [
    sellerAuth,
    [
      check("title", "标题为必填项").not().isEmpty().escape(),
      check("keywords", "关键字为必填项").not().isEmpty().escape(),
      check("weight", "产品重量为必填项").isDecimal(),
      check("price", "价格为必填项").isInt(),
      check("quantity", "需要数量").isInt({ min: 1 }),
      check("description", "必须提供产品说明").not().isEmpty().escape(),
      check("subCategoryTitle", "子类别为必填项").not().isEmpty().escape(),
      check("groupTitle", "组是必需的").not().isEmpty().escape(),
      check("productImages", "需要产品图片").not().isEmpty().escape(),
      check("condition", "提供产品条件").not().isEmpty().escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      keywords,
      weight,
      price,
      quantity,
      description,
      productImages,
      brand,
      size,
      color,
      condition,
      loc,
    } = req.body;
    const subCategoryTitle = req.body.subCategoryTitle.split("&amp;").join("&");
    const groupTitle = req.body.groupTitle.split("&amp;").join("&");
    const enCategory = req.body.enCategory.split("&amp;").join("&");
    const zhCategory = req.body.zhCategory.split("&amp;").join("&");

    const {
      tradeName,
      locale,
      currency,
      shipping,
      currencyCode,
    } = await Seller.findById(req.seller.id);

    const transTitle = await translate(title, { to: "en" });
    const transKeywords = await translate(keywords, { to: "en" });
    const transDesc = await translate(description, { to: "en" });
    const keyWordArray = transKeywords.text
      .split(",")
      .map((word) => word.trim().toLowerCase());

    // Condition
    const cond = await Condition.findOne({
      [loc === "english" ? "en" : "zh"]: condition,
    });

    // Category
    const cat = await SellerCategory.findOne({ "category.zh": zhCategory });

    const subCatIndex = Object.keys(
      cat._doc.subCategory[loc === "english" ? "en" : "zh"]
    )
      .map((zhSubCats) => zhSubCats)
      .indexOf(subCategoryTitle);
    const enSubCat = Object.keys(cat._doc.subCategory.en)[subCatIndex];
    const zhSubCat = Object.keys(cat._doc.subCategory.zh)[subCatIndex];

    const groupIndex = cat._doc.subCategory[loc === "english" ? "en" : "zh"][
      subCategoryTitle
    ]
      .split("; ")
      .map((zhSubCats) => zhSubCats)
      .indexOf(groupTitle);
    const enGroup = cat._doc.subCategory.en[enSubCat].split("; ")[groupIndex];
    const zhGroup = cat._doc.subCategory.zh[zhSubCat].split("; ")[groupIndex];

    const images = productImages
      .split("|")
      .map((img) => img.split("&#x2F;").join("/"));

    try {
      let filenames = new Set();
      images.forEach((img, index) => {
        const regex = /^data:.+\/(.+);base64,(.*)$/;
        const matches = img.match(regex);
        const ext = matches[1];
        const data = matches[2];
        const buffer = Buffer.from(data, "base64");
        const filename = crypto.randomBytes(16).toString("hex");
        filenames.add(`/uploads/products/${filename}.${ext}`);
        fs.writeFile(
          path.join(
            __dirname,
            `../../../public/uploads/products/${filename}.${ext}`
          ),
          buffer,
          (err) => {
            if (err) {
              return res
                .status(400)
                .json(
                  loc === "english"
                    ? `image number ${index + 1} not added`
                    : `图片编号$ {index + 1}未添加`
                );
            }
            console.log("image added");
          }
        );
      });
      const uniqueFilenames = Array.from(filenames);
      const product = new Product({
        seller: req.seller.id,
        locale: locale && locale,
        currency: currency && currency,
        currencyCode: currencyCode && currencyCode,
        shipping: shipping && shipping,
        name: tradeName && tradeName,
        title: transTitle.text.trim(),
        titles: {
          seller: title.trim(),
        },
        condition: {
          en: cond && cond._doc.en,
          zh: cond && cond._doc.zh,
        },
        description: transDesc.text.trim(),
        descriptions: {
          seller: description.trim(),
        },
        keywords: {
          seller: keywords.trim(),
          en: transKeywords.text.trim(),
        },
        weight: weight && weight,
        quantity: quantity && quantity,
        brand: brand && brand,
        size: size && size,
        color: color && color,
        price: price && price,
        slides: uniqueFilenames,
        category: {
          categoryTitle: {
            en: enCategory,
            zh: zhCategory,
          },
          subCategory: {
            subCategoryTitle: {
              en: enSubCat,
              zh: zhSubCat,
            },
            groupTitle: {
              en: enGroup,
              zh: zhGroup,
            },
          },
        },
      });

      const newProd = await product.save();
      keyWordArray.forEach(
        async (en) =>
          await Keyword.findOneAndUpdate(
            { 
              en,
              "category.en": enCategory,
              "category.zh": zhCategory
            },
            {
              $set: {
                en,
                "category.en": enCategory,
                "category.zh": zhCategory
              },
            },
            { new: true, upsert: true }
          )
      );

      res.json(newProd);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(loc === "english" ? "Server Error" : "服务器错误");
    }
  }
);

// @route    POST api/products/multiple
// @desc     Create multiple products
// @access   Private
router.post(
  "/multiple",
  [
    sellerAuth,
    [
      check("title", "标题为必填项").not().isEmpty().escape(),
      check("separatorProperty", "请提供分隔符，例如大小")
        .not()
        .isEmpty()
        .escape(),
      check("properties", "需要不同的属性").not().isEmpty().escape(),
      check("keywords", "关键字为必填项").not().isEmpty().escape(),
      check("description", "必须提供产品说明").not().isEmpty().escape(),
      check("subCategoryTitle", "子类别为必填项").not().isEmpty().escape(),
      check("groupTitle", "组是必需的").not().isEmpty().escape(),
      check("productImages", "需要产品图片").not().isEmpty().escape(),
      check("condition", "提供产品条件").not().isEmpty().escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      properties,
      description,
      separatorProperty,
      condition,
      loc,
      keywords,
      productImages,
    } = req.body;
    const subCategoryTitle = req.body.subCategoryTitle.split("&amp;").join("&");
    const groupTitle = req.body.groupTitle.split("&amp;").join("&");
    const enCategory = req.body.enCategory.split("&amp;").join("&");
    const zhCategory = req.body.zhCategory.split("&amp;").join("&");

    const {
      tradeName,
      locale,
      currency,
      shipping,
      currencyCode,
    } = await Seller.findById(req.seller.id);
    const propertiesArray = properties.split(";").map(async (property) => {
      propArray = property.split(",")
      const pro = propArray[0].trim()
      const enProperty = await translate(pro, { to: "en" });
      return {
        productRef: crypto.randomBytes(16).toString("hex"),
        seller: pro,
        en: enProperty.text
      }
    })
    const propertiesArrayResults = await Promise.all(propertiesArray)
    const transKeywords = await translate(keywords, { to: "en" });
    const keyWordArray = transKeywords.text
      .split(",")
      .map((word) => word.trim().toLowerCase());

    const cond = await Condition.findOne({
      [loc === "english" ? "en" : "zh"]: condition,
    });

    const cat = await SellerCategory.findOne({ "category.zh": zhCategory });

    const subCatIndex = Object.keys(
      cat._doc.subCategory[loc === "english" ? "en" : "zh"]
    )
      .map((zhSubCats) => zhSubCats)
      .indexOf(subCategoryTitle);
    const enSubCat = Object.keys(cat._doc.subCategory.en)[subCatIndex];
    const zhSubCat = Object.keys(cat._doc.subCategory.zh)[subCatIndex];

    const groupIndex = cat._doc.subCategory[loc === "english" ? "en" : "zh"][
      subCategoryTitle
    ]
      .split("; ")
      .map((zhSubCats) => zhSubCats)
      .indexOf(groupTitle);
    const enGroup = cat._doc.subCategory.en[enSubCat].split("; ")[groupIndex];
    const zhGroup = cat._doc.subCategory.zh[zhSubCat].split("; ")[groupIndex];

    const images = productImages
      .split("|")
      .map((img) => img.split("&#x2F;").join("/"));

    const regex = /^data:.+\/(.+);base64,(.*)$/;
    try {
      const prods = properties.split(";").map(async (prop, propIndex) => {
        let filenames = new Set();
        const propsArr = prop.split(",");
        const singleTitle = propsArr[0].trim();
        const singlePrice = propsArr[1].trim();
        const singleWeight = propsArr[2].trim();
        const singleQuantity = propsArr[3].trim();
        const adjTitle = `${title} ${singleTitle}`;
        const adjDesc = `${separatorProperty}: ${singleTitle}, ${description}`;

        const transTitle = await translate(adjTitle, { to: "en" });
        const transSeparatorProperty = await translate(separatorProperty, {
          to: "en",
        });
        const transDesc = await translate(adjDesc, { to: "en" });

        images.forEach((img, index) => {
          const matches = img.match(regex);
          const ext = matches[1];
          const data = matches[2];
          const buffer = Buffer.from(data, "base64");
          const filename = crypto.randomBytes(16).toString("hex");
          filenames.add(`/uploads/products/${filename}.${ext}`);
          fs.writeFile(
            path.join(
              __dirname,
              `../../../public/uploads/products/${filename}.${ext}`
            ),
            buffer,
            (err) => {
              if (err) {
                return res
                  .status(400)
                  .json(
                    loc === "english"
                      ? `image number ${index + 1} not added`
                      : `图片编号${index + 1}未添加`
                  );
              }
              console.log("image added");
            }
          );
        });
        const uniqueFilenames = Array.from(filenames);

        const product = new Product({
          seller: req.seller.id,
          locale: locale && locale,
          currency: currency && currency,
          currencyCode: currencyCode && currencyCode,
          shipping: shipping && shipping,
          name: tradeName && tradeName,
          title: transTitle.text,
          keywords: {
            seller: keywords.trim(),
            en: transKeywords.text.trim(),
          },
          titles: {
            seller: adjTitle,
          },
          condition: {
            en: cond && cond._doc.en,
            zh: cond && cond._doc.zh,
          },
          description: transDesc.text,
          descriptions: {
            seller: adjDesc,
          },
          firstOptions: {
            attribute: {
              en: transSeparatorProperty.text,
              seller: separatorProperty
            },
            options: propertiesArrayResults
          },
          weight: singleWeight,
          quantity: singleQuantity,
          optionsLevel: 1,
          firstOptionProductRef: propertiesArrayResults[propIndex] && propertiesArrayResults[propIndex].productRef,
          slides: uniqueFilenames,
          price: singlePrice,
          category: {
            categoryTitle: {
              en: enCategory,
              zh: zhCategory,
            },
            subCategory: {
              subCategoryTitle: {
                en: enSubCat,
                zh: zhSubCat,
              },
              groupTitle: {
                en: enGroup,
                zh: zhGroup,
              },
            },
          },
        });

        const newProd = await product.save();
        return (
          newProd
        )
      });
      keyWordArray.forEach(
        async (en) =>
          await Keyword.findOneAndUpdate(
            { 
              en,
              "category.en": enCategory,
              "category.zh": zhCategory
            },
            {
              $set: {
                en,
                "category.en": enCategory,
                "category.zh": zhCategory
              },
            },
            { new: true, upsert: true }
          )
      );
      const productsArrayResults = await Promise.all(prods)
      res.json(productsArrayResults)
    } catch (err) {
      console.error(err.message);
      res.status(500).json(loc === "english" ? "Server Error" : "服务器错误");
    }
  }
);

// @route    POST api/products/options
// @desc     Add options to product
// @access   Private
router.post(
  "/options",
  [
    sellerAuth,
    [
      check("separatorProperty", "请提供分隔符，例如大小")
        .not()
        .isEmpty()
        .escape(),
      check("properties", "需要不同的属性").not().isEmpty().escape(),
      check("productID", "需要商品ID").not().isEmpty().escape(),
      check("keywords", "关键字为必填项").not().isEmpty().escape(),
      check("productImages", "需要产品图片").not().isEmpty().escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      separatorProperty,
      properties,
      productID,
      loc,
      keywords,
      productImages,
      slides,
      optionsLevel,
      sellerTitle,
      sellerDescriptions,
      enCondition,
      zhCondition,
      enCategoryTitle,
      zhCategoryTitle,
      enSubCategoryTitle,
      zhSubCategoryTitle,
      enGroupTitle,
      zhGroupTitle,
      sellerID,
      optionsRef
    } = req.body;
    const prod = await Product.findById(productID)

    // Check for ObjectId format and post
    if (!productID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json("找不到产品");
    }

    // Check user
    if (sellerID.toString() !== req.seller.id) {
      return res.status(401).json("卖方未经授权");
    }

    const {
      tradeName,
      locale,
      currency,
      shipping,
      currencyCode,
    } = await Seller.findById(req.seller.id);
    const propertiesArray = properties.split(";").map(async (property) => {
      propArray = property.split(",")
      const pro = propArray[0].trim()
      const enProperty = await translate(pro, { to: "en" });
      return {
        productRef: crypto.randomBytes(16).toString("hex"),
        seller: pro,
        en: enProperty.text
      }
    })
    const propertiesArrayResults = await Promise.all(propertiesArray)
    const transKeywords = await translate(keywords, { to: "en" });
    const keyWordArray = transKeywords.text
      .split(",")
      .map((word) => word.trim().toLowerCase());

    const images = productImages
      .split("|")
      .map((img) => img.split("&#x2F;").join("/"));

    const regex = /^data:.+\/(.+);base64,(.*)$/;
    try {
      slides.split(";").forEach((img, index) =>
        fs.unlink(path.join(__dirname, `../../../public${img}`), (err) => {
          if (err) {
            return res
              .status(400)
              .json(
                loc === "english"
                  ? `Could not delete image number ${index + 1}`
                  : `无法删除图片编号${index + 1}`
              );
          }
          console.log(`Image number ${index + 1} deleted`);
        })
      );
      if (optionsLevel === 0) {
        const prods = properties.split(";").map(async (prop, propIndex) => {
          let filenames = new Set();
          const propsArr = prop.split(",");
          const singleTitle = propsArr[0].trim();
          const singlePrice = propsArr[1].trim();
          const singleWeight = propsArr[2].trim();
          const singleQuantity = propsArr[3].trim();
          const adjTitle = `${sellerTitle} ${singleTitle}`;
          const adjDesc = `${separatorProperty}: ${singleTitle}, ${sellerDescriptions}`;

          const transTitle = await translate(adjTitle, { to: "en" });
          const transSeparatorProperty = await translate(separatorProperty, {
            to: "en",
          });
          const transDesc = await translate(adjDesc, { to: "en" });

          images.forEach((img, index) => {
            const matches = img.match(regex);
            const ext = matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");
            const filename = crypto.randomBytes(16).toString("hex");
            filenames.add(`/uploads/products/${filename}.${ext}`);
            fs.writeFile(
              path.join(
                __dirname,
                `../../../public/uploads/products/${filename}.${ext}`
              ),
              buffer,
              (err) => {
                if (err) {
                  return res
                    .status(400)
                    .json(
                      loc === "english"
                        ? `image number ${index + 1} not added`
                        : `图片编号${index + 1}未添加`
                    );
                }
                console.log("image added");
              }
            );
          });
          const uniqueFilenames = Array.from(filenames);

          const product = new Product({
            seller: req.seller.id,
            locale: locale && locale,
            currency: currency && currency,
            currencyCode: currencyCode && currencyCode,
            shipping: shipping && shipping,
            name: tradeName && tradeName,
            title: transTitle.text,
            optionsLevel: 1,
            keywords: {
              seller: keywords.trim(),
              en: transKeywords.text.trim(),
            },
            titles: {
              seller: adjTitle,
            },
            condition: {
              en: enCondition,
              zh: zhCondition,
            },
            description: transDesc.text,
            descriptions: {
              seller: adjDesc,
            },
            firstOptions: {
              attribute: {
                en: transSeparatorProperty.text,
                seller: separatorProperty
              },
              options: propertiesArrayResults
            },
            weight: singleWeight,
            quantity: singleQuantity,
            firstOptionProductRef: propertiesArrayResults[propIndex] && propertiesArrayResults[propIndex].productRef,
            slides: uniqueFilenames,
            price: singlePrice,
            category: {
              categoryTitle: {
                en: enCategoryTitle,
                zh: zhCategoryTitle,
              },
              subCategory: {
                subCategoryTitle: {
                  en: enSubCategoryTitle,
                  zh: zhSubCategoryTitle,
                },
                groupTitle: {
                  en: enGroupTitle,
                  zh: zhGroupTitle,
                },
              },
            },
          });
          const newProd = await product.save();
          return (
            newProd
          )
        });
        keyWordArray.forEach(
          async (en) =>
            await Keyword.findOneAndUpdate(
              { 
                en,
                "category.en": enCategoryTitle,
                "category.zh": zhCategoryTitle
              },
              {
                $set: {
                  en,
                  "category.en": enCategoryTitle,
                  "category.zh": zhCategoryTitle
                },
              },
              { new: true, upsert: true }
            )
        );
        await prod.remove();
        const productsArrayResults = await Promise.all(prods)
        res.json(productsArrayResults)
      }

      else if (optionsLevel === 1) {
        const prods = properties.split(";").map(async (prop, propIndex) => {
          let filenames = new Set();
          const propsArr = prop.split(",");
          const singleTitle = propsArr[0].trim();
          const singlePrice = propsArr[1].trim();
          const singleWeight = propsArr[2].trim();
          const singleQuantity = propsArr[3].trim();
          const adjTitle = `${sellerTitle}, ${singleTitle}`;
          const adjDesc = `${separatorProperty}: ${singleTitle}, ${sellerDescriptions}`;

          const transTitle = await translate(adjTitle, { to: "en" });
          const transSeparatorProperty = await translate(separatorProperty, {
            to: "en",
          });
          const transDesc = await translate(adjDesc, { to: "en" });

          images.forEach((img, index) => {
            const matches = img.match(regex);
            const ext = matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");
            const filename = crypto.randomBytes(16).toString("hex");
            filenames.add(`/uploads/products/${filename}.${ext}`);
            fs.writeFile(
              path.join(
                __dirname,
                `../../../public/uploads/products/${filename}.${ext}`
              ),
              buffer,
              (err) => {
                if (err) {
                  return res
                    .status(400)
                    .json(
                      loc === "english"
                        ? `image number ${index + 1} not added`
                        : `图片编号${index + 1}未添加`
                    );
                }
                console.log("image added");
              }
            );
          });
          const uniqueFilenames = Array.from(filenames);

          const product = new Product({
            seller: req.seller.id,
            locale: locale && locale,
            currency: currency && currency,
            currencyCode: currencyCode && currencyCode,
            shipping: shipping && shipping,
            name: tradeName && tradeName,
            title: transTitle.text,
            optionsLevel: 2,
            keywords: {
              seller: keywords.trim(),
              en: transKeywords.text.trim(),
            },
            titles: {
              seller: adjTitle,
            },
            condition: {
              en: enCondition,
              zh: zhCondition,
            },
            description: transDesc.text,
            descriptions: {
              seller: adjDesc,
            },
            firstOptions: {
              attribute: {
                en: prod && prod.firstOptions.attribute.en,
                seller: prod && prod.firstOptions.attribute.seller
              },
              options: prod && prod.firstOptions.options
            },
            secondOptions: {
              attribute: {
                en: transSeparatorProperty.text,
                seller: separatorProperty
              },
              options: propertiesArrayResults
            },
            weight: singleWeight,
            quantity: singleQuantity,
            firstOptionProductRef: optionsRef,
            secondOptionProductRef: propertiesArrayResults[propIndex] && propertiesArrayResults[propIndex].productRef,
            slides: uniqueFilenames,
            price: singlePrice,
            category: {
              categoryTitle: {
                en: enCategoryTitle,
                zh: zhCategoryTitle,
              },
              subCategory: {
                subCategoryTitle: {
                  en: enSubCategoryTitle,
                  zh: zhSubCategoryTitle,
                },
                groupTitle: {
                  en: enGroupTitle,
                  zh: zhGroupTitle,
                },
              },
            },
          });

          const newProd = await product.save();
          return (
            newProd
          )
        });
        keyWordArray.forEach(
          async (en) =>
            await Keyword.findOneAndUpdate(
              { 
                en,
                "category.en": enCategoryTitle,
                "category.zh": zhCategoryTitle
              },
              {
                $set: {
                  en,
                  "category.en": enCategoryTitle,
                  "category.zh": zhCategoryTitle
                },
              },
              { new: true, upsert: true }
            )
        );
        await prod.remove();
        const productsArrayResults = await Promise.all(prods)
        res.json(productsArrayResults)
      }
      else if (optionsLevel === 2) {
        const prods = properties.split(";").map(async (prop, propIndex) => {
          let filenames = new Set();
          const propsArr = prop.split(",");
          const singleTitle = propsArr[0].trim();
          const singlePrice = propsArr[1].trim();
          const singleWeight = propsArr[2].trim();
          const singleQuantity = propsArr[3].trim();
          const adjTitle = `${sellerTitle}, ${singleTitle}`;
          const adjDesc = `${separatorProperty}: ${singleTitle}, ${sellerDescriptions}`;

          const transTitle = await translate(adjTitle, { to: "en" });
          const transSeparatorProperty = await translate(separatorProperty, {
            to: "en",
          });
          const transDesc = await translate(adjDesc, { to: "en" });

          images.forEach((img, index) => {
            const matches = img.match(regex);
            const ext = matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");
            const filename = crypto.randomBytes(16).toString("hex");
            filenames.add(`/uploads/products/${filename}.${ext}`);
            fs.writeFile(
              path.join(
                __dirname,
                `../../../public/uploads/products/${filename}.${ext}`
              ),
              buffer,
              (err) => {
                if (err) {
                  return res
                    .status(400)
                    .json(
                      loc === "english"
                        ? `image number ${index + 1} not added`
                        : `图片编号${index + 1}未添加`
                    );
                }
                console.log("image added");
              }
            );
          });
          const uniqueFilenames = Array.from(filenames);

          const product = new Product({
            seller: req.seller.id,
            locale: locale && locale,
            currency: currency && currency,
            currencyCode: currencyCode && currencyCode,
            shipping: shipping && shipping,
            name: tradeName && tradeName,
            title: transTitle.text,
            optionsLevel: 3,
            keywords: {
              seller: keywords.trim(),
              en: transKeywords.text.trim(),
            },
            titles: {
              seller: adjTitle,
            },
            condition: {
              en: enCondition,
              zh: zhCondition,
            },
            description: transDesc.text,
            descriptions: {
              seller: adjDesc,
            },
            firstOptions: {
              attribute: {
                en: prod && prod.firstOptions.attribute.en,
                seller: prod && prod.firstOptions.attribute.seller
              },
              options: prod && prod.firstOptions.options
            },
            secondOptions: {
              attribute: {
                en: prod && prod.secondOptions.attribute.en,
                seller: prod && prod.secondOptions.attribute.seller
              },
              options: prod && prod.secondOptions.options
            },
            thirdOptions: {
              attribute: {
                en: transSeparatorProperty.text,
                seller: separatorProperty
              },
              options: propertiesArrayResults
            },
            weight: singleWeight,
            quantity: singleQuantity,
            firstOptionProductRef: prod && prod.firstOptionProductRef,
            secondOptionProductRef: optionsRef,
            thirdOptionProductRef: propertiesArrayResults[propIndex] && propertiesArrayResults[propIndex].productRef,
            slides: uniqueFilenames,
            price: singlePrice,
            category: {
              categoryTitle: {
                en: enCategoryTitle,
                zh: zhCategoryTitle,
              },
              subCategory: {
                subCategoryTitle: {
                  en: enSubCategoryTitle,
                  zh: zhSubCategoryTitle,
                },
                groupTitle: {
                  en: enGroupTitle,
                  zh: zhGroupTitle,
                },
              },
            },
          });

          const newProd = await product.save();
          return (
            newProd
          )
        });
        keyWordArray.forEach(
          async (en) =>
            await Keyword.findOneAndUpdate(
              { 
                en,
                "category.en": enCategoryTitle,
                "category.zh": zhCategoryTitle
              },
              {
                $set: {
                  en,
                  "category.en": enCategoryTitle,
                  "category.zh": zhCategoryTitle
                },
              },
              { new: true, upsert: true }
            )
        );
        await prod.remove();
        const productsArrayResults = await Promise.all(prods)
        res.json(productsArrayResults)
      }

      else if (optionsLevel === 3) {
        const prods = properties.split(";").map(async (prop, propIndex) => {
          let filenames = new Set();
          const propsArr = prop.split(",");
          const singleTitle = propsArr[0].trim();
          const singlePrice = propsArr[1].trim();
          const singleWeight = propsArr[2].trim();
          const singleQuantity = propsArr[3].trim();
          const adjTitle = `${sellerTitle} - ${singleTitle}`;
          const adjDesc = `${separatorProperty}: ${singleTitle}, ${sellerDescriptions}`;

          const transTitle = await translate(adjTitle, { to: "en" });
          const transSeparatorProperty = await translate(separatorProperty, {
            to: "en",
          });
          const transDesc = await translate(adjDesc, { to: "en" });

          images.forEach((img, index) => {
            const matches = img.match(regex);
            const ext = matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");
            const filename = crypto.randomBytes(16).toString("hex");
            filenames.add(`/uploads/products/${filename}.${ext}`);
            fs.writeFile(
              path.join(
                __dirname,
                `../../../public/uploads/products/${filename}.${ext}`
              ),
              buffer,
              (err) => {
                if (err) {
                  return res
                    .status(400)
                    .json(
                      loc === "english"
                        ? `image number ${index + 1} not added`
                        : `图片编号${index + 1}未添加`
                    );
                }
                console.log("image added");
              }
            );
          });
          const uniqueFilenames = Array.from(filenames);

          const product = new Product({
            seller: req.seller.id,
            locale: locale && locale,
            currency: currency && currency,
            currencyCode: currencyCode && currencyCode,
            shipping: shipping && shipping,
            name: tradeName && tradeName,
            title: transTitle.text,
            optionsLevel: 4,
            keywords: {
              seller: keywords.trim(),
              en: transKeywords.text.trim(),
            },
            titles: {
              seller: adjTitle,
            },
            condition: {
              en: enCondition,
              zh: zhCondition,
            },
            description: transDesc.text,
            descriptions: {
              seller: adjDesc,
            },
            firstOptions: {
              attribute: {
                en: prod && prod.firstOptions.attribute.en,
                seller: prod && prod.firstOptions.attribute.seller
              },
              options: prod && prod.firstOptions.options
            },
            secondOptions: {
              attribute: {
                en: prod && prod.secondOptions.attribute.en,
                seller: prod && prod.secondOptions.attribute.seller
              },
              options: prod && prod.secondOptions.options
            },
            thirdOptions: {
              attribute: {
                en: prod && prod.thirdOptions.attribute.en,
                seller: prod && prod.thirdOptions.attribute.seller
              },
              options: prod && prod.thirdOptions.options
            },
            fourthOptions: {
              attribute: {
                en: transSeparatorProperty.text,
                seller: separatorProperty
              },
              options: propertiesArrayResults
            },
            weight: singleWeight,
            quantity: singleQuantity,
            firstOptionProductRef: prod && prod.firstOptionProductRef,
            secondOptionProductRef: prod && prod.secondOptionProductRef,
            thirdOptionProductRef: optionsRef,
            fourthOptionProductRef: propertiesArrayResults[propIndex] && propertiesArrayResults[propIndex].productRef,
            slides: uniqueFilenames,
            price: singlePrice,
            category: {
              categoryTitle: {
                en: enCategoryTitle,
                zh: zhCategoryTitle,
              },
              subCategory: {
                subCategoryTitle: {
                  en: enSubCategoryTitle,
                  zh: zhSubCategoryTitle,
                },
                groupTitle: {
                  en: enGroupTitle,
                  zh: zhGroupTitle,
                },
              },
            },
          });

          const newProd = await product.save();
          return (
            newProd
          )
        });
        keyWordArray.forEach(
          async (en) =>
            await Keyword.findOneAndUpdate(
              { 
                en,
                "category.en": enCategoryTitle,
                "category.zh": zhCategoryTitle
              },
              {
                $set: {
                  en,
                  "category.en": enCategoryTitle,
                  "category.zh": zhCategoryTitle
                },
              },
              { new: true, upsert: true }
            )
        );
        await prod.remove();
        const productsArrayResults = await Promise.all(prods)
        res.json(productsArrayResults)
      }

      else {
        res.status(500).json(loc === "english" ? "Invalid Parameters" : "无效的参数");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json(loc === "english" ? "Server Error" : "服务器错误");
    }
  }
);

// @route    PUT api/products/:id
// @desc     Update a product
// @access   Private
router.put("/:id", sellerAuth, async (req, res) => {
  let filenames = new Set();
  const {
    title,
    weight,
    price,
    quantity,
    description,
    productImages,
    loc,
    keywords,
  } = req.body;
  const enCategory = req.body.enCategory.split("&amp;").join("&");
  const zhCategory = req.body.zhCategory.split("&amp;").join("&");
  const prod = await Product.findById(req.params.id);

  // Check for ObjectId format and product
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !prod) {
    return res
      .status(404)
      .json(loc === "english" ? "Product not found" : "找不到产品");
  }

  // Check user
  if (prod.seller.toString() !== req.seller.id) {
    return res
      .status(401)
      .json(loc === "english" ? "Unauthorized seller" : "卖方未经授权");
  }

  const prodPrice = prod.price

  prod.slides.forEach((img, index) =>
    fs.unlink(path.join(__dirname, `../../../public${img}`), (err) => {
      if (err) {
        return res
          .status(400)
          .json(
            loc === "english"
              ? `Could not update image number ${index + 1}`
              : `无法更新图片编号${index + 1}`
          );
      }
      console.log(`Image number ${index + 1} deleted`);
    })
  );

  const transTitle = await translate(title, { to: "en" });
  const transDesc = await translate(description, { to: "en" });
  const transKeywords = await translate(keywords, { to: "en" });
  const keyWordArray = transKeywords.text
    .split(",")
    .map((word) => word.trim().toLowerCase());

  const images = productImages
    .split("|")
    .map((img) => img.split("&#x2F;").join("/"));

  try {
    images.forEach((img, index) => {
      const regex = /^data:.+\/(.+);base64,(.*)$/;
      const matches = img.match(regex);
      const ext = matches[1];
      const data = matches[2];
      const buffer = Buffer.from(data, "base64");
      const filename = crypto.randomBytes(16).toString("hex");
      filenames.add(`/uploads/products/${filename}.${ext}`);
      fs.writeFile(
        path.join(
          __dirname,
          `../../../public/uploads/products/${filename}.${ext}`
        ),
        buffer,
        (err) => {
          if (err) {
            return res
              .status(400)
              .json(
                loc === "english"
                  ? `image number ${index + 1} not added`
                  : `图片编号$ {index + 1}未添加`
              );
          }
          console.log("image added");
        }
      );
    });
    const uniqueFilenames = Array.from(filenames);
    const updProd = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: transTitle.text,
          keywords: {
            seller: keywords.trim(),
            en: transKeywords.text.trim(),
          },
          oldPrice: prodPrice && (price === prodPrice ? null : prodPrice),
          priceChange: prodPrice && (price - prodPrice),
          scaledPriceChange: prodPrice && ((price - prodPrice) / prodPrice),
          quantity,
          slides: uniqueFilenames,
          price,
          weight,
          description: transDesc.text,
          descriptions: {
            seller: description,
          },
          titles: {
            seller: title,
          },
        },
      },
      { new: true }
    );
    keyWordArray.forEach(
      async (en) =>
        await Keyword.findOneAndUpdate(
          { 
            en,
            "category.en": enCategory,
            "category.zh": zhCategory
          },
          {
            $set: {
              en,
              "category.en": enCategory,
              "category.zh": zhCategory
            },
          },
          { new: true, upsert: true }
        )
    );
    res.json(updProd);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(loc === "english" ? "Server Error" : "服务器错误");
  }
});

// @route    GET api/products/all_products/product_count/count
// @desc     Get products count
// @access   Public
router.get("/all_products/product_count/count", async (req, res) => {
  try {
    const totalItems = await Product.find().countDocuments();
    res.json(totalItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    GET api/products/:seller_id/:page
// @desc     Get all seller products
// @access   Public
router.get("/:seller_id/:page", async (req, res) => {
  const page = +req.params.page;
  try {
    const products = await Product.aggregate([
      { $match: { seller: mongoose.Types.ObjectId(req.params.seller_id) } },
      { $sort: { date: -1 } },
      { $skip: (page - 1) * ITEMS_PER_PAGE },
      {
        $limit: ITEMS_PER_PAGE,
      },
    ]);
    const totalItems = await Product.aggregate([
      { $match: { seller: mongoose.Types.ObjectId(req.params.seller_id) } },
      {
        $count: "pages",
      },
    ]);
    const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
    res.json({ products, pages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    GET api/products/category_products/all/only_categories/categories/:category
// @desc     Get all category products
// @access   Public
router.get(
  "/category_products/all/only_categories/categories/:category",
  async (req, res) => {
    try {
      const products = await Product.find({
        "category.categoryTitle.en": req.params.category,
      })
        .limit(ITEMS_PER_PAGE)
        .sort({
          date: -1,
        });
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  }
);

// @route    POST api/products/sub_category_products/categories/:category/:sub_category/:page
// @desc     Get all category sub category products
// @access   Public
router.post(
  "/sub_category_products/categories/:category/:sub_category/:page",
  async (req, res) => {
    const { loc } = req.body
    const page = +req.params.page;
    try {
      const products = await Product.find({
        [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category,
        [loc === "english" ? "category.subCategory.subCategoryTitle.en" : "category.subCategory.subCategoryTitle.zh"]: req.params.sub_category,
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({
          date: -1,
        });
      const totalItems = await Product.find({
        [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category,
        [loc === "english" ? "category.subCategory.subCategoryTitle.en" : "category.subCategory.subCategoryTitle.zh"]: req.params.sub_category,
      }).countDocuments();
      const pages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      res.json({ products, pages });
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  }
);

// @route    POST api/products/specific/:category/:sub_category/:group/:page
// @desc     Get all category sub category and group products
// @access   Public
router.post(
  "/specific/:category/:sub_category/:group/:page",
  async (req, res) => {
    const page = +req.params.page;
    const { loc } = req.body;
    try {
      const products = await Product.aggregate([
        {
          $match: {
            [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category,
            [loc === "english" ? "category.subCategory.subCategoryTitle.en" : "category.subCategory.subCategoryTitle.zh"]: req.params.sub_category,
            [loc === "english" ? "category.subCategory.groupTitle.en" : "category.subCategory.groupTitle.zh"]: req.params.group,
          },
        },
        { $sort: { date: -1 } },
        { $skip: (page - 1) * ITEMS_PER_PAGE },
        {
          $limit: ITEMS_PER_PAGE,
        },
      ]);
      const totalItems = await Product.aggregate([
        {
          $match: {
            [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category,
            [loc === "english" ? "category.subCategory.subCategoryTitle.en" : "category.subCategory.subCategoryTitle.zh"]: req.params.sub_category,
            [loc === "english" ? "category.subCategory.groupTitle.en" : "category.subCategory.groupTitle.zh"]: req.params.group,
          },
        },
        {
          $count: "pages",
        },
      ]);
      const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
      res.json({ products, pages });
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  }
);

// @route    GET api/products/options/:seller_id/:multiple_ref
// @desc     Get all single product options
// @access   Public
router.get("/options/:seller_id/:multiple_ref", async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          seller: mongoose.Types.ObjectId(req.params.seller_id),
          multipleRef: req.params.multiple_ref,
        },
      },
      { $sort: { title: 1 } },
      {
        $project: {
          _id: 1,
          description: 1,
        },
      },
    ]);

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    POST api/products/id_or_not
// @desc     Get single product
// @access   Public
router.post("/id_or_not", async (req, res) => {
  const { firstOptionProductRef,
    secondOptionProductRef,
    thirdOptionProductRef,
    fourthOptionProductRef, id } = req.body
  try {
    if (firstOptionProductRef &&
      secondOptionProductRef &&
      thirdOptionProductRef &&
      fourthOptionProductRef && !id) {
      const product = await Product.findOne({
        firstOptionProductRef,
        secondOptionProductRef,
        thirdOptionProductRef,
        fourthOptionProductRef
      });

      // Check for ObjectId format and post
      if (!product) {
        return res.status(404).json("Product not found");
      }

      res.json(product._doc);
    }

    else if (firstOptionProductRef &&
      secondOptionProductRef &&
      thirdOptionProductRef && !fourthOptionProductRef && !id) {
      const product = await Product.findOne({
        firstOptionProductRef,
        secondOptionProductRef,
        thirdOptionProductRef
      });

      // Check for ObjectId format and post
      if (!product) {
        return res.status(404).json("Product not found");
      }

      res.json(product._doc);
    }

    else if (firstOptionProductRef &&
      secondOptionProductRef && !thirdOptionProductRef && !fourthOptionProductRef && !id) {
      const product = await Product.findOne({
        firstOptionProductRef,
        secondOptionProductRef
      });

      // Check for ObjectId format and post
      if (!product) {
        return res.status(404).json("Product not found");
      }

      res.json(product._doc);
    }

    else if (firstOptionProductRef && !secondOptionProductRef && !thirdOptionProductRef && !fourthOptionProductRef && !id) {
      const product = await Product.findOne({ firstOptionProductRef });

      // Check for ObjectId format and post
      if (!product) {
        return res.status(404).json("Product not found");
      }

      res.json(product._doc);
    }

    else {
      const product = await Product.findById(id);

      // Check for ObjectId format and post
      if (!id.match(/^[0-9a-fA-F]{24}$/) || !product) {
        return res.status(404).json("Product not found");
      }
      res.json(product);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete("/:id", sellerAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !product) {
      return res.status(404).json("找不到产品");
    }

    // Check user
    if (product.seller.toString() !== req.seller.id) {
      return res.status(401).json("卖方未经授权");
    }

    product.slides.forEach((img, index) =>
      fs.unlink(path.join(__dirname, `../../../public${img}`), (err) => {
        if (err) {
          return res
            .status(400)
            .json(`无法删除图片编号${index + 1}`
            );
        }
        console.log(`Image number ${index + 1} deleted`);
      })
    );

    if (product.firstOptionProductRef && product.optionsLevel === 1) {
      const ref = product.firstOptionProductRef
      const sellerProds = await Product.find({ seller: req.seller.id })
      const optArray = sellerProds.filter(doc => doc._id.toString() !== product._id.toString())
      .filter(prod => prod.firstOptions.options[prod.firstOptions.options
      .map((item) => item.productRef).indexOf(ref)])
      if (optArray.length <= 0) {
        await product.remove()

        res.json("Product removed")
      } else {
        optArray.forEach(async (refProd) => {
        const actualProd = await Product.findById(refProd._id);

        // Get remove index
        const removeIndex = actualProd.firstOptions.options
        .map((item) => item.productRef)
        .indexOf(ref);
        actualProd.firstOptions.options.splice(removeIndex, 1);

        await actualProd.save();
      })
      await product.remove();

      res.json("产品已移除");
      }
    } else if (product.secondOptionProductRef && product.firstOptionProductRef && product.optionsLevel === 2) {
      const sellerProds = await Product.find({ seller: req.seller.id })
      const ref = product.secondOptionProductRef
      const firstRef = product.firstOptionProductRef

      const optArray = sellerProds.filter(doc => doc._id.toString() !== product._id.toString())
      .filter(pro => pro.secondOptionProductRef).filter(pro => pro.optionsLevel === 2)
      .filter(prod => prod.secondOptions.options[prod.secondOptions.options
      .map((item) => item.productRef).indexOf(ref)])  
      if (optArray <= 0) {
        const firstOptArray = sellerProds.filter(doc => doc._id.toString() !== product._id.toString())
        .filter(pro => pro.firstOptionProductRef).filter(pro => pro.optionsLevel === 1)
        .filter(prod => prod.firstOptions.options[prod.firstOptions.options
        .map((item) => item.productRef).indexOf(firstRef)])
        if (firstOptArray.length > 0) {
          firstOptArray.forEach(async (refProd) => {
            const actualProd = await Product.findById(refProd._id);
    
            // Get remove index
            const removeIndex = actualProd.firstOptions.options
            .map((item) => item.productRef)
            .indexOf(firstRef);
    
            actualProd.firstOptions.options.splice(removeIndex, 1);
            await actualProd.save();
          })
          await product.remove()
  
          res.json("Product removed")
        } else {
          await product.remove()

          res.json("Product removed")
        }
      } else {
        optArray.forEach(async (refProd) => {
        const actualProd = await Product.findById(refProd._id);

        // Get remove index
        const removeIndex = actualProd.secondOptions.options
        .map((item) => item.productRef)
        .indexOf(ref);

        actualProd.secondOptions.options.splice(removeIndex, 1);
        await actualProd.save();
      })
      await product.remove();

      res.json("产品已移除");
      }
    } else if (product.secondOptionProductRef && product.firstOptionProductRef && product.thirdOptionProductRef && product.optionsLevel === 3) {
      const ref = product.thirdOptionProductRef
      const secondRef = product.secondOptionProductRef
      const sellerProds = await Product.find({ seller: req.seller.id })
      
      const optArray = sellerProds.filter(doc => doc._id.toString() !== product._id.toString())
      .filter(pro => pro.thirdOptionProductRef).filter(pro => pro.optionsLevel === 3)
      .filter(prod => prod.thirdOptions.options[prod.thirdOptions.options
      .map((item) => item.productRef).indexOf(ref)])
      if (optArray <= 0) {
        const secondOptArray = sellerProds.filter(doc => doc._id.toString() !== product._id.toString())
        .filter(pro => pro.secondOptionProductRef).filter(pro => pro.optionsLevel === 2)
        .filter(prod => prod.secondOptions.options[prod.secondOptions.options
        .map((item) => item.productRef).indexOf(secondRef)])
        if (secondOptArray.length > 0) {
          secondOptArray.forEach(async (refProd) => {
            const actualProd = await Product.findById(refProd._id);
    
            // Get remove index
            const removeIndex = actualProd.secondOptions.options
            .map((item) => item.productRef)
            .indexOf(secondRef);
    
            actualProd.secondOptions.options.splice(removeIndex, 1);
            await actualProd.save();
          })
          await product.remove()
  
          res.json("Product removed")
        } else {
          await product.remove()

          res.json("Product removed")
        }
      } else {
        optArray.forEach(async (refProd) => {
          const actualProd = await Product.findById(refProd._id);
  
          // Get remove index
          const removeIndex = actualProd.thirdOptions.options
          .map((item) => item.productRef)
          .indexOf(ref);
  
          actualProd.thirdOptions.options.splice(removeIndex, 1);
  
          await actualProd.save();
        })
        await product.remove();
  
        res.json("产品已移除");
      }
    } else if (product.secondOptionProductRef && product.firstOptionProductRef && product.thirdOptionProductRef && product.fourthOptionProductRef && product.optionsLevel === 4) {
      const ref = product.fourthOptionProductRef
      const thirdRef = product.thirdOptionProductRef
      const sellerProds = await Product.find({ seller: req.seller.id })

      const optArray = sellerProds.filter(doc => doc._id.toString() !== product._id.toString())
      .filter(pro => pro.fourthOptionProductRef).filter(pro => pro.optionsLevel === 4)
      .filter(prod => prod.fourthOptions.options[prod.fourthOptions.options
      .map((item) => item.productRef).indexOf(ref)])
      if (optArray <= 0) {
        const thirdOptArray = sellerProds.filter(doc => doc._id.toString() !== product._id.toString())
        .filter(pro => pro.thirdOptionProductRef).filter(pro => pro.optionsLevel === 3)
        .filter(prod => prod.thirdOptions.options[prod.thirdOptions.options
        .map((item) => item.productRef).indexOf(thirdRef)])
        if (thirdOptArray.length > 0) {
          thirdOptArray.forEach(async (refProd) => {
            const actualProd = await Product.findById(refProd._id);
    
            // Get remove index
            const removeIndex = actualProd.thirdOptions.options
            .map((item) => item.productRef)
            .indexOf(thirdRef);
    
            actualProd.thirdOptions.options.splice(removeIndex, 1);
            await actualProd.save();
          })
          await product.remove()
  
          res.json("Product removed")
        } else {
          await product.remove()

          res.json("Product removed")
        }
      } else {
        optArray.forEach(async (refProd) => {
          const actualProd = await Product.findById(refProd._id);
  
          // Get remove index
          const removeIndex = actualProd.fourthOptions.options
          .map((item) => item.productRef)
          .indexOf(ref);
  
          actualProd.fourthOptions.options.splice(removeIndex, 1);
          await actualProd.save();
        })
        await product.remove();
  
        res.json("产品已移除");
      }
    } else {
      await product.remove();

      res.json("产品已移除");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("服务器错误");
  }
});

// @route    POST api/products/auto-complete-products-results/:page
// @desc     Auto complete products results
// @access   Public
router.post("/auto-complete-products-results/:page", async (req, res) => {
  const page = +req.params.page;
  try {
    const results = await Product.aggregate([
      {
        $search: {
          autocomplete: {
            path: "title",
            query: req.body.content,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1,
              maxExpansions: 256,
            },
          },
        },
      },
      { $skip: (page - 1) * ITEMS_PER_PAGE },
      {
        $project: {
          _id: 1,
          slides: 1,
          seller: 1,
          name: 1,
          title: 1,
          description: 1,
          price: 1,
        },
      },
      {
        $limit: ITEMS_PER_PAGE,
      },
    ]);
    const totalItems = await Product.aggregate([
      {
        $search: {
          autocomplete: {
            path: "title",
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
        $count: "pages",
      },
    ]);
    const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
    res.json({ results, pages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route    POST api/products/auto-complete-category/:category
// @desc     Auto complete products within category
// @access   Public
router.post("/auto-complete-category/:category", async (req, res) => {
  const { content, loc } = req.body
  try {
    const results = await Product.aggregate([
      {
        $search: {
          autocomplete: {
            path: "title",
            query: content,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1,
              maxExpansions: 256,
            },
          },
        },
      },
      { $match: { [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category } },
      {
        $project: {
          title: 1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    POST api/products/auto-complete-category-results/:category/:page
// @desc     Auto complete products within category
// @access   Public
router.post(
  "/auto-complete-category-results/:category/:page",
  async (req, res) => {
    const page = +req.params.page;
    const { content, loc } = req.body
    try {
      const results = await Product.aggregate([
        {
          $search: {
            autocomplete: {
              path: "title",
              query: content,
              fuzzy: {
                maxEdits: 1,
                prefixLength: 1,
                maxExpansions: 256,
              },
            },
          },
        },
        { $match: { [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category } },
        { $skip: (page - 1) * ITEMS_PER_PAGE },
        {
          $project: {
            _id: 1,
            slides: 1,
            seller: 1,
            name: 1,
            title: 1,
            description: 1,
            price: 1,
          },
        },
        {
          $limit: ITEMS_PER_PAGE,
        },
      ]);
      const totalItems = await Product.aggregate([
        {
          $search: {
            autocomplete: {
              path: "title",
              query: content,
              fuzzy: {
                maxEdits: 1,
                prefixLength: 1,
                maxExpansions: 256,
              },
            },
          },
        },
        { $match: { [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category } },
        {
          $count: "pages",
        },
      ]);
      const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
      res.json({ results, pages });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// @route    POST api/products/auto-complete-seller/:seller_id
// @desc     Auto complete products within seller
// @access   Public
router.post("/auto-complete-seller/:seller_id", async (req, res) => {
  try {
    const results = await Product.aggregate([
      {
        $search: {
          autocomplete: {
            path: "title",
            query: req.body.content,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1,
              maxExpansions: 256,
            },
          },
        },
      },
      { $match: { seller: mongoose.Types.ObjectId(req.params.seller_id) } },
      {
        $project: {
          title: 1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route    POST api/products/auto-complete-seller-results/:seller_id/:page
// @desc     Auto complete products within seller
// @access   Public
router.post(
  "/auto-complete-seller-results/:seller_id/:page",
  async (req, res) => {
    const page = +req.params.page;
    try {
      const results = await Product.aggregate([
        {
          $search: {
            autocomplete: {
              path: "title",
              query: req.body.content,
              fuzzy: {
                maxEdits: 1,
                prefixLength: 1,
                maxExpansions: 256,
              },
            },
          },
        },
        { $match: { seller: mongoose.Types.ObjectId(req.params.seller_id) } },
        { $skip: (page - 1) * ITEMS_PER_PAGE },
        {
          $project: {
            _id: 1,
            slides: 1,
            seller: 1,
            name: 1,
            title: 1,
            price: 1,
          },
        },
        {
          $limit: ITEMS_PER_PAGE,
        },
      ]);
      const totalItems = await Product.aggregate([
        {
          $search: {
            autocomplete: {
              path: "title",
              query: req.body.content,
              fuzzy: {
                maxEdits: 1,
                prefixLength: 1,
                maxExpansions: 256,
              },
            },
          },
        },
        { $match: { seller: mongoose.Types.ObjectId(req.params.seller_id) } },
        {
          $count: "pages",
        },
      ]);
      const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
      res.json({ results, pages });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// @route    POST api/products/search-products/:page
// @desc     Search products
// @access   Public
router.post(
  "/search-products/:page",
  [check("content", "This field is required").not().isEmpty().escape()],
  async (req, res) => {
    const page = +req.params.page;
    try {
      const results = await Product.aggregate([
        {
          $search: {
            index: "SearchIndex1",
            text: {
              query: req.body.content,
              path: "keywords.en",
            },
          },
        },
        { $skip: (page - 1) * ITEMS_PER_PAGE },
        {
          $project: {
            _id: 1,
            slides: 1,
            seller: 1,
            name: 1,
            title: 1,
            description: 1,
            price: 1,
          },
        },
        {
          $limit: ITEMS_PER_PAGE,
        },
      ]);
      const totalItems = await Product.aggregate([
        {
          $search: {
            index: "SearchIndex1",
            text: {
              query: req.body.content,
              path: "keywords.en",
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
      res.status(500).json(err.message);
    }
  }
);

// @route    POST api/products/search-category-products/:category/:page
// @desc     Search category products
// @access   Public
router.post(
  "/search-category-products/:category/:page",
  [check("content", "This field is required").not().isEmpty().escape()],
  async (req, res) => {
    const page = +req.params.page;
    const { loc } = req.body
    try {
      const results = await Product.aggregate([
        {
          $search: {
            index: "SearchIndex1",
            text: {
              query: req.body.content,
              path: "title",
            },
          },
        },
        { $match: { [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category } },
        { $skip: (page - 1) * ITEMS_PER_PAGE },
        {
          $project: {
            _id: 1,
            slides: 1,
            seller: 1,
            name: 1,
            title: 1,
            description: 1,
            price: 1,
          },
        },
        {
          $limit: ITEMS_PER_PAGE,
        },
      ]);
      const totalItems = await Product.aggregate([
        {
          $search: {
            index: "SearchIndex1",
            text: {
              query: req.body.content,
              path: "title",
            },
          },
        },
        { $match: { [loc === "english" ? "category.categoryTitle.en" : "category.categoryTitle.zh"]: req.params.category } },
        {
          $count: "pages",
        },
      ]);
      const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
      res.json({ results, pages });
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  }
);

// @route    POST api/products/search-seller-products/:seller_id/:page
// @desc     Search seller products
// @access   Public
router.post(
  "/search-seller-products/:seller_id/:page",
  [check("content", "This field is required").not().isEmpty().escape()],
  async (req, res) => {
    const page = +req.params.page;
    try {
      const results = await Product.aggregate([
        {
          $search: {
            index: "SearchIndex1",
            text: {
              query: req.body.content,
              path: "title",
            },
          },
        },
        { $match: { seller: mongoose.Types.ObjectId(req.params.seller_id) } },
        { $skip: (page - 1) * ITEMS_PER_PAGE },
        {
          $project: {
            _id: 1,
            slides: 1,
            seller: 1,
            name: 1,
            title: 1,
            price: 1,
          },
        },
        {
          $limit: ITEMS_PER_PAGE,
        },
      ]);
      const totalItems = await Product.aggregate([
        {
          $search: {
            index: "SearchIndex1",
            text: {
              query: req.body.content,
              path: "title",
            },
          },
        },
        { $match: { seller: mongoose.Types.ObjectId(req.params.seller_id) } },
        {
          $count: "pages",
        },
      ]);
      const pages = Math.ceil(totalItems[0].pages / ITEMS_PER_PAGE);
      res.json({ results, pages });
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  }
);

module.exports = router;
