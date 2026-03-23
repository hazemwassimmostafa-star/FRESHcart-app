"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function HomeSlider() {
  const images = [
    "https://images.unsplash.com/photo-1607082349566-187342175e2f",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    "https://images.unsplash.com/photo-1613478223719-2ab802602423",
  ];

  return (
    <div className="mb-10 overflow-hidden rounded-2xl">
      <Swiper spaceBetween={20} slidesPerView={1} loop>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`slide-${index}`}
              className="h-64 w-full object-cover md:h-80"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}