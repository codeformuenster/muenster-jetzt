import React, { FC, useRef } from "react";
import clamp from "lodash-es/clamp";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import Slide from "./Slide";
import styles from "./FullScreenCarousel.module.css";

interface IFullScreenCarousel {
  slides: IEvent[];
}

const AnimatedSlide = animated(Slide);

const FullScreenCarousel: FC<IFullScreenCarousel> = ({ slides }) => {
  const index = useRef(0);
  const [props, set] = useSprings(slides.length, (i) => ({
    x: i * window.innerWidth,
    display: "block",
  }));
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 4) {
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          slides.length - 1
        );
        if (cancel) {
          cancel();
        }
      }

      set((i: number): { display: string; x?: number } => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * window.innerWidth + (down ? mx : 0);
        return { x, display: "block" };
      });
    }
  );
  return (
    <div className={styles.fullScreenCarousel}>
      {props.map(({ x, display }, i) => (
        <animated.div
          {...bind()}
          key={i}
          style={{ display, x }}
          className={styles.animated}
        >
          <AnimatedSlide
            style={{
              x,
            }}
            title={slides[i].title}
            subtitle={slides[i].subtitle}
            imageUrl={slides[i].imageUrl}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default FullScreenCarousel;
