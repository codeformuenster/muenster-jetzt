import React, { FC } from "react";
import styles from "./Slide.module.css";

interface IIFrameSlide {
  iFrame: IIframeOptions;
  title?: string;
}

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

const IFrameSlide: FC<IIFrameSlide> = ({ iFrame, title }) => (
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
);

IFrameSlide.defaultProps = {
  title: undefined,
};

export default IFrameSlide;
