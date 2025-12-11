import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    img: "/images/MAKENZA-GREY.jpg",
    title: "The Rugged Craft of Stone & Wood",
  },
  {
    img: "/images/ENDLESS-COLBERT-ICE.jpg",
    title: "The Dramatic Fair Of Luxury & Art",
  },
  {
    img: "/images/MADRID-SILVER-MADRID-SHINE.jpg",
    title: "Crafting Wonders of Art",
  },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full min-h-screen relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={false}
        pagination={false}
        navigation={false}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-screen bg-cover bg-center flex items-end justify-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* TEXT WRAPPER WITH FADE + SLIDE */}
              <div
                className={`pb-12 transform transition-all duration-1200ms ${
                  currentIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <h2 className="text-white text-5xl font-light drop-shadow-xl tracking-wide dark-text">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
