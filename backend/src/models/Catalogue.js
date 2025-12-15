import mongoose from "mongoose";

const catalogueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    featureImage: {
      type: String,
      required: true,
    },

    pdfFile: {
      type: String,
      required: true,
    },

    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CatalogueSize",
      required: true,
    },

    surface: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CatalogueSurface",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Catalogue", catalogueSchema);
