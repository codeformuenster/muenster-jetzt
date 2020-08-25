import React, { FC } from "react";
import clsx from "clsx";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import styles from "./FullScreenCarousel.module.css";

import Slide from "./Slide";
import useKioskTracking from "../../hooks/useKioskTracking";

SwiperCore.use([Autoplay, Navigation]);

interface IFullScreenCarousel {
  slides: IEvent[];
}

const FullScreenCarousel: FC<IFullScreenCarousel> = ({ slides }) => {
  const { sendRequest: sendTrackingRequest, onSlide } = useKioskTracking();

  return (
    <Swiper
      autoplay={{ delay: 15000, disableOnInteraction: false }}
      loop
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      spaceBetween={40}
      onSlideChange={(state) => {
        onSlide(state);
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={clsx("swiper-button-prev", styles.nav, styles.prev)}
        onClick={() => {
          sendTrackingRequest({ source: "click-prev" });
        }}
        role="button"
        tabIndex={0}
      />
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} data-kiosk-slide-id={slide.id}>
          <Slide {...slide} />
        </SwiperSlide>
      ))}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={clsx("swiper-button-next", styles.nav, styles.next)}
        onClick={() => {
          sendTrackingRequest({ source: "click-next" });
        }}
        role="button"
        tabIndex={0}
      />
    </Swiper>
  );
};

export default FullScreenCarousel;
