import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./gridCarousel.css";

// import required modules
import { Grid, Pagination } from "swiper/modules";
import LinkIcon from "../../common/linkIcon";

export default function GridCarousel({ items }) {
  return (
    <>
      <Swiper
        slidesPerView={4}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper AI_quick__swiper"
      >
        {items?.map((item) => (
          <SwiperSlide className="AI_quick__card_design AI_quick__card_design_grid_carousel">
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
