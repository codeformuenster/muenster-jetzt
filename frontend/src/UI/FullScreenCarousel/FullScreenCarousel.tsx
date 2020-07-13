import React, { FC } from "react";
import Slide, { ISlide } from "./Slide";

interface IFullScreenCarousel {
  slides: ISlide[];
}

const FullScreenCarousel: FC<IFullScreenCarousel> = ({ slides }) => (
  <>
    {slides.map((slide) => (
      <Slide key={slide.title} {...slide} />
    ))}
  </>
);

export default FullScreenCarousel;
