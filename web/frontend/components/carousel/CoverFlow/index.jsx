import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./coverflow.css";

function CoverFlow({ items }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item?.image?.url} alt="Slide 1" />
          <h2>{item.title}</h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CoverFlow;
