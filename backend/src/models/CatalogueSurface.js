import mongoose from "mongoose";

const catalogueSurfaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CatalogueSurface", catalogueSurfaceSchema);
