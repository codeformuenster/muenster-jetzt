import React, { FC } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";

import Slide from "./Slide";
// import styles from "./FullScreenCarousel.module.css";

SwiperCore.use([Autoplay]);

interface IFullScreenCarousel {
  slides: IEvent[];
}

const FullScreenCarousel: FC<IFullScreenCarousel> = ({ slides }) => {
  return (
    <Swiper autoplay={{ delay: 15000, disableOnInteraction: false }} loop>
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Slide {...slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FullScreenCarousel;
