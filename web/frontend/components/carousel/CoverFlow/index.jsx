import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "./coverflow.css";
import LinkIcon from "../../common/linkIcon";

function CoverFlow({ items }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={4}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[EffectCoverflow]}
      className="AI_quick__swiper"
    >
      {items?.map((item) => (
        <SwiperSlide className="AI_quick__card_design">
          <div className="AI_quick__card_design_image AI_quick__card_design_image_coverflow">
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
  );
}

export default CoverFlow;
