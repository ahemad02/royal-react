import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { getProductById, getRelatedProducts } from "../admin/api/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const swiperRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [relatedProducts, setRelatedProducts] = useState([]);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        setProduct(res.data);
        setMainImage(res.data.gallery?.[0] || res.data.featureImage);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  
  useEffect(() => {
    if (!product?.category?._id) return;

    const fetchRelatedProducts = async () => {
      try {
        const res = await getRelatedProducts(
          product.category._id,
          product._id,
          4
        );
        setRelatedProducts(res.data);
      } catch (error) {
        console.error("Related products error", error);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);




  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-black/30 border-t-black animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <h2 className="text-center mt-10">Product not found</h2>;
  }

  return (
    <div className="w-full detail-page">
      {/* BANNER */}
      <div className="relative w-full h-[350px] overflow-hidden">
        <img
          src={product.featureImage}
          className="w-full h-full object-cover"
          alt={product.title}
        />

        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 to-transparent py-6 flex justify-center">
          <h1 className="text-white text-3xl font-semibold tracking-wide">
            {product.title}
          </h1>
        </div>
      </div>

      {/* CONTAINER */}
      <div className="max-w-[1300px] mx-auto px-6 py-12">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(`/product${location.search}`)}
          className="px-6 py-2 border border-gray-400 rounded flex items-center gap-2 mb-10 hover:bg-[#1e1e1e] hover:text-white cursor-pointer"
        >
          <span className="text-xl">←</span> GO BACK
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* LEFT IMAGES */}
          <div>
            <div
              className="border p-2 overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.querySelector(
                  "img"
                ).style.transformOrigin = `${x}% ${y}%`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector("img").style.transformOrigin =
                  "center";
              }}
            >
              <img
                src={mainImage}
                className="w-full h-[330px] object-contain transition-transform duration-300 ease-out hover:scale-150"
                alt={product.title}
              />
            </div>

            {/* THUMBNAILS */}
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
                    className={`p-1 cursor-pointer border ${
                      mainImage === img ? "border-black" : "border-transparent"
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

          {/* RIGHT DETAILS */}
          <div>
            <h2 className="text-4xl font-semibold mb-6 text-black!">
              {product.title}
            </h2>

            <table className="w-full text-lg">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium w-48">PRODUCT TYPE</td>
                  <td className="py-3">{product.category?.name}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 font-medium">SIZE</td>
                  <td className="py-3">
                    {product.sizes.map((s) => s.name).join(", ")}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 font-medium">SURFACES</td>
                  <td className="py-3">
                    {product.surfaces.map((s) => s.name).join(", ")}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 font-medium">FACES</td>
                  <td className="py-3">{product.faces}</td>
                </tr>

                {product.view360Link && (
                  <tr>
                    <td className="py-3 font-medium">360° VIEW</td>
                    <td className="py-3">
                      <a
                        href={product.view360Link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                      >
                        View Product
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="mt-20 app-container">
          <h3 className="text-3xl text-center font-semibold mb-8 uppercase!">Related Products</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer group"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.featureImage}
                    alt={item.title}
                    className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                  />
                </div>

                <h4 className="mt-4 text-lg font-medium group-hover:underline">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
