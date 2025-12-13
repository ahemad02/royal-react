import Size from "../models/Size.js";

export const createSize = async (req, res) => {
  try {
    const size = await Size.create(req.body);
    res.status(201).json(size);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSizes = async (req, res) => {
  const sizes = await Size.find().sort({ _id: 1 });
  res.json(sizes);
};

export const updateSize = async (req, res) => {
  const size = await Size.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(size);
};

/* DELETE */
export const deleteSize = async (req, res) => {
  await Size.findByIdAndDelete(req.params.id);
  res.json({ message: "Size deleted" });
};