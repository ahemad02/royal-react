import mongoose from "mongoose";

const catalogueSizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CatalogueSize", catalogueSizeSchema);
