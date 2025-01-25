import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";

import "./effectCube.css";

// import required modules
import { EffectCube } from "swiper/modules";
import LinkIcon from "../../common/linkIcon";

export default function EffectCubeCarousel({ items }) {
  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        freeMode={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        modules={[EffectCube]}
        className="mySwiper AI_quick__swiper AI_quick_carousel__defined_width"
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
