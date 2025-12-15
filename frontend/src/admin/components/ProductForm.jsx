import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { getSizes, getSurfaces, getCategories } from "../api/metaApi";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [sizes, setSizes] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [category, setCategory] = useState(null);
  const [faces, setFaces] = useState(initialData.faces || "");
  const [view360Link, setView360Link] = useState(initialData.view360Link || "");
  const [featureImage, setFeatureImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [existingGallery, setExistingGallery] = useState(
    initialData.gallery || []
  );
  const [isActive, setIsActive] = useState(
    initialData.isActive !== undefined ? initialData.isActive : true
  );

  const [sizeOptions, setSizeOptions] = useState([]);
  const [surfaceOptions, setSurfaceOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* FETCH DROPDOWN DATA */
  useEffect(() => {
    getSizes().then((res) =>
      setSizeOptions(res.data.map((i) => ({ label: i.name, value: i._id })))
    );
    getSurfaces().then((res) =>
      setSurfaceOptions(res.data.map((i) => ({ label: i.name, value: i._id })))
    );
    getCategories().then((res) =>
      setCategoryOptions(res.data.map((i) => ({ label: i.name, value: i._id })))
    );

    /* SET INITIAL VALUES (EDIT MODE) */
    if (initialData.sizes) {
      setSizes(initialData.sizes.map((s) => ({ label: s.name, value: s._id })));
    }
    if (initialData.surfaces) {
      setSurfaces(
        initialData.surfaces.map((s) => ({ label: s.name, value: s._id }))
      );
    }
    if (initialData.category) {
      setCategory({
        label: initialData.category.name,
        value: initialData.category._id,
      });
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select category");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("faces", faces);
      formData.append("view360Link", view360Link);
      formData.append("category", category.value);
      formData.append("isActive", isActive);

      sizes.forEach((s) => formData.append("sizes", s.value));
      surfaces.forEach((s) => formData.append("surfaces", s.value));

      if (featureImage) {
        formData.append("featureImage", featureImage);
      }

      gallery.forEach((img) => formData.append("gallery", img));

      await onSubmit(formData);

      toast.success("Product saved successfully");

      setTimeout(() => {
        navigate("/admin/products");
      }, 500);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-5 max-w-xl">
      {/* TITLE */}
      <input
        className="border p-2 w-full"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* CATEGORY */}
      <Select
        options={categoryOptions}
        value={category}
        onChange={setCategory}
        placeholder="Select Category"
      />

      {/* SIZES */}
      <Select
        isMulti
        options={sizeOptions}
        value={sizes}
        onChange={setSizes}
        placeholder="Select Sizes"
      />

      {/* SURFACES */}
      <Select
        isMulti
        options={surfaceOptions}
        value={surfaces}
        onChange={setSurfaces}
        placeholder="Select Surfaces"
      />

      {/* FACES */}
      <input
        className="border p-2 w-full"
        placeholder="Faces (FACE - 08)"
        value={faces}
        onChange={(e) => setFaces(e.target.value)}
      />

      {/* 360 LINK */}
      <input
        className="border p-2 w-full"
        placeholder="360 View Link"
        value={view360Link}
        onChange={(e) => setView360Link(e.target.value)}
      />

      {/* FEATURE IMAGE */}
      <div>
        <label className="block font-semibold mb-2">Feature Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFeatureImage(e.target.files[0])}
        />

        {/* Preview */}
        <div className="mt-3">
          {featureImage ? (
            <img
              src={URL.createObjectURL(featureImage)}
              className="h-32 object-cover border rounded"
            />
          ) : (
            initialData.featureImage && (
              <img
                src={initialData.featureImage}
                className="h-32 object-cover border rounded"
              />
            )
          )}
        </div>
      </div>

      {/* GALLERY IMAGES */}
      <div>
        <label className="block font-semibold mb-2">Gallery Images</label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setGallery([...e.target.files])}
        />

        {/* New Upload Preview */}
        {gallery.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-3">
            {gallery.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                className="h-24 w-24 object-cover border rounded"
              />
            ))}
          </div>
        )}

        {/* Existing Gallery (Edit Mode) */}
        {existingGallery.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-3">
            {existingGallery.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  className="h-24 w-24 object-cover border rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setExistingGallery(
                      existingGallery.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTIVE TOGGLE */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        Active
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 rounded text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        }`}
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
