import React, { useState, useRef } from "react";

const accordionData = [
  {
    title: "Can you provide customized designs or special sizes?",
    content: "Yes, we can arrange custom patterns, digital prints, or special sizes depending on manufacturer availability & MOQ."
  },
  {
    title: "How do I maintain and clean tiles?",
    content: "Regular cleaning with mild detergent (floor cleaner) and water is sufficient. Avoid harsh acids to maintain shine and longevity."
  },
  {
    title: "Do you provide tiles for both residential and commercial projects?",
    content: "Yes. We supply tiles for homes, offices, hotels, showrooms, industrial spaces, real-estate & projects."
  },
  {
    title: "Which size I can use for my living area?",
    content: "We have different available size for living are like 24×48 & 48×72. If your room area is Extra large then you may use bigger XL size to minimise the joints & for asthetic looks"
  },
  {
    title: "are you providing return or replacement policy?",
    content: "We replace goods only in case of manufacturing defects, as per company terms. Breakage during customer handling is not covered."
  },
    {
    title: "Do you have ready stock available?",
    content: "Yes, we maintain large ready stock of fast-moving designs and can arrange special orders as per requirement."
  },
     {
    title: "Can you help with tile selection?",
    content: "Absolutely. We guide our customers based on budget, design, space measurement, colour theme, and usage to help choose the perfect tiles."
  },
     {
    title: "Do you offer wholesale and bulk rates?",
    content: "Yes. We provide wholesale pricing for builders, architects, contractors, and retailers, along with bulk order discounts."
  },
  
];

const FeatureSection = () => {
  const [activeIndex, setActiveIndex] = useState(1); // first open like Divi
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-[#111] text-white py-10 md:py-15 lg:py-20">
   
        {/* Right Accordion */}
        <div className="app-container space-y-5 acoordition">
                 <h2 className="uppercase text-center mb-8">Frequently Asked Questions (FAQs)</h2>
          {accordionData.map((item, index) => (
            <div key={index} className="border-b pb-3">
              
              {/* Button */}
              <button
                className="flex justify-between items-center w-full text-lg font-light py-3 faq"
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
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default FeatureSection;
