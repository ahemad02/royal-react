import Product from "../models/Product.js";
import Size from "../models/Size.js";
import Surface from "../models/Surface.js";
import Category from "../models/Category.js";
import Admin from "../models/Admin.js";

/* =============================
   DASHBOARD STATS
============================= */
export const getDashboardStats = async (req, res) => {
  try {
    const [
      productCount,
      sizeCount,
      surfaceCount,
      categoryCount,
      adminCount,
    ] = await Promise.all([
      Product.countDocuments(),
      Size.countDocuments(),
      Surface.countDocuments(),
      Category.countDocuments(),
      Admin.countDocuments(),
    ]);

    res.json({
      products: productCount,
      sizes: sizeCount,
      surfaces: surfaceCount,
      categories: categoryCount,
      admins: adminCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 

export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title featureImage createdAt")
      .populate("category", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const productsByCategory = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          name: "$category.name",
          count: 1,
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const productsBySize = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $unwind: "$sizes" },
      {
        $group: {
          _id: "$sizes",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "sizes",
          localField: "_id",
          foreignField: "_id",
          as: "size",
        },
      },
      { $unwind: "$size" },
      {
        $project: {
          _id: 0,
          name: "$size.name",
          count: 1,
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const productsBySurface = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $unwind: "$surfaces" },
      {
        $group: {
          _id: "$surfaces",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "surfaces",
          localField: "_id",
          foreignField: "_id",
          as: "surface",
        },
      },
      { $unwind: "$surface" },
      {
        $project: {
          _id: 0,
          name: "$surface.name",
          count: 1,
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
