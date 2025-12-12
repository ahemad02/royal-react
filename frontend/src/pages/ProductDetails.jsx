import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const allProducts = [
  {
    id: 1,
    title: "ALTO GREY",
    banner: "/images/Alto-Grey.jpg",
    gallery: [
      "/images/ALTO-GREY-T1-1.jpg",
      "/images/ALTO-GREY-T2.jpg",
      "/images/ALTO-GREY-T3.jpg",
      "/images/ALTO-GREY-T5.jpg",
      "/images/ALTO-GREY-T6.jpg",
      "/images/ALTO-GREY-T7.jpg",
      "/images/ALTO-GREY-T8.jpg",
      "/images/ALTO-GREY-T11.jpg",
    ],
    size: "12x24",
    surface: "Glossy, Matt",
    faces: "FACE - 08",
    category: "Porcelain Tiles",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const product = allProducts.find((p) => p.id === Number(id));

  const [mainImage, setMainImage] = useState(product?.gallery[0]);

  if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  return (
    <div className="w-full detail-page">
      {/* BANNER */}
      <div className="relative w-full h-[350px] overflow-hidden">
        {/* Banner Image */}
        <img
          src={product.banner}
          className="w-full h-full object-cover"
          alt={product.title}
        />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 to-transparent py-6 flex justify-center">
          <h1 className="text-white text-3xl font-semibold tracking-wide bg-black/12 rounded-md">
            {product.title}
          </h1>
        </div>
      </div>

      {/* CONTAINER */}
      <div className="max-w-[1300px] mx-auto px-6 py-12">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-gray-400 rounded flex items-center gap-2 mb-10"
        >
          <span className="text-xl">←</span> GO BACK
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* LEFT SIDE IMAGES */}
          <div>
            {/* Main Image */}
            <div className="border p-2">
              <img src={mainImage} className="w-full h-[380px] object-cover" />
            </div>

            {/* Swiper Thumbnail Slider */}
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={4}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="mt-4"
              breakpoints={{
                320: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {product.gallery.map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`thumb p-1 cursor-pointer ${
                      mainImage === img ? "active-thumb" : ""
                    }`}
                    onClick={() => {
                      setMainImage(img);
                      swiperRef.current.slideTo(index);
                    }}
                  >
                    <img src={img} className="w-full h-24 object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div class="detail-right">
            <h1 className="text-4xl! font-semibold tracking-wide mb-6 text-black!">
              {product.title}
            </h1>

            <table className="w-full text-lg">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium w-48">PRODUCT TYPE</td>
                  <td className="py-3">{product.category}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 font-medium">SIZE</td>
                  <td className="py-3">{product.size}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 font-medium">SURFACES</td>
                  <td className="py-3">{product.surface}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 font-medium">FACES</td>
                  <td className="py-3">{product.faces}</td>
                </tr>

                <tr>
                  <td className="py-3 font-medium">360° VIEW</td>
                  <td className="py-3">
                    <a href="#" className="text-blue-600 underline">
                      View Product
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
