import mongoose from "mongoose";

const surfaceSchema = new mongoose.Schema(
  {
    name: {
      type: String, // e.g. "Glossy"
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Surface", surfaceSchema);
