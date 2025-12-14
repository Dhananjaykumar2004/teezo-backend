import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },

  // Men / Women / Kids
  category: { type: String, required: true },

  // Topwear / Bottomwear / Winterwear
  subCategory: { type: String, required: true },

  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },

  // NEW: navbar-related fields
  // which main menu group this product belongs to (TOPS / BOTTOMS / none)
  menuGroup: {
    type: String,
    enum: ["tops", "bottoms", "none"],
    default: "none",
  },

  // which item in that group (hoodies, pants, vest, etc.)
  menuItem: {
    type: String,
    default: "",
  },

  // NEW: tags for sections like NEW ARRIVALS, BASICS, CLEARANCE
  // e.g. ["new"], ["basic"], ["clearance"]
  tags: {
    type: [String],
    default: [],
  },

  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
