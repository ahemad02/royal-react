import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ title, subtitle, image, breadcrumb = [] }) => {
  return (
    <div
      className="w-full h-[300px] md:h-[500px] flex items-end relative text-white"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     {/* Overlay behind text */}
      <div className="relative z-10 container mx-auto px-6 text-center pb-5">
        <div className="inline-block bg-black/10 rounded-md">

          {/* Breadcrumb */}
          <p className="text-xs md:text-sm mb-1">
            {breadcrumb.map((item, index) => (
              <span key={index}>
                {item.link ? (
                  <Link to={item.link} className="hover:underline text-[16px]!">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {index !== breadcrumb.length - 1 && " / "}
              </span>
            ))}
          </p>

          {/* Title */}
          <h1 className="text-lg md:text-4xl! font-light tracking-wide uppercase text-shadow-md">
            {title}
          </h1>

        </div>
      </div>
    </div>
  );
};

export default Banner;
