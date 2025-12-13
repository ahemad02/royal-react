import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    featureImage: {
      type: String, // URL
      required: true,
    },

    gallery: [
      {
        type: String, // image URLs
      },
    ],

    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
      },
    ],

    surfaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Surface",
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    faces: {
      type: String, // "FACE - 08"
    },

    view360Link: {
      type: String, // URL
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
