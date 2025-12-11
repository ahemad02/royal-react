import React, { useState, useRef } from "react";

const accordionData = [
  {
    title: "VARIETY OF SIZES AND FORMATS",
    content: "Our tiles are available in multiple sizes from subway to XXL slab giving flexibility to create balanced space from compact areas to large open layouts."
  },
  {
    title: "SUSTAINABLE APPROACH",
    content: "We choose materials and methods that are perfectly safe for the environment and help reduce waste in the best way in production."
  },
  {
    title: "RELIABLE QUALITY",
    content: "Every product is carefully made and tested to ensure long lasting performance strength and a consistent finish across all collections."
  },
  {
    title: "PURPOSEFUL SURFACES",
    content: "Royal Floor durable surfaces are made to handle everyday use. We maintain a clean stylish appearance for years providing you with long lasting quality you can trust."
  },
  {
    title: "ENDLESS DESIGN OPTIONS",
    content: "We combine new generation materials with thoughtful design to deliver better performance and a polished attractive look."
  }
];

const FeatureSection = () => {
  const [activeIndex, setActiveIndex] = useState(1); // first open like Divi
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-[#111] text-white py-10 md:py-15 lg:py-20">
      <div className="app-container flex flex-col lg:flex-row gap-5 md:gap-10 items-stretch">
        
        {/* Left Image */}
        <div className="w-full lg:w-1/2 h-full">
          <img
            src="/images/END_FLORA-GARNET.jpg"
            alt="Tile"
            className="w-full h-full md:min-h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Accordion */}
        <div className="w-full lg:w-1/2 space-y-5 acoordition">
          {accordionData.map((item, index) => (
            <div key={index} className="border-b pb-3">
              
              {/* Button */}
              <button
                className="flex justify-between items-center w-full text-lg font-light py-3"
                onClick={() => toggleAccordion(index)}
              >
                <h4>{item.title}</h4>
                <img
                  src={activeIndex === index ? "/images/minus.png" : "/images/plus.png"}
                  alt="toggle"
                  className="w-4"
                />
              </button>

              {/* Smooth Divi-Style Auto Animate */}
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  height:
                    activeIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                }}
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.43,0.13,0.23,0.96)]"
              >
                <div className="pt-2 pb-4 pr-6">
                  <p className="text-gray-300 text-md leading-relaxed">
                    {item.content}
                  </p>

                  <button className="w-full pr-10 mt-5 text-md tracking-wide flex justify-start items-center line">
                    See All
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;
