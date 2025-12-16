import React, { useEffect, useState } from "react";
import {
  createCatalogueSize,
  getCatalogueSizes,
  updateCatalogueSize,
  deleteCatalogueSize,
} from "../api/catalogueApi";

const CatalogueSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSizes = async () => {
    try {
      const res = await getCatalogueSizes();
      setSizes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await updateCatalogueSize(editingId, { name });
        setEditingId(null);
      } else {
        await createCatalogueSize({ name });
      }

      setName("");
      fetchSizes();
    } catch {
      alert("Size already exists");
    }
  };

  const handleEdit = (size) => {
    setEditingId(size._id);
    setName(size.name);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this size?")) return;
    await deleteCatalogueSize(id);
    fetchSizes();
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Catalogue Sizes</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter size name"
          className="flex-1 border px-4 py-2 rounded"
        />
        <button className="px-5 py-2 bg-black text-white rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {sizes.map((size) => (
            <li
              key={size._id}
              className="border px-4 py-2 rounded flex justify-between items-center"
            >
              <span>{size.name}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(size)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(size._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CatalogueSizes;
