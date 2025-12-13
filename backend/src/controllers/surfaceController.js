import Surface from "../models/Surface.js";

export const createSurface = async (req, res) => {
  try {
    const surface = await Surface.create(req.body);
    res.status(201).json(surface);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSurfaces = async (req, res) => {
  const surfaces = await Surface.find().sort({ _id: 1 });
  res.json(surfaces);
};

export const updateSurface = async (req, res) => {
  const surface = await Surface.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(surface);
};

export const deleteSurface = async (req, res) => {
  await Surface.findByIdAndDelete(req.params.id);
  res.json({ message: "Surface deleted" });
};
