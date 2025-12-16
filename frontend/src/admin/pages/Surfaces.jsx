import { useEffect, useState } from "react";
import {
  getSurfaces,
  createSurface,
  updateSurface,
  deleteSurface,
} from "../api/surfaceApi";

const Surfaces = () => {
  const [surfaces, setSurfaces] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSurfaces = async () => {
    try {
      setLoading(true);
      const res = await getSurfaces();
      setSurfaces(res.data);
    } catch {
      setError("Failed to load surfaces");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurfaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await updateSurface(editingId, { name });
      } else {
        await createSurface({ name });
      }

      setName("");
      setEditingId(null);
      fetchSurfaces();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    }
  };

  const handleEdit = (surface) => {
    setName(surface.name);
    setEditingId(surface._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this surface?")) return;

    try {
      await deleteSurface(id);
      fetchSurfaces();
    } catch {
      setError("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-gray-500">
        Loading surfaces...
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800!">
        Surfaces
      </h2>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="e.g. Glossy"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <ul className="divide-y">
        {surfaces.map((surface) => (
          <li
            key={surface._id}
            className="flex items-center justify-between py-3"
          >
            <span className="text-gray-800">{surface.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(surface)}
                className="px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(surface._id)}
                className="px-3 py-1 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100"
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

export default Surfaces;
