import React, { useState } from "react";

const images = [
  "/images/image-21.png",
  "/images/image-23.png",
  "/images/image-22.png",
  "/images/image-24.png",
];

export default function ManufacturingSection() {
  const [activeImg, setActiveImg] = useState(null);

  return (
    <div className="app-container py-10! sm:py-16! text-left">
      <h2 className="text-[26px]! md:text-[32px]! mb-8 font-semibold tracking-[2px] text-black!">
        SMART SUSTAINABLE & SUPERIOR MANUFACTURING
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1360px] mx-auto">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImg(img)}
            className="cursor-pointer"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full max-h-[370px] object-cover rounded-xl shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Popup */}
      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-9999 cursor-zoom-out"
        >
          <img
            src={activeImg}
            alt="preview"
            className="w-[90%] max-w-[900px] rounded-lg animate-fadeZoom"
          />
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeZoom {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeZoom {
          animation: fadeZoom 0.3s ease;
        }
      `}</style>
    </div>
  );
}
