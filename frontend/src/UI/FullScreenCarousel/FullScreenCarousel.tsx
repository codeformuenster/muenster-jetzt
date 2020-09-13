import React, { FC } from "react";
import clsx from "clsx";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useAutoplayResume from "../../hooks/useAutoplayResume";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import styles from "./FullScreenCarousel.module.css";

import Slide from "./Slide";
import useKioskTracking from "../../hooks/useKioskTracking";

SwiperCore.use([Autoplay, Navigation]);

interface IFullScreenCarousel {
  slides: ISlide[];
}

const FullScreenCarousel: FC<IFullScreenCarousel> = ({ slides }) => {
  const { sendRequest: sendTrackingRequest, onSlide: onSlideTracking } = useKioskTracking();

  const { startAutoplayResume, stopAutoplayResume } = useAutoplayResume(30000);

  return (
    <Swiper
      autoplay={{ delay: 15000, disableOnInteraction: true }}
      loop
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      spaceBetween={40}
      onSlideChange={(state) => {
        onSlideTracking(state);

        startAutoplayResume(state);
      }}
      onAutoplayStop={(state) => {
        startAutoplayResume(state);
      }}
      onAutoplayStart={() => {
        stopAutoplayResume();
      }}
      allowTouchMove={false}
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
          {({ isActive }: { isActive: boolean }) => (
            <Slide {...slide} playing={isActive} />
          )}
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
