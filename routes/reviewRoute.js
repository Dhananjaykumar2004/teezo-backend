import express from "express";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js"; // ✅ REQUIRED (registers schema)
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* ================= GET REVIEWS ================= */
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) /
      (reviews.length || 1);

    res.json({
      success: true,
      reviews,
      avgRating: Number(avgRating.toFixed(1)),
      totalReviews: reviews.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ================= ADD REVIEW ================= */
router.post("/:productId", authUser, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      product: req.params.productId,
      user: req.user._id,
      rating,
      comment,
    });

    res.json({ success: true, review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ================= LIKE / UNLIKE REVIEW ================= */
router.put("/like/:id", authUser, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false });
    }

    const alreadyLiked = review.likes.includes(req.user._id);

    if (alreadyLiked) {
      review.likes.pull(req.user._id);
    } else {
      review.likes.push(req.user._id);
    }

    await review.save();

    res.json({
      success: true,
      likes: review.likes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ================= DELETE REVIEW (ADMIN) ================= */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

export default router;
