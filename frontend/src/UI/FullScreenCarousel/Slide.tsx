import React, { FC } from "react";
import { QRCode } from "react-qr-svg";
import useQuery from "../../hooks/useQuery";

import styles from "./Slide.module.css";

const buildUrl = (
  externalUrl: string,
  query: Record<string, string | boolean> | null
): string => {
  let url = `${window.location.origin}/qr/`;
  if (query != null && query.device) {
    url += `${query.device}/`;
  }
  url += `?url=${encodeURI(externalUrl)}`;
  return url;
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
  const query = useQuery();
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
              <QRCode
                value={buildUrl(externalUrl, query)}
                className={styles.qr}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slide;
