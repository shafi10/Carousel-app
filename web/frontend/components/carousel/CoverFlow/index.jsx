import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";

import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css/effect-coverflow";

import "./coverflow.css";

function CoverFlow({ items }) {
  return (
    <div className="swiper-container">
      <Swiper
        effect={"EffectCoverflow"}
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
          <SwiperSlide key={index} className={`swiper-slide slide-${index}`}>
            <div class="swiper-slide__img">
              <img src={item?.image?.url} alt="Slide 1" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CoverFlow;
