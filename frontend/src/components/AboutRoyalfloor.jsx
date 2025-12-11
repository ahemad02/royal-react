import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Living Area",
    desc: "Our living area tiles bring strength and consistency offering a smooth surface that connects every part of your home.",
    img: "/images/40118_RYNESTONE.jpg",
  },
  {
    title: "BEDROOM Tiles",
    desc: "Our bedroom tiles offer a calm and balanced surface creating a peaceful space that stays easy to maintain over time.",
    img: "/images/STATUARIO-ORACLE.jpg",
  },
  {
    title: "Kitchen Tiles",
    desc: "Our kitchen tiles are made to handle daily use resisting stains and heat while keeping your cooking space fresh and tidy.",
    img: "/images/Flexo-Tech-Natural.jpg",
  },
  {
    title: "Bathroom Tiles",
    desc: "Our bathroom tiles are designed to resist moisture keeping your space clean and functional for everyday comfort.",
    img: "/images/TIBET-WOOD-BEIGE.jpg",
  },
];

export default function AboutRoyalFloor() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  const handleSlideChange = (swiper) => {
    setFade(true);
    setCurrent(swiper.realIndex); // FIX -> correct index on loop
    setTimeout(() => setFade(false), 400); // text fade duration
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-5 py-10 md:py-16">

      {/* TOP SECTION (unchanged) */}
      <div className="md:grid grid-cols-2 gap-10 mb-5 md:mb-16">
        <div>
          <h3 className="text-[25px]! sm:text-[30px]! font-light tracking-widest">About The Royal Floor</h3>
          <h2 className="text-[25px]! sm:text-[35px]! md:text-4xl font-semibold mt-3 text-[#1e1e1e]!">
            A HUB OF INNOVATION & ART
          </h2>
        </div>
        <div className="text-gray-700 leading-relaxed">
          <button className="w-full pr-10 mb-5 mt-5 md:mt-0 text-md tracking-wide flex justify-start md:justify-end items-center line">
            See All
          </button>
          <p>
            Royal Floor began with a clear purpose to redefine modern living through innovation in flooring solutions. Founded by a team with 20+ years of experience in production design and distribution the company brings together expertise that connects quality manufacturing with evolving lifestyle needs.
          </p>
          <p className="mt-4">
            We work with materials that are tested sourced responsibly and designed to perform not just to impress. We offer a diverse range of product that includes wall tiles floor tiles wooden panels parking tiles and more all crafted to meet global standards of durability and design. For us flooring isn’t a product It’s a standard we live by.
          </p>
        </div>
      </div>

      {/* BOTTOM — SLIDER SECTION */}
      <div className="md:flex items-end gap-5">

        {/* TEXT – 20% */}
        <div className="md:w-[30%] w-full mb-8 md:mb-0">
          <div
            className={`transition-opacity duration-500 md:pb-25 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <h2 className="text-[28px]! font-semibold mb-3 text-[#1e1e1e]!">
              {slides[current].title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {slides[current].desc}
            </p>
          </div>
        </div>

        {/* IMAGE SLIDER — 80% */}
        <div className="md:w-[70%] w-full">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            speed={900}
            onSlideChange={handleSlideChange}
            onSwiper={(swiper) => (window.mySwiper = swiper)}
            navigation={false}
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="w-full aspect-video overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* MODERN ARROWS BELOW SLIDER */}
          <div className="flex justify-start gap-4 mt-6">
            <button
              className="w-11 h-11 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white transition"
              onClick={() => window?.mySwiper?.slidePrev()}
            >
              ❮
            </button>
            <button
              className="w-11 h-11 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white transition"
              onClick={() => window?.mySwiper?.slideNext()}
            >
              ❯
            </button>
         
          </div>
             <button className="w-full pr-10 mt-5 text-md tracking-wide flex justify-start items-center line">
            See All
          </button>
        </div>
      </div>
    </section>
  );
}
