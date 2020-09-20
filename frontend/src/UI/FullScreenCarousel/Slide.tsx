import React, { FC, useEffect, useMemo } from "react";
import { QRCode } from "react-qr-svg";
import SwiperCore from "swiper";
import styles from "./Slide.module.css";
import useDevice from "../../hooks/useDevice";
import IFrameSlide from "./IFrameSlide";
import VideoSlide from "./VideoSlide";

interface ISlideComponent extends ISlide {
  playing: boolean;
  swiperInstance: SwiperCore | null;
}

const useQRURL: (externalUrl?: string) => string = (externalUrl) => {
  const device = useDevice();

  return useMemo(() => {
    if (!externalUrl) {
      return "";
    }

    let url = `${window.location.origin}/qr/`;

    if (device) {
      url += `${device}/`;
    }

    url += `?url=${encodeURI(externalUrl)}`;

    return url;
  }, [device, externalUrl]);
};

const convertCssClass = function convertCssClass(
  className: undefined | string | string[]
): undefined | string {
  if (typeof className === "undefined") {
    return undefined;
  }
  if (typeof className === "string") {
    return styles[className];
  }
  return className.map((x) => styles[x]).join(" ");
};

const Slide: FC<ISlideComponent> = ({
  imageUrl,
  title,
  subtitle,
  description,
  externalUrl,
  style,
  cssClassNames,
  iFrame,
  video,
  playing,
  swiperInstance,
}) => {
  const qrUrl = useQRURL(externalUrl);

  useEffect(() => {
    if (playing) {
      swiperInstance?.autoplay?.stop();
    }
  }, [playing, swiperInstance]);

  return (
    <div className={convertCssClass(cssClassNames)} style={style}>
      <div className={styles.slideContainer}>
        {iFrame || video ? (
          <>
            {iFrame?.url && <IFrameSlide iFrame={iFrame} title={title} />}
            {video?.url && (
              <VideoSlide
                video={video}
                playing={playing}
                onVideoEnd={() => {
                  swiperInstance?.slideNext();
                  swiperInstance?.autoplay?.start();
                }}
              />
            )}
          </>
        ) : (
          <>
            {imageUrl && (
              <img
                alt={`Bild ${title}`}
                className={styles.image}
                src={imageUrl}
              />
            )}
            <div className={styles.slideDescription}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {subtitle && <h4 className={styles.subTitle}>{subtitle}</h4>}
              {description && (
                <p className={styles.descriptionTxt}>{description}</p>
              )}
            </div>
          </>
        )}
        {externalUrl && (
          <div className={styles.qrContainer}>
            <QRCode value={qrUrl} className={styles.qr} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
