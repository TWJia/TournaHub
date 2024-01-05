const NewsModel = require("../models/News");

const router = require("express").Router();

// this endpint will create the new news
router.post("/create", async (req, res) => {
  try {
    await NewsModel.create(req.body);
    res
      .status(200)
      .json({ message: "New news added successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding news", success: false });
  }
});

// this endpoint gets all the news from the database
router.get("/all", async (req, res) => {
  try {
    const news = await NewsModel.find();
    res.status(200).json({ message: news, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not fetch news", success: false });
  }
});

// this endpoint will get all the news of the specific category
router.get("/single/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const news = await NewsModel.find({ category });
    res.status(200).json({ message: news, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not fetch news", success: false });
  }
});

router.get("/byid/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await NewsModel.findById(newsId);
    res.status(200).json({ message: news, success: true });
  } catch (error) {
    res.status(500).json({ message: "could not fetch news", success: false });
  }
});

router.delete("/:newsId", async (req, res) => {
  const newsId = req.params.newsId;
  try {
    await NewsModel.findByIdAndDelete(newsId);
    res
      .status(200)
      .json({ message: "news deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not delete news", success: false });
  }
});

module.exports = router;
