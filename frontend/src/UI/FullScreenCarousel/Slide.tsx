import React, { FC, useMemo } from "react";
import QRCode from "qrcode.react";
import SwiperCore from "swiper";
import styles from "./Slide.module.css";
import IFrameSlide from "./IFrameSlide";
import VideoSlide from "./VideoSlide";
import { IStopAutoplayResume } from "../../hooks/useAutoplayResume";

interface ISlideComponent extends ISlide {
  playing: boolean;
  swiperInstance: SwiperCore | null;
  stopAutoplayResume: IStopAutoplayResume;
}

const useQRURL: (externalUrl?: string) => string = (externalUrl) => {
  return useMemo(() => {
    if (!externalUrl) {
      return "";
    }

    return `https://muenster-jetzt.de/qr/?url=${encodeURI(externalUrl)}`;
  }, [externalUrl]);
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
  stopAutoplayResume,
}) => {
  const qrUrl = useQRURL(externalUrl);

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
                swiperInstance={swiperInstance}
                stopAutoplayResume={stopAutoplayResume}
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
            <QRCode value={qrUrl} renderAs="svg" className={styles.qr} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
