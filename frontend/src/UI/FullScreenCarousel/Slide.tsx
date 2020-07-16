import React, { FC, CSSProperties } from "react";
import { QRCode } from "react-qr-svg";

import styles from "./Slide.module.css";

interface ISlide extends IEvent {
  style?: CSSProperties;
}

const Slide: FC<ISlide> = ({
  imageUrl,
  title,
  subtitle,
  description,
  externalUrl,
  style,
}) => (
  <div className={styles.slide} style={style}>
    <div className={styles.qrArea}>
      {externalUrl !== undefined && (
        <QRCode value={externalUrl} className={styles.qr} />
      )}
    </div>
    <div className={styles.titleArea}>
      <h1 className={styles.title}>{title}</h1>
    </div>
    <div className={styles.infoArea}>
      <h4 className={styles.subTitle}>{subtitle}</h4>
      <p className={styles.descriptionTxt}>{description}</p>
    </div>
    <div className={styles.imageArea}>
      <img alt={`Bild ${title}`} className={styles.image} src={imageUrl} />
    </div>
    <div className={styles.footerArea}>Ein Projekt von Code for Münster</div>
  </div>
);

export default Slide;
