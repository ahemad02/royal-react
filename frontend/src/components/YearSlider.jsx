// SyncedYearDescriptionSlider.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// Optional: If you use other Swiper features add those CSS imports too.
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";

const data = [
  { year: 2003, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quos, facilis aliquam sit, deleniti perspiciatis deserunt officia autem reiciendis dolore quis fugiat praesentium iure nemo? Odio exercitationem atque quod, enim amet cumque ipsum voluptates quas perferendis laborum id magni, eaque et totam labore temporibus quos quaerat eum modi nesciunt? Fuga asperiores non, cumque hic officiis magni dignissimos nesciunt quidem voluptate rem quibusdam blanditiis. Nemo, perspiciatis quod adipisci atque quam quibusdam accusantium aut molestias ratione repudiandae aperiam itaque exercitationem. Atque quisquam id, similique distinctio voluptates tenetur voluptatum animi quo magnam voluptatem dolore nulla nisi tempore deserunt, illum cum sapiente assumenda. Porro." },
  { year: 2005, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quos, facilis aliquam sit, deleniti perspiciatis deserunt officia autem reiciendis dolore quis fugiat praesentium iure nemo? Odio exercitationem atque quod, enim amet cumque ipsum voluptates quas perferendis laborum id magni, eaque et totam labore temporibus quos quaerat eum modi nesciunt? Fuga asperiores non, cumque hic officiis magni dignissimos nesciunt quidem voluptate rem quibusdam blanditiis. Nemo, perspiciatis quod adipisci atque quam quibusdam accusantium aut molestias ratione repudiandae aperiam itaque exercitationem. Atque quisquam id, similique distinctio voluptates tenetur voluptatum animi quo magnam voluptatem dolore nulla nisi tempore deserunt, illum cum sapiente assumenda. Porro." },
  { year: 2008, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quos, facilis aliquam sit, deleniti perspiciatis deserunt officia autem reiciendis dolore quis fugiat praesentium iure nemo? Odio exercitationem atque quod, enim amet cumque ipsum voluptates quas perferendis laborum id magni, eaque et totam labore temporibus quos quaerat eum modi nesciunt? Fuga asperiores non, cumque hic officiis magni dignissimos nesciunt quidem voluptate rem quibusdam blanditiis. Nemo, perspiciatis quod adipisci atque quam quibusdam accusantium aut molestias ratione repudiandae aperiam itaque exercitationem. Atque quisquam id, similique distinctio voluptates tenetur voluptatum animi quo magnam voluptatem dolore nulla nisi tempore deserunt, illum cum sapiente assumenda. Porro." },
  { year: 2010, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quos, facilis aliquam sit, deleniti perspiciatis deserunt officia autem reiciendis dolore quis fugiat praesentium iure nemo? Odio exercitationem atque quod, enim amet cumque ipsum voluptates quas perferendis laborum id magni, eaque et totam labore temporibus quos quaerat eum modi nesciunt? Fuga asperiores non, cumque hic officiis magni dignissimos nesciunt quidem voluptate rem quibusdam blanditiis. Nemo, perspiciatis quod adipisci atque quam quibusdam accusantium aut molestias ratione repudiandae aperiam itaque exercitationem. Atque quisquam id, similique distinctio voluptates tenetur voluptatum animi quo magnam voluptatem dolore nulla nisi tempore deserunt, illum cum sapiente assumenda. Porro." },
];

export default function YearSlider() {
  const [yearSwiper, setYearSwiper] = useState(null);
  const [descSwiper, setDescSwiper] = useState(null);

  // Link controllers only after both exist
  useEffect(() => {
    if (yearSwiper && descSwiper) {
      try {
        yearSwiper.controller.control = descSwiper;
        descSwiper.controller.control = yearSwiper;
      } catch (e) {
        // sometimes Swiper internal state is still initializing -> ignore safely
        // console.warn("Swiper controller bind failed", e);
      }
    }
  }, [yearSwiper, descSwiper]);

 return (
  <div style={{ background: "#1e1e1e", color: "white", padding: "4rem 0" }}>
    <style>
      {`
        .swiper-wrapper { overflow: visible !important; }
        .swiper-slide { overflow: visible !important; }

          .year-slide-text { font-size: 70px !important; }
          .year-slide-text.active { font-size: 90px !important; }
      
        @media(max-width:768px){
          .year-slide-text { font-size: 40px !important;text-align: center;  }
          .year-slide-text.active { font-size: 60px !important; }
        }

        @media(max-width:500px){
          .year-slide-text { font-size: 28px !important; }
          .year-slide-text.active { font-size: 40px !important; }
        }

        .desc-container {
          display: flex;
          gap: 40px;
          align-items: center;
        }
        @media(max-width:768px){
          .desc-container {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
        }
      `}
    </style>

    {/* YEAR SLIDER */}
    <div
      style={{
        borderTop: "1px solid #fff",
        borderBottom: "1px solid #fff",
        padding: "2.2rem 0",
        maxWidth: 1500,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Swiper
        onSwiper={setYearSwiper}
        modules={[Controller, Autoplay]}
        centeredSlides={true}
        spaceBetween={10}
        loop={false}
        grabCursor={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        breakpoints={{
          1024: { slidesPerView: 3, height: 130 },
          768: { slidesPerView: 2, height: 110 },
          0: { slidesPerView: 1, height: 100 },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} style={{ padding: "0 10px" }}>
            {({ isActive }) => (
              <h6
                className={`year-slide-text ${isActive ? "active" : ""}`}
                style={{
                  transition: "all 300ms ease",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  opacity: isActive ? 1 : 0.45,
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {item.year}
              </h6>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* DESCRIPTION SLIDER */}
    <div style={{ maxWidth: 1200, margin: "3.5rem auto 0", padding: "0 16px" }}>
      <Swiper
        onSwiper={setDescSwiper}
        modules={[Controller, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        allowTouchMove={false}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="desc-container">
              <h2 style={{ fontSize: 32, margin: 0, minWidth: 200 }}>
                ABOUT ROYALFLOOR
              </h2>
              <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.6 }}>
                {item.year} {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

}
