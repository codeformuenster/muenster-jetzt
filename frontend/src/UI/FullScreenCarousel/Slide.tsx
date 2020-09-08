import React, { FC, useMemo } from "react";
import { QRCode } from "react-qr-svg";
import styles from "./Slide.module.css";
import useDevice from "../../hooks/useDevice";

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
  cssClassNames,
  iFrame,
}) => {
  const qrUrl = useQRURL(externalUrl);

  return (
    <div className={convertCssClass(cssClassNames)} style={style}>
      <div className={styles.slideContainer}>
        {iFrame?.url ? (
          <iframe
            src={iFrame.url}
            title={title}
            className={styles.iframe}
            sandbox="allow-scripts allow-same-origin"
            allow={`${Object.entries(iframeDefaultAllow)
              .map((p) => p.join(" "))
              .join("; ")};`}
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
            <QRCode value={qrUrl} className={styles.qr} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
