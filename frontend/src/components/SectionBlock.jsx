import React from "react";

const SectionBlock = ({ title, image, description, className = "" }) => {
  return (
    <div className={`app-container py-10! md:py-20! text-center ${className}`}>
      {/* Title */}
      <h2 className="text-2xl text-black! md:text-3xl font-semibold l-height pb-3">
        {title}
      </h2>

      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full max-h-[600px] object-cover rounded-lg mb-4"
        />
      )}

      {/* Description */}
      <p className="leading-relaxed text-md md:text-lg">
        {description}
      </p>
    </div>
  );
};

export default SectionBlock;
