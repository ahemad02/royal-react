import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const RoyalFloorGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // 👉 BIG IMAGES (top slider)
  const bigImages = [
    "/images/Alto-Grey.jpg",
    "/images/cafe-end.jpg",
    "/images/CALACATTA-AVERIO.jpg",
    "/images/CALYPSO-GRIGIO.jpg",
    "/images/CULCUTTA-GOLD.jpg",
    "/images/new-carara.jpg",
    "/images/END_POSCO-TEAL.jpg",
    "/images/END_FLORA-GARNET.jpg",
    "/images/END-IMPRESSA-BLACK.jpg",
    "/images/ONYX-MISTY.jpg",
    "/images/ENDLESS-TESSINO-VERDE.jpg",
    "/images/TIBET-WOOD-BEIGE.jpg",
  ];

  // 👉 THUMB IMAGES (bottom slider)
  const thumbImages = [
    "/images/ALTO-GREY-T1.jpg",
    "/images/5153_CAFE_END_P3-scaled.jpg",
    "/images/CALACATTA-AVERIO-R2-.jpg",
    "/images/CALYPSO-GRIGIO-R3-copy-1-rotated.jpg",
    "/images/CALACATA-GOLD_P1.jpg",
    "/images/112_NEW-CARARA_f8-1-scaled.jpg",
    "/images/END_POSCO-TEAL_R1-scaled.jpg",
    "/images/END-612-171N-_g4-_f6-scaled-1-rotated.jpg",
    "/images/END-IMPRESSA-BLACK-p4-scaled.jpg",
    "/images/ONYX-MISTY-R2.jpg",
    "/images/ENDLESS-TESSINO-VERDE-R3.jpg",
    "/images/TIBET-WOOD-BEIGE-F1-scaled.jpg",
  ];

  return (
    <section className="w-full py-10 md:py-20 bg-white">
      <div className="app-container">
        <h2 className="text-black! text-left text-4xl font-light mb-10">
          CREATE YOUR DREAM SPACE WITH ROYAL FLOOR
        </h2>

        {/* Top — Big Image Slider */}
        <Swiper
          modules={[Thumbs, Navigation, Autoplay, EffectFade]}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{ delay: 3000 }}
          loop={false}
          navigation={false}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800} // smoother transition speed
          className="rounded-xl overflow-hidden shadow-lg mb-8"
        >
          {bigImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt="Large View"
                className="w-full min-h-[300px] aspect-[calc(7)/2.5] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom — Thumbnail Slider */}
        {/* Bottom — Thumbnail Slider */}
        {/* Bottom — Thumbnail Slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={6}
          spaceBetween={15}
          loop={false}
          freeMode={true}
          slideToClickedSlide={true}
          centeredSlides={false}
          modules={[Thumbs]}
          watchSlidesProgress={true}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {thumbImages.map((img, i) => (
            <SwiperSlide
              key={`thumb-${i}`}
              onClick={() => {
                if (thumbsSwiper) thumbsSwiper.slideTo(i - 0); // 👈 FORCE SHIFT
              }}
            >
              <div className="thumb border rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition">
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-30 object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RoyalFloorGallery;
