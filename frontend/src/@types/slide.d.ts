interface IIframeOptions {
  url: string;
}

interface IVideoOptions {
  // url to a video file
  url: string;
}

interface ISlide extends IEvent {
  style?: CSSProperties;
  cssClassNames?: string | string[];
  iFrame?: IIframeOptions;
  video?: IVideoOptions;
}
