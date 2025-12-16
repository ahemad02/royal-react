import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";


export default function CatalogueForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    size: "",
    surface: "",
  });

  const [featureImage, setFeatureImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [sizes, setSizes] = useState([]);
  const [surfaces, setSurfaces] = useState([]);

useEffect(() => {
  const fetchMeta = async () => {
    try {
      const [sizesRes, surfacesRes] = await Promise.all([
        axios.get("/catalogue/catalogue-sizes"),
        axios.get("/catalogue/catalogue-surfaces"),
      ]);

      setSizes(sizesRes.data);
      setSurfaces(surfacesRes.data);
    } catch (err) {
      console.error("Failed to load catalogue meta", err);
    }
  };

  fetchMeta();

  if (id) {
    axios.get(`/catalogues/${id}`).then((res) => {
      setForm({
        name: res.data.name,
        size: res.data.size?._id || "",
        surface: res.data.surface?._id || "",
      });
    });
  }
}, [id]);



  const submitHandler = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("size", form.size);
    fd.append("surface", form.surface);

    if (featureImage) fd.append("featureImage", featureImage);
    if (pdfFile) fd.append("pdfFile", pdfFile);

    if (id) {
      await axios.put(`/catalogue/${id}`, fd);
    } else {
      await axios.post("/catalogue", fd);
    }

    navigate("/admin/catalogues");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Edit Catalogue" : "Add Catalogue"}
      </h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Catalogue Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Size</option>
          {sizes.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={form.surface}
          onChange={(e) => setForm({ ...form, surface: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Surface</option>
          {surfaces.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFeatureImage(e.target.files[0])}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Save Catalogue
        </button>
      </form>
    </div>
  );
}
