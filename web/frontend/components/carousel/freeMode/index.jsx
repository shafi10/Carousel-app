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
import LinkIcon from "../../common/linkIcon";

export default function FreeModeCarousel({ items }) {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper AI_quick__swiper"
      >
        {items?.map((item) => (
          <SwiperSlide className="AI_quick__card_design">
            <div className="AI_quick__card_design_image">
              <img src={item?.image?.url} alt={item?.image?.alt} />
            </div>
            <div className="AI_quick__card_design_content">
              <h2>{item.title}</h2>
            </div>
            <a className="AI_quick__icon">
              <LinkIcon />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
