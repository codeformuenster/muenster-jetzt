interface IEventBase {
  title?: string;
  subtitle?: string;
  description?: string;
  start?: Date;
  end?: Date;
  imageUrl?: string;
  externalUrl?: string;
}

interface IEvent extends IEventBase {
  id: number;
}
