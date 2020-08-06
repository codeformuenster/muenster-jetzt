import React, { FC } from "react";
import clsx from "clsx";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory, useLocation } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import styles from "./FullScreenCarousel.module.css";

import Slide from "./Slide";

SwiperCore.use([Autoplay, Navigation]);

interface IFullScreenCarousel {
  slides: IEvent[];
}

const FullScreenCarousel: FC<IFullScreenCarousel> = ({ slides }) => {
  const params = useQuery();
  const history = useHistory();
  const location = useLocation();

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
        const currSlideDiv: HTMLElement = state.slides[
          state.realIndex
        ] as HTMLElement;

        const slideId = currSlideDiv.dataset.kioskSlideId ?? "";

        if (params?.track) {
          const strParams = Object.entries({
            ...params,
            slide: slideId,
          } as Record<string, string | boolean>)
            .map((pair) => {
              if (pair[1] === true) {
                return pair[0];
              }
              return pair.join("=");
            })
            .join("&");

          const newURL = `${location.pathname}?${strParams}${location.hash}`;
          history.replace(newURL);
        }
      }}
    >
      <div className={clsx("swiper-button-prev", styles.nav, styles.prev)} />
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} data-kiosk-slide-id={slide.id}>
          <Slide {...slide} />
        </SwiperSlide>
      ))}
      <div className={clsx("swiper-button-next", styles.nav, styles.next)} />
    </Swiper>
  );
};

export default FullScreenCarousel;
