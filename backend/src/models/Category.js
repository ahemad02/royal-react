import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String, // e.g. "Porcelain Tiles"
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
