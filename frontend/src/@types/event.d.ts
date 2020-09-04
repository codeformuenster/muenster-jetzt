interface IEventBase {
  title?: string;
  subtitle?: string;
  description?: string;
  start?: Date;
  end?: Date;
  imageUrl?: string;
  externalUrl?: string;
  style?: CSSProperties;
  cssClassNames?: string | string[];
}

interface IEvent extends IEventBase {
  id: number;
}
