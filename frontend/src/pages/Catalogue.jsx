import { useEffect, useMemo, useState, useRef } from "react";
import Banner from "../components/Banner";
import axios from "../admin/api/axios";
import { Eye, Download } from "lucide-react";
const AutoWidthSelect = ({ value, onChange, options, placeholder }) => {
  const selectRef = useRef(null);

  const adjustWidth = () => {
    if (!selectRef.current) return;

    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.font = window.getComputedStyle(selectRef.current).font;
    span.innerText =
      options.find((o) => o._id === value)?.name || placeholder || "";
    document.body.appendChild(span);

    selectRef.current.style.width = `${span.offsetWidth + 60}px`; // padding
    document.body.removeChild(span);
  };

  useEffect(() => {
    adjustWidth();
  }, [value, options]);

  const isActive = !!value; // active if a value is selected

  return (
    <select
      ref={selectRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-4 py-2 rounded border transition ${
        isActive
          ? "bg-[#f3c77b] text-black border-[#f3c77b]"
          : "bg-transparent text-white border-white"
      }`}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((s) => (
        <option key={s._id} value={s._id} className="bg-[#1e1e1e]">
          {s.name}
        </option>
      ))}
    </select>
  );
};


const Catalogue = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [surfaces, setSurfaces] = useState([]);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSurface, setSelectedSurface] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, sizeRes, surfaceRes] = await Promise.all([
          axios.get("/catalogue"),
          axios.get("/catalogue/catalogue-sizes"),
          axios.get("/catalogue/catalogue-surfaces"),
        ]);

        setCatalogues(catRes.data);
        setSizes(sizeRes.data);
        setSurfaces(surfaceRes.data);
      } catch (err) {
        console.error("Failed to load catalogue data", err);
      }
    };

    fetchData();
  }, []);

  /* FILTER LOGIC */
  const filteredCatalogues = useMemo(() => {
    return catalogues.filter((c) => {
      const sizeMatch = selectedSize ? c.size?._id === selectedSize : true;
      const surfaceMatch = selectedSurface
        ? c.surface?._id === selectedSurface
        : true;

      return sizeMatch && surfaceMatch;
    });
  }, [catalogues, selectedSize, selectedSurface]);

  return (
    <>
      <Banner
        title="Catalogue"
        image="/images/catalogue.png"
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Catalogue", link: "/catalogue" },
        ]}
      />

      <section className="bg-[#1c1c1c] text-white py-16">
        <div className="app-container">
          <h2 className="text-3xl font-light text-center mb-8 text-white!">
            OUR CATALOGUES
          </h2>

          {/* FILTER BAR */}
          <div className="flex justify-center gap-4 mb-14">
            <button
              onClick={() => {
                setSelectedSize("");
                setSelectedSurface("");
              }}
              className={`px-6 py-2 border rounded transition ${
                !selectedSize && !selectedSurface
                  ? "bg-[#f3c77b] text-black"
                  : "border-white hover:bg-white hover:text-black"
              }`}
            >
              ALL
            </button>

            <AutoWidthSelect
              value={selectedSize}
              onChange={setSelectedSize}
              options={sizes}
              placeholder="SIZES"
            />

            <AutoWidthSelect
              value={selectedSurface}
              onChange={setSelectedSurface}
              options={surfaces}
              placeholder="SURFACES"
            />
          </div>

          {/* CATALOGUE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCatalogues.map((cat) => (
              <div key={cat._id} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={cat.featureImage}
                    alt={cat.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium uppercase text-white!">
                    {cat.name}
                  </h3>

                  <div className="flex gap-3">
                    <a
                      href={cat.pdfFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Catalogue"
                      className="text-white hover:text-[#f3c77b] transition"
                    >
                      <Eye size={18} />
                    </a>

                    <a
                      href={cat.pdfFile}
                      download
                      title="Download Catalogue"
                      className="text-white hover:text-[#f3c77b] transition"
                    >
                      <Download size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCatalogues.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No catalogues found.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Catalogue;
