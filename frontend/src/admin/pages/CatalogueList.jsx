import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function CatalogueList() {
  const [catalogues, setCatalogues] = useState([]);

  const fetchCatalogues = async () => {
    const res = await axios.get("/catalogue");
    setCatalogues(res.data);
  };

  const deleteCatalogue = async (id) => {
    if (!window.confirm("Delete this catalogue?")) return;
    await axios.delete(`/catalogues/${id}`);
    fetchCatalogues();
  };

  useEffect(() => {
    fetchCatalogues();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-black!">Catalogues</h1>
        <Link
          to="/admin/catalogues/new"
          className="bg-black text-white px-4 py-2 rounded max-h-10 flex items-center"
        >
          + Add Catalogue
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Size</th>
              <th className="p-3">Surface</th>
              <th className="p-3">PDF</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {catalogues.map((cat) => (
              <tr key={cat._id} className="border-t">
                <td className="p-3">
                  <img
                    src={cat.featureImage}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-medium">{cat.name}</td>
                <td className="p-3 text-center">{cat.size?.name}</td>
                <td className="p-3 text-center">{cat.surface?.name}</td>

                <td className="p-3 text-center">
                  <a
                    href={cat.pdfFile}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>

                <td className="p-3 text-center space-x-2">
                  <Link
                    to={`/admin/catalogues/edit/${cat._id}`}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCatalogue(cat._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {catalogues.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No catalogues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
