import React, { FC } from "react";
import { QRCode } from "react-qr-svg";

import styles from "./Slide.module.css";

const Slide: FC<IEvent> = ({
  imageUrl,
  title,
  subtitle,
  description,
  externalUrl,
  style,
}) => (
  <div className={styles.slide} style={style}>
    <div className={styles.slideContainer}>
      {imageUrl !== undefined && (
        <img alt={`Bild ${title}`} className={styles.image} src={imageUrl} />
      )}
      <div className={styles.slideDescription}>
        {title !== undefined && <h1 className={styles.title}>{title}</h1>}
        {subtitle !== undefined && (
          <h4 className={styles.subTitle}>{subtitle}</h4>
        )}
        {description !== undefined && (
          <p className={styles.descriptionTxt}>{description}</p>
        )}
        {externalUrl !== undefined && (
          <div className={styles.qrContainer}>
            <QRCode value={externalUrl} className={styles.qr} />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Slide;
