import React, { useState } from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

const allProducts = [
  {
    id: 1,
    title: "ALTO GREY",
    image: "/images/Alto-Grey.jpg",
    size: "24x48",
    surface: "Matt",
    category: "Porcelain Tiles",
  },
  {
    id: 2,
    title: "CAFE END",
    image: "/images/cafe-end.jpg",
    size: "24x48",
    surface: "Glossy",
    category: "Porcelain XXL Tiles",
  },
  {
    id: 3,
    title: "CALACATA GOLD",
    image: "/images/CULCUTTA-GOLD.jpg",
    size: "48x72",
    surface: "High Glossy",
    category: "Porcelain Tiles",
  },
  {
    id: 4,
    title: "CALACATTA AVERIO",
    image: "/images/CALACATTA-AVERIO.jpg",
    size: "12x24",
    surface: "Super White",
    category: "Woode Plank Porcelain",
  },
];

const sizeOptions = ["8x48", "12x24", "24x48", "48x72"];
const surfaceOptions = [
  "Glossy",
  "High Glossy",
  "Super White",
  "Matt",
  "Carving Matt",
  "Wooden",
  "Rusty Matt",
];
const categoryOptions = [
  "Porcelain Tiles",
  "Porcelain XXL Tiles",
  "Woode Plank Porcelain",
];

const Product = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSurface, setSelectedSurface] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Helps highlight active tab
  const activeFilter =
    selectedSize || selectedSurface || selectedCategory ? "FILTERED" : "ALL";

  const filteredProducts = allProducts.filter((item) => {
    return (
      (selectedSize ? item.size === selectedSize : true) &&
      (selectedSurface ? item.surface === selectedSurface : true) &&
      (selectedCategory ? item.category === selectedCategory : true)
    );
  });

  return (
    <div>
      <Banner
        title="Product"
        image="/images/CALYPSO-GRIGIO.jpg"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Product", link: "/product" },
        ]}
      />

      <div className="bg-[#1e1e1e] text-white py-14 px-6">
        <h2 className="text-center text-3xl font-bold mb-8 tracking-wide">
          OUR PRODUCTS
        </h2>
        {/* FILTER TABS */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {/* ALL */}
          <button
            onClick={() => {
              setSelectedSize("");
              setSelectedSurface("");
              setSelectedCategory("");
            }}
            className={`
              px-8 py-3 rounded-lg border transition-all duration-300
              ${
                activeFilter === "ALL"
                  ? "bg-white text-black scale-105 shadow-lg"
                  : "border-white text-white hover:bg-white/20 hover:scale-105"
              }
            `}
          >
            ALL
          </button>

          {/* SIZE DROPDOWN (HOVER) */}
          <div className="relative group">
            <button
              className={`px-8 py-3 rounded-lg border transition-all duration-300
              ${
                selectedSize
                  ? "bg-white text-black scale-105 shadow-lg"
                  : "border-white text-white hover:bg-white/20 hover:scale-105"
              }
              `}
            >
              {selectedSize || "SIZES"} ▼
            </button>

            {/* Hover Dropdown */}
            <div
              className="absolute left-0 mt-2 bg-[#1e1e1e] text-white rounded shadow-lg w-44 opacity-0 invisible
                         group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
            >
              {sizeOptions.map((sz) => (
                <div
                  key={sz}
                  className="px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer text-lg"
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </div>
              ))}
            </div>
          </div>

          {/* SURFACE DROPDOWN */}
          <div className="relative group">
            <button
              className={`px-8 py-3 rounded-lg border transition-all duration-300 
              ${
                selectedSurface
                  ? "bg-white text-black scale-105 shadow-lg"
                  : "border-white text-white hover:bg-white/20 hover:scale-105"
              }
              `}
            >
              {selectedSurface || "SURFACES"} ▼
            </button>

            <div
              className="absolute left-0 mt-2 bg-[#1e1e1e] text-white rounded shadow-lg w-44 opacity-0 invisible
                         group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
            >
              {surfaceOptions.map((sf) => (
                <div
                  key={sf}
                  className="px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer text-lg"
                  onClick={() => setSelectedSurface(sf)}
                >
                  {sf}
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORY DROPDOWN */}
          <div className="relative group">
            <button
              className={`px-8 py-3 rounded-lg border transition-all duration-300
              ${
                selectedCategory
                  ? "bg-white text-black scale-105 shadow-lg"
                  : "border-white text-white hover:bg-white/20 hover:scale-105"
              }
              `}
            >
              {selectedCategory || "PRODUCT"} ▼
            </button>

            <div
              className="absolute left-0 mt-2 bg-[#1e1e1e] text-white rounded shadow-lg w-44 opacity-0 invisible
                         group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
            >
              {categoryOptions.map((cat) => (
                <div
                  key={cat}
                  className="px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer text-lg"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 app-container">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="text-center group cursor-pointer">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg shadow-lg aspect-[0.85] object-cover transition-all duration-300 group-hover:scale-105"
                />
                <h6 className="mt-3 text-lg text-left">{product.title}</h6>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
