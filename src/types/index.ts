export type PhotoTone = "paper" | "blue" | "gold" | "violet";

export type PhotoItem = {
  id: string;
  title: string;
  year: string;
  period: string;
  description: string;
  image: string;
  thumbnail: string;
  source: string;
  tone: PhotoTone;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  timeNote?: string;
  detail?: string;
  images?: string[];
  image?: string;
  imageSource?: string;
  tone?: PhotoTone;
};

export type NavItem = {
  label: string;
  href: string;
};
