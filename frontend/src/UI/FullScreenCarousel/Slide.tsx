import React, { FC } from "react";
import { QRCode } from "react-qr-svg";

import styles from "./Slide.module.css";

const iframeDefaultAllow = {
  accelerometer: "'none'",
  "ambient-light-sensor": "'none'",
  autoplay: "'none'",
  battery: "'none'",
  camera: "'none'",
  "display-capture": "'none'",
  "document-domain": "'none'",
  "encrypted-media": "'none'",
  "execution-while-not-rendered": "'none'",
  "execution-while-out-of-viewport": "'none'",
  fullscreen: "'none'",
  geolocation: "'none'",
  gyroscope: "'none'",
  "layout-animations": "'none'",
  "legacy-image-formats": "'none'",
  magnetometer: "'none'",
  microphone: "'none'",
  midi: "'none'",
  "navigation-override": "'none'",
  "oversized-images": "'none'",
  payment: "'none'",
  "picture-in-picture": "'none'",
  "publickey-credentials-get": "'none'",
  "sync-xhr": "'none'",
  usb: "'none'",
  vr: "'none'",
  "wake-lock": "'none'",
  "screen-wake-lock": "'none'",
  "web-share": "'none'",
  "xr-spatial-tracking": "'none'",
};

const Slide: FC<ISlide> = ({
  imageUrl,
  title,
  subtitle,
  description,
  externalUrl,
  style,
  iFrame,
}) => (
  <div className={styles.slide} style={style}>
    <div className={styles.slideContainer}>
      {iFrame?.url ? (
        <iframe
          src={iFrame.url}
          title={title}
          className={styles.iframe}
          sandbox="allow-scripts allow-same-origin"
          allow={`${Object.entries(iframeDefaultAllow).map(p => p.join(' ')).join('; ')};`}
          scrolling="no"
          referrerPolicy="no-referrer"
        />
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
          <QRCode value={externalUrl} className={styles.qr} />
        </div>
      )}
    </div>
  </div>
);

export default Slide;
