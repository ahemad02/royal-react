import Catalogue from "../models/Catalogue.js";
import CatalogueSize from "../models/CatalogueSize.js";
import CatalogueSurface from "../models/CatalogueSurface.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import mongoose from "mongoose";

/* ================= CREATE CATALOGUE ================= */
export const createCatalogue = async (req, res) => {
  try {
    const { name, size, surface } = req.body;

    if (!name || !size || !surface) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Catalogue.findOne({ name: name.trim() });
    if (exists) {
      return res.status(409).json({ message: "Catalogue already exists" });
    }

    // Feature Image
    if (!req.files?.featureImage) {
      return res.status(400).json({ message: "Feature image required" });
    }

    const featureImage = await uploadToCloudinary(
      req.files.featureImage[0].buffer,
      "catalogues/images"
    );

    // PDF File
    if (!req.files?.pdfFile) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const pdfFile = await uploadToCloudinary(
      req.files.pdfFile[0].buffer,
      "catalogues/pdfs",
      "raw" // 👈 VERY IMPORTANT
    );

    const catalogue = await Catalogue.create({
      name,
      featureImage,
      pdfFile,
      size,
      surface,
    });

    res.status(201).json(catalogue);
  } catch (error) {
    console.error("Create catalogue error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL CATALOGUES ================= */
export const getCatalogues = async (req, res) => {
  try {
    const { size, surface } = req.query;

    const filter = { isActive: true };

    if (size && mongoose.Types.ObjectId.isValid(size)) {
      filter.size = size;
    }

    if (surface && mongoose.Types.ObjectId.isValid(surface)) {
      filter.surface = surface;
    }

    const catalogues = await Catalogue.find(filter)
      .populate("size", "name")
      .populate("surface", "name")
      .sort({ createdAt: -1 });

    res.json(catalogues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET SINGLE CATALOGUE ================= */
export const getCatalogueById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid catalogue ID" });
    }

    const catalogue = await Catalogue.findById(req.params.id)
      .populate("size", "name")
      .populate("surface", "name");

    if (!catalogue) {
      return res.status(404).json({ message: "Catalogue not found" });
    }

    res.json(catalogue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE CATALOGUE ================= */
export const updateCatalogue = async (req, res) => {
  try {
    const catalogue = await Catalogue.findById(req.params.id);
    if (!catalogue) {
      return res.status(404).json({ message: "Catalogue not found" });
    }

    const { name, size, surface, isActive } = req.body;

    if (name) catalogue.name = name;
    if (size) catalogue.size = size;
    if (surface) catalogue.surface = surface;
    if (isActive !== undefined) catalogue.isActive = isActive;

    if (req.files?.featureImage) {
      catalogue.featureImage = await uploadToCloudinary(
        req.files.featureImage[0].buffer,
        "catalogues/images"
      );
    }

    if (req.files?.pdfFile) {
      catalogue.pdfFile = await uploadToCloudinary(
        req.files.pdfFile[0].buffer,
        "catalogues/pdfs",
        "raw"
      );
    }

    await catalogue.save();
    res.json(catalogue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE CATALOGUE ================= */
export const deleteCatalogue = async (req, res) => {
  try {
    await Catalogue.findByIdAndDelete(req.params.id);
    res.json({ message: "Catalogue deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* SIZES */
export const getCatalogueSizes = async (req, res) => {
  res.json(await CatalogueSize.find().sort({ name: 1 }));
};

export const createCatalogueSize = async (req, res) => {
  const size = await CatalogueSize.create({ name: req.body.name });
  res.status(201).json(size);
};

/* SURFACES */
export const getCatalogueSurfaces = async (req, res) => {
  res.json(await CatalogueSurface.find().sort({ name: 1 }));
};

export const createCatalogueSurface = async (req, res) => {
  const surface = await CatalogueSurface.create({ name: req.body.name });
  res.status(201).json(surface);
};

// SIZES
export const updateCatalogueSize = async (req, res) => {
  const size = await CatalogueSize.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(size);
};

export const deleteCatalogueSize = async (req, res) => {
  await CatalogueSize.findByIdAndDelete(req.params.id);
  res.json({ message: "Size deleted" });
};

// SURFACES
export const updateCatalogueSurface = async (req, res) => {
  const surface = await CatalogueSurface.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(surface);
};

export const deleteCatalogueSurface = async (req, res) => {
  await CatalogueSurface.findByIdAndDelete(req.params.id);
  res.json({ message: "Surface deleted" });
};

