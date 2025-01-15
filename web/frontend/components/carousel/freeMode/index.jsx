import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./freeMode.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

export default function FreeModeCarousel({ items }) {
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue (0-360)
    const saturation = Math.floor(Math.random() * 41) + 40; // Saturation (40-80%)
    const lightness = Math.floor(Math.random() * 41) + 30; // Lightness (30-70%)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper free_mode_swiper"
      >
        {items?.map((item) => (
          <SwiperSlide
            className="free_mode_card_design"
            style={{ background: getRandomColor() }}
          >
            <div className="free_mode_card_design_image">
              <img src={item?.image?.url} />
            </div>
            <div className="free_mode_card_design_content">
              <h2>{item.title}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
