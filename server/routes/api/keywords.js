const express = require("express");
const router = express.Router();
const Keyword = require("../../models/Keyword");

// @route    POST api/keywords/auto-complete
// @desc     Auto complete products
// @access   Public
router.post("/auto-complete", async (req, res) => {
    try {
      const results = await Keyword.aggregate([
        {
          $search: {
            autocomplete: {
              path: "en",
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
            en: 1,
            _id: 1,
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

module.exports = router;