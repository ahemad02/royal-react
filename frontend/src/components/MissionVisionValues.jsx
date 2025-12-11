import React from "react";

const MissionVisionValues = () => {
  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-3 text-center relative">

          {/* OUR MISSION */}
          <div className="px-6 pb-12 md:py-10 relative md:border-r md:border-[#1e1e1e]">
            <img src="/images/image-16.png" alt="mission" className="mx-auto w-14 mb-5" />

            <h3 className="text-xl font-semibold tracking-wide mb-5">
              OUR MISSION
            </h3>

            <p className="text-gray-600 leading-relaxed">
              To build a brand that delivers trust and excellence through every tile creating lasting value with quality craftsmanship and thoughtful design.
            </p>

            {/* Vertical Divider (Right) */}
            <span className="hidden md:block absolute right-0 top-0 h-full w-1px bg-gray-300"></span>
          </div>

          {/* OUR VISION */}
          <div className="px-6 pb-12 md:py-10 relative md:border-r md:border-[#1e1e1e]">
            <img src="/images/image-17.png" alt="vision" className="mx-auto w-14 mb-5" />

            <h3 className="text-xl font-semibold tracking-wide mb-5">
              OUR VISION
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Our vision to offering high quality and affordable collection that bring beauty and value to every space.
            </p>

            {/* Divider */}
            <span className="hidden md:block absolute right-0 top-0 h-full w-1px bg-gray-300"></span>
          </div>

          {/* OUR VALUE */}
          <div className="px-6 md:py-10">
            <img src="/images/image-18.png" alt="value" className="mx-auto w-14 mb-5" />

            <h3 className="text-xl font-semibold tracking-wide mb-5">
              OUR VALUE
            </h3>

            <p className="text-gray-600 leading-relaxed">
              We believe in integrity innovation and excellence ensuring that every product reflects our commitment to quality and long term customer satisfaction.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
