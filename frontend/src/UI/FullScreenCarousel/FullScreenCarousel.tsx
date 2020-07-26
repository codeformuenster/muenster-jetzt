import React, { FC } from "react";
import clsx from "clsx";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import styles from "./FullScreenCarousel.module.css";

import Slide from "./Slide";

SwiperCore.use([Autoplay, Navigation]);

interface IFullScreenCarousel {
  slides: IEvent[];
}

const FullScreenCarousel: FC<IFullScreenCarousel> = ({ slides }) => {
  return (
    <Swiper
      autoplay={{ delay: 15000, disableOnInteraction: false }}
      loop
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      spaceBetween={40}
    >
      <div className={clsx("swiper-button-prev", styles.nav, styles.prev)} />
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Slide {...slide} />
        </SwiperSlide>
      ))}
      <div className={clsx("swiper-button-next", styles.nav, styles.next)} />
    </Swiper>
  );
};

export default FullScreenCarousel;
