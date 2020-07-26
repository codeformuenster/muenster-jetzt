import React, { FC } from "react";
import { QRCode } from "react-qr-svg";

import styles from "./Slide.module.css";

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
          sandbox=""
          allow="none"
          scrolling="no"
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
