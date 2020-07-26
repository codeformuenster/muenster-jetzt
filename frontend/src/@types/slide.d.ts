interface IIframeOptions {
  url: string;
}

interface ISlide extends IEvent {
  style?: CSSProperties;
  iFrame?: IIframeOptions;
}
