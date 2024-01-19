const NewsModel = require("../models/News");
const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const CommentModel = require("../models/Comments");

// Multer upload images locations
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedfileType = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedfileType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
router.route("/create").post(upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;
    const category = req.body.category;
    const photo = req.file.filename;
    const user = req.params.id;

    const newNewsData = {
      title,
      author,
      content,
      category,
      photo,
      user,
    };

    const newNews = new NewsModel(newNewsData);
    await newNews.save();

    res.json({ message: "New Article Added" });
  } catch (error) {
    console.error("Error in /create route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/rec").get((req, res) => {
  NewsModel.find()
    .then((newss) => res.json(newss))
    .catch((err) => res.status(400).json("Error:" + err));
});

// this endpint will create the new news
// router.post("/create", async (req, res) => {
//   try {
//     await NewsModel.create(req.body);
//     res
//       .status(200)
//       .json({ message: "New news added successfully", success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error adding news", success: false });
//   }
// });

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

// this endpoint gets one news article that matches the search filter by title
router.get("/search/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const news = await NewsModel.find({
      title: { $regex: new RegExp(title, "i") },
    });
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

// Create a comment--------------------------------------------------------------------------
router.post("/create/:newsId", async (req, res) => {
  try {
    const { text, user } = req.body;
    const newsId = req.params.newsId;

    const newComment = new CommentModel({
      comments: text,
      user,
    });

    await newComment.save();

    // Add the comment to the corresponding news article
    await NewsModel.findByIdAndUpdate(
      newsId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    res.json({ comment: newComment, message: "Comment added successfully" });
  } catch (error) {
    console.error("Error in /create route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get comments for a specific news article
router.get("/:newsId", async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const news = await NewsModel.findById(newsId).populate(["comments"]);
    console.log("getting single news", news);
    res.json({ comments: news.comments });
  } catch (error) {
    console.error("Error in /:newsId route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a comment
router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  try {
    // Find the comment and get its associated newsId
    const comments = await CommentModel.findById(commentId);
    const newsId = comments.news;

    // Remove the comment from CommentModel
    await CommentModel.findByIdAndDelete(commentId);

    // Remove the comment reference from the corresponding news article
    await NewsModel.findByIdAndUpdate(
      newsId,
      { $pull: { comments: commentId } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "comment deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "could not delete comment", success: false });
  }
});

module.exports = router;
