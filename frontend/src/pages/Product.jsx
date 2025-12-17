import React, { useEffect, useMemo, useState } from "react";
import Banner from "../components/Banner";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../admin/api/productApi";
import { getCategories, getSizes, getSurfaces } from "../admin/api/metaApi";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sizes, setSizes] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL
  const initialSizeName = searchParams.get("size") || "";
  const initialSurfaceName = searchParams.get("surface") || "";
  const initialCategoryName = searchParams.get("category") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [selectedSize, setSelectedSize] = useState(initialSizeName);
  const [selectedSurface, setSelectedSurface] = useState(initialSurfaceName);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryName);
  const [page, setPage] = useState(initialPage);

  const [totalPages, setTotalPages] = useState(1);
  const [animateIn, setAnimateIn] = useState(false);


  // Fetch meta data
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [sizeRes, surfaceRes, categoryRes] = await Promise.all([
          getSizes(),
          getSurfaces(),
          getCategories(),
        ]);
        setSizes(sizeRes.data);
        setSurfaces(surfaceRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Failed to load filters", error);
      }
    };
    fetchMeta();
  }, []);

  // After meta data loads, convert URL names to IDs
  useEffect(() => {
    if (sizes.length && surfaces.length && categories.length) {
      const sizeObj = sizes.find((s) => s.name === selectedSize);
      const surfaceObj = surfaces.find((s) => s.name === selectedSurface);
      const categoryObj = categories.find((c) => c.name === selectedCategory);

      if (sizeObj) setSelectedSize(sizeObj._id);
      if (surfaceObj) setSelectedSurface(surfaceObj._id);
      if (categoryObj) setSelectedCategory(categoryObj._id);
    }
  }, [sizes, surfaces, categories]);

  // Fetch products based on filters & page
useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    setAnimateIn(false);

    try {
      const res = await getProducts({
        page,
        limit: 12,
        size: selectedSize || undefined,
        surface: selectedSurface || undefined,
        category: selectedCategory || undefined,
      });

      setProducts(res.data.products.filter((p) => p.isActive));
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimateIn(true), 50); // small delay = smoother
    }
  };

  fetchProducts();
}, [page, selectedSize, selectedSurface, selectedCategory]);


  // Sync state → URL
  useEffect(() => {
    const params = {};

    if (selectedSize) {
      const sizeObj = sizes.find((s) => s._id === selectedSize);
      if (sizeObj) params.size = sizeObj.name;
    }

    if (selectedSurface) {
      const surfaceObj = surfaces.find((s) => s._id === selectedSurface);
      if (surfaceObj) params.surface = surfaceObj.name;
    }

    if (selectedCategory) {
      const categoryObj = categories.find((c) => c._id === selectedCategory);
      if (categoryObj) params.category = categoryObj.name;
    }

    if (page && page > 1) params.page = page;

    setSearchParams(params);
  }, [
    page,
    selectedSize,
    selectedSurface,
    selectedCategory,
    sizes,
    surfaces,
    categories,
  ]);

  // Options for dropdowns
  const sizeOptions = useMemo(
    () => sizes.map((s) => ({ id: s._id, name: s.name })),
    [sizes]
  );
  const surfaceOptions = useMemo(
    () => surfaces.map((s) => ({ id: s._id, name: s.name })),
    [surfaces]
  );
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ id: c._id, name: c.name })),
    [categories]
  );

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e]">
      <div className="h-16 w-16 rounded-full border-4 border-white/30 border-t-white animate-spin" />
    </div>
  );
}


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

      <div className="bg-[#1e1e1e] text-white py-14">
        <h2 className="text-center text-3xl font-bold mb-8 tracking-wide">
          OUR PRODUCTS
        </h2>

        {/* FILTER TABS */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => {
              setPage(1);
              setSelectedSize("");
              setSelectedSurface("");
              setSelectedCategory("");
            }}
            className={`px-8 py-3 rounded-lg border ${
              !selectedSize && !selectedSurface && !selectedCategory
                ? "bg-white text-black"
                : "bg-transparent text-white"
            }`}
          >
            ALL
          </button>

          <FilterDropdown
            label="SIZES"
            value={sizes.find((s) => s._id === selectedSize)?.name}
            options={sizeOptions}
            onSelect={(opt) => {
              setPage(1);
              setSelectedSize(opt.id);
            }}
          />

          <FilterDropdown
            label="SURFACES"
            value={surfaces.find((s) => s._id === selectedSurface)?.name}
            options={surfaceOptions}
            onSelect={(opt) => {
              setPage(1);
              setSelectedSurface(opt.id);
            }}
          />

          <FilterDropdown
            label="PRODUCT"
            value={categories.find((c) => c._id === selectedCategory)?.name}
            options={categoryOptions}
            onSelect={(opt) => {
              setPage(1);
              setSelectedCategory(opt.id);
            }}
          />
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 app-container">
     {products.map((product, index) => (
  <Link
    to={`/product/${product._id}?${searchParams.toString()}`}
    key={product._id}
  >
    <div
      className={`text-center group cursor-pointer transition-all duration-500 ease-out
        ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: `${index * 60}ms` }} // stagger effect
    >
      <img
        src={product.featureImage}
        alt={product.title}
        className="rounded-lg shadow-lg aspect-[0.85] object-cover transition-all duration-300 group-hover:scale-105"
      />
      <h6 className="mt-3 text-lg text-left">{product.title}</h6>
    </div>
  </Link>
))}

        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 border rounded ${
                  page === i + 1 ? "bg-white text-black" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {products.length === 0 && (
          <p className="text-center mt-10 text-gray-400">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Product;

// REUSABLE DROPDOWN
const FilterDropdown = ({ label, value, options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const isActive = !!value;

  return (
    <div
      className="relative group"
      onMouseLeave={() => setOpen(false)} // close when mouse leaves (desktop)
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`px-8 py-3 rounded-lg border flex items-center gap-2 ${
          isActive ? "bg-white text-black" : "bg-transparent text-white"
        }`}
      >
        {value || label}
        <span
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute left-0 mt-1 w-44 z-20 rounded shadow-lg bg-[#1e1e1e]
          transition-all duration-200
          ${
            open
              ? "opacity-100 visible scale-100"
              : "opacity-0 invisible scale-95"
          }
          group-hover:opacity-100
          group-hover:visible
          group-hover:scale-100
        `}
      >
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`px-5 py-3 cursor-pointer hover:bg-[#3a3a3a] ${
              value === opt.name ? "bg-white text-black" : ""
            }`}
            onClick={() => {
              onSelect(opt);
              setOpen(false); // close after selection
            }}
          >
            {opt.name}
          </div>
        ))}
      </div>
    </div>
  );
};
