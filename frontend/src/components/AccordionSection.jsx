import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const AccordionSection = () => {
  const [activeIndex, setActiveIndex] = useState(1); // first open by default
  const contentRefs = useRef([]);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const accordionData = [
    {
      heading: "DESIGNING BEYOND TRENDS",
      description:
        "Every tile begins with an idea to create something timeless. Our design process blends creativity with purpose ensuring each piece enhances the space it belongs to.",
    },
    {
      heading: "MATERIALS THAT SPEAK QUALITY",
      description:
        "From the first stage of sourcing to the final touch our materials are selected to perform and last. The strength and texture of each surface tell a story of reliability",
    },
    {
      heading: "EVOLVING WITH TECHNOLOGY",
      description:
        "We use modern methods and digital innovation to improve precision and design flexibility creating products that adapt to the needs of today’s spaces",
    },
    {
      heading: "INSPIRED BY REAL SPACES",
      description:
        "Every collection is shaped by the way people live move and create. Our designs bring warmth structure and balance to homes offices and open environments alike.",
    },
  ];

  // 👉 Make Right Images Equal Height to Accordion
  useEffect(() => {
    if (containerRef.current && imageRef.current) {
      imageRef.current.style.height = containerRef.current.clientHeight + "px";
    }
  });

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-[#111] text-white py-16">
      <div
        className="app-container grid grid-cols-1 lg:grid-cols-2 gap-10"
        ref={containerRef}  // track accordion height
      >

        {/* LEFT — ACCORDION */}
        <div>
          <h2 className="text-3xl md:text-4xl font-light mb-5 uppercase">
            DEFINING EXCELLENCE IN EVERY TILE WE CREATE
          </h2>

          {accordionData.map((item, index) => (
            <div key={index} className="border-b py-3">

              {/* Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full py-2 text-left"
              >
                <span className="text-xl font-light tracking-wide uppercase">
                  {item.heading}
                </span>

                <span className="p-2 rounded-full border border-gray-500">
                  {activeIndex === index ? <FiMinus size={16} /> : <FiPlus size={16} />}
                </span>
              </button>

              {/* Smooth Auto Height Accordion */}
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  height:
                    activeIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                }}
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.45,0.05,0.2,1.00)]"
              >
                <p className="text-gray-300 text-base leading-relaxed pb-3 pr-8">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — TWO IMAGES STACKED */}
       {/* RIGHT — TWO IMAGES STACKED ON MOBILE & SIDE BY SIDE ON DESKTOP */}
<div className="flex flex-col md:flex-row gap-5 h-full!" ref={imageRef}>
  
  {/* First Image — lower start */}
  <img
    src="/images/image-14.png"
    alt="img1"
    className="rounded-lg object-cover w-full md:w-1/2 h-[400px] lg:mt-10"
  />

  {/* Second Image — normal */}
  <img
    src="/images/image-15.png"
    alt="img2"
    className="rounded-lg object-cover w-full md:w-1/2 h-[400px]"
  />

</div>


      </div>
    </section>
  );
};

export default AccordionSection;
