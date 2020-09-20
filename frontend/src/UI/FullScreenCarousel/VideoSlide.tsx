import React, { FC, useRef, useEffect } from "react";
import SwiperCore from "swiper";
import styles from "./Slide.module.css";
import { IStopAutoplayResume } from "../../hooks/useAutoplayResume";

interface IVideoSlide {
  video: IVideoOptions;
  // playing should be used to start or stop video playback.
  // setting playing to false will reset the playback position
  // in order to make sure it will always start at its start.
  playing: boolean;
  swiperInstance: SwiperCore | null;
  stopAutoplayResume: IStopAutoplayResume;
}

const VideoSlide: FC<IVideoSlide> = ({
  video,
  playing,
  swiperInstance,
  stopAutoplayResume,
}) => {
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoElementRef.current;
    if (videoEl) {
      if (playing) {
        videoEl.play();
        swiperInstance?.autoplay?.stop();
        stopAutoplayResume();
      } else {
        videoEl.currentTime = 0;
        videoEl.pause();
      }
    }
  }, [playing, stopAutoplayResume, swiperInstance?.autoplay]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={videoElementRef}
      src={video.url}
      autoPlay
      muted
      controls={false}
      playsInline
      preload="auto"
      className={styles.video}
      onEnded={() => {
        swiperInstance?.slideNext();
        swiperInstance?.autoplay?.start();
      }}
    />
  );
};

export default VideoSlide;
