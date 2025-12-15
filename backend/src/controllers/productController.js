import Product from "../models/Product.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      sizes,
      surfaces,
      category,
      faces,
      view360Link,
    } = req.body;

    // 1️⃣ Check duplicate title
    const existingProduct = await Product.findOne({
      title: title.trim(),
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product with this title already exists",
      });
    }

    // Feature image
    const featureImage = req.files?.featureImage
      ? await uploadToCloudinary(
          req.files.featureImage[0].buffer,
          "products/feature"
        )
      : null;

    // Gallery images
    const gallery = [];
    if (req.files?.gallery) {
      for (const file of req.files.gallery) {
        const url = await uploadToCloudinary(
          file.buffer,
          "products/gallery"
        );
        gallery.push(url);
      }
    }

    // 2️⃣ Validation
    if (
      !title ||
      !sizes ||
      !surfaces ||
      !category ||
      !faces ||
      !view360Link
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!featureImage) {
      return res.status(400).json({ message: "Feature image is required" });
    }

    if (gallery.length === 0) {
      return res.status(400).json({
        message: "At least one gallery image is required",
      });
    }

    // 3️⃣ Create product
    const product = await Product.create({
      title,
      featureImage,
      gallery,
      sizes,
      surfaces,
      category,
      faces,
      view360Link,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      size,
      surface,
      category,
    } = req.query;

    const filter = { isActive: true };

if (size) filter.sizes = { $in: [size] };
if (surface) filter.surfaces = { $in: [surface] };
if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("sizes", "name")
        .populate("surfaces", "name")
        .populate("category", "name")
        .sort({ title: 1 })
        .skip(skip)
        .limit(Number(limit)),

      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* ================= GET SINGLE PRODUCT ================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("sizes", "name")
      .populate("surfaces", "name")
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Invalid product ID" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      title,
      sizes,
      surfaces,
      category,
      faces,
      view360Link,
    } = req.body;

    if (req.body.isActive !== undefined) {
  product.isActive = req.body.isActive;
}

if (req.body.existingGallery) {
  product.gallery = JSON.parse(req.body.existingGallery);
}

    if (title) product.title = title;
    if (sizes) product.sizes = sizes;
    if (surfaces) product.surfaces = surfaces;
    if (category) product.category = category;
    if (faces) product.faces = faces;
    if (view360Link) product.view360Link = view360Link;

    // Replace feature image
    if (req.files?.featureImage) {
      product.featureImage = await uploadToCloudinary(
        req.files.featureImage[0].buffer,
        "products/feature"
      );
    }

    // Append gallery images
    if (req.files?.gallery) {
      for (const file of req.files.gallery) {
        const url = await uploadToCloudinary(
          file.buffer,
          "products/gallery"
        );
        product.gallery.push(url);
      }
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

