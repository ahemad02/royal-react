import { useEffect, useState } from "react";
import {
  getSizes,
  createSize,
  updateSize,
  deleteSize,
} from "../api/sizeApi";

const Sizes = () => {
  const [sizes, setSizes] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSizes = async () => {
    try {
      setLoading(true);
      const res = await getSizes();
      setSizes(res.data);
    } catch {
      setError("Failed to load sizes");
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
        await updateSize(editingId, { name });
      } else {
        await createSize({ name });
      }

      setName("");
      setEditingId(null);
      fetchSizes();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    }
  };

  const handleEdit = (size) => {
    setName(size.name);
    setEditingId(size._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this size?")) return;
    try {
      await deleteSize(id);
      fetchSizes();
    } catch {
      setError("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-gray-500">
        Loading sizes...
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800!">
        Sizes
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
          placeholder="e.g. 24x48"
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
        {sizes.map((size) => (
          <li
            key={size._id}
            className="flex items-center justify-between py-3"
          >
            <span className="text-gray-800">{size.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(size)}
                className="px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(size._id)}
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

export default Sizes;
