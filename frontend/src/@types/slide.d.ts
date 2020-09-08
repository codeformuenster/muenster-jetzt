interface IIframeOptions {
  url: string;
}

interface ISlide extends IEvent {
  style?: CSSProperties;
  cssClassNames?: string | string[];
  iFrame?: IIframeOptions;
}
