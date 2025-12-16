import React, { useEffect, useState } from "react";
import {
  createCatalogueSurface,
  getCatalogueSurfaces,
  updateCatalogueSurface,
  deleteCatalogueSurface,
} from "../api/catalogueApi";

const CatalogueSurfaces = () => {
  const [surfaces, setSurfaces] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSurfaces = async () => {
    const res = await getCatalogueSurfaces();
    setSurfaces(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSurfaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateCatalogueSurface(editingId, { name });
      setEditingId(null);
    } else {
      await createCatalogueSurface({ name });
    }

    setName("");
    fetchSurfaces();
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Catalogue Surfaces</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter surface name"
          className="flex-1 border px-4 py-2 rounded"
        />
        <button className="px-5 py-2 bg-black text-white rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-2">
        {surfaces.map((surface) => (
          <li
            key={surface._id}
            className="border px-4 py-2 rounded flex justify-between"
          >
            {surface.name}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingId(surface._id);
                  setName(surface.name);
                }}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCatalogueSurface(surface._id).then(fetchSurfaces)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogueSurfaces;
