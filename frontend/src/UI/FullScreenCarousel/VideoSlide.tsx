import React, { FC, useRef, useEffect } from "react";
import styles from "./Slide.module.css";

interface IVideoSlide {
  video: IVideoOptions;
  // playing should be used to start or stop video playback.
  // setting playing to false will reset the playback position
  // in order to make sure it will always start at its start.
  playing: boolean;
  onVideoEnd(): void;
}

const VideoSlide: FC<IVideoSlide> = ({ video, playing, onVideoEnd }) => {
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoElementRef.current;
    if (videoEl) {
      if (playing) {
        videoEl.play();
      } else {
        videoEl.currentTime = 0;
        videoEl.pause();
      }
    }
  }, [playing]);

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
        onVideoEnd();
      }}
    />
  );
};

export default VideoSlide;
