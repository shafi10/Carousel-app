import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./effectCards.css";

// import required modules
import { EffectCards } from "swiper/modules";

export default function EffectCardsCarousel({ items }) {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item?.image?.url} alt="Slide 1" />
            <h2>{item.title}</h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
