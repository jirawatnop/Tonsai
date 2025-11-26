export type Language = 'th' | 'en' | 'zh';

export type Role = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
};

export type Price = {
  adult?: number;
  child?: number;
  note?: string;
};

export type Package = {
  id: string;
  slug: string;
  name: {
    th: string;
    en: string;
    zh: string;
  };
  duration: string;
  price: Price | { [key: string]: number | string };
  activities: string[];
  times?: string[];
  image?: string;
  bookingUrl: string;
};
