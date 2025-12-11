import React from 'react'

const ImageText = () => {
  return (
    <section className="w-full px-4 py-20 flex justify-center behind-image">
      <div
        className="app-container h-[450px] md:h-[700px] bg-cover bg-center relative 
        rounded-b-[40px] rounded-sm"
        style={{
          backgroundImage: `url('/images/SCOTWOOD-GREY.jpg')`,
        }}
      >

        {/* DARK FADE IF YOU NEED READABILITY */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/10"></div>

        {/* TEXT BLOCK */}
        <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 py-5">
          <h3 className="text-white! text-lg md:text-5xl font-light max-w-5xl leading-tight capitalize! highlight-text">
            With Refined Surfaces Versatile Sizes And Long Lasting Durability,
            Royal Floor Has Become A Trusted Name In Premium Tiles
          </h3> 

          <p className="mt-6 text-[#5a2020] text-md md:text-lg max-w-3xl font-light">
            From design to delivery our focus stays on consistency honesty and customer satisfaction.
            That’s what makes Royal Floor a name people trust not just for how our tiles look but for how they last.
          </p>
        </div>

      </div>
    </section>
  );
}

export default ImageText