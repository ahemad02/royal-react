import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String, // e.g. "24x48"
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Size", sizeSchema);
