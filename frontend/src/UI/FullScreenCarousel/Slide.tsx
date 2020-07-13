import React, { FC } from "react";
import { QRCode } from "react-qr-svg";

import styles from "./Slide.module.css";

export interface ISlide {
  backgroundImage: string;
  title: string;
}

const Slide: FC<ISlide> = ({ backgroundImage, title }) => (
  <div className={styles.slide}>
    <div className={styles.qrArea}>
        <QRCode value={title} className={styles.qr} />
    </div>
    <div className={styles.titleArea}>
      <h1 className={styles.title}>{title}</h1>
    </div>
    <div className={styles.infoArea}>
        <h4>InfoBox</h4>
        <ul>
            <li>Was</li>
            <li>Wann</li>
            <li>Wo</li>
            <li>Wer</li>
            <li>Warum</li>
        </ul>
    </div>
      <div className={styles.imageArea}>
          <img alt={`Bild ${title}`} className={styles.image} src={backgroundImage} />
      </div>
    <div className={styles.footerArea}>

    </div>
  </div>
);

export default Slide;
