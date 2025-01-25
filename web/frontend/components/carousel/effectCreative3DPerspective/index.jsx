import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
// import "./effectCreative.css";

// import required modules
import { EffectCreative } from "swiper/modules";
import LinkIcon from "../../common/linkIcon";

export default function EffectCreative3DPerspectiveCarousel({ items }) {
  return (
    <>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            origin: "left center",
            translate: ["-5%", 0, -200],
            rotate: [0, 100, 0],
          },
          next: {
            origin: "right center",
            translate: ["5%", 0, -200],
            rotate: [0, -100, 0],
          },
        }}
        modules={[EffectCreative]}
        className="AI_quick__swiper AI_quick_carousel__defined_width"
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
