import React, { useState } from "react";
import toast from "react-hot-toast";

const CareerForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  console.log(BACKEND_URL);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/career`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Application submitted!");
        setFile(null);
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Server error.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full bg-[#1e1e1e] text-white py-16">
      <div className="app-container">
        <h2 className="text-3xl mb-6 uppercase royal-heading">Career</h2>

        <form onSubmit={handleSubmit} className="space-y-7 flex flex-col">

          <label className="block text-md">Drop Your CV</label>

          {/* Hidden file input */}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            id="cvUpload"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          {/* Custom button */}
          <label
            htmlFor="cvUpload"
            className="cursor-pointer w-fit px-6 py-3 rounded-md 
            bg-linear-to-r from-blue-600 to-cyan-400 text-white 
            hover:opacity-90 transition"
          >
            Choose File
          </label>

          {/* Show selected filename */}
          {file && (
            <p className="text-sm text-gray-300">
              Selected: <span className="text-white">{file.name}</span>
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-fit bg-linear-to-r from-blue-600 to-cyan-400 
            text-white px-6 py-3 rounded-md disabled:opacity-50 transition"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CareerForm;
