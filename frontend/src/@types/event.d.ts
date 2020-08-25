interface IEventBase {
  title?: string;
  subtitle?: string;
  description?: string;
  start?: Date;
  end?: Date;
  imageUrl?: string;
  externalUrl?: string;
  style?: CSSProperties;
}

interface IEvent extends IEventBase {
  id: number;
}
