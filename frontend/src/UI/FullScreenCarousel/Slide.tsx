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

const Slide: FC<IEvent> = ({
  imageUrl,
  title,
  subtitle,
  description,
  externalUrl,
  style,
  cssClassNames,
}) => {
  const qrUrl = useQRURL(externalUrl);

  return (
    <div className={convertCssClass(cssClassNames)} style={style}>
      <div className={styles.slideContainer}>
        {imageUrl && (
          <img alt={`Bild ${title}`} className={styles.image} src={imageUrl} />
        )}
        <div className={styles.slideDescription}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <h4 className={styles.subTitle}>{subtitle}</h4>}
          {description && (
            <p className={styles.descriptionTxt}>{description}</p>
          )}
          {externalUrl && (
            <div className={styles.qrContainer}>
              <QRCode value={qrUrl} className={styles.qr} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slide;
