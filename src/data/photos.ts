import type { PhotoItem } from "../types";

export type { PhotoItem } from "../types";

export type AlbumTopic = {
  id: string;
  title: string;
  subtitle: string;
  images: string[];
};

export const albumTopics: AlbumTopic[] = [
  {
    id: "nhung-nguoi-gieo-mam",
    title: "Những người gieo mầm",
    subtitle: "Sự tận tâm của các thế hệ thầy cô",
    images: [
      "/assets/album/1/img01.jpg",
      "/assets/album/1/img02.jpg",
      "/assets/album/1/img03.jpg",
      "/assets/album/1/img04.jpg",
      "/assets/album/1/img05.jpg",
      "/assets/album/1/img06.jpg",
      "/assets/album/1/img07.jpg",
      "/assets/album/1/img08.jpg",
      "/assets/album/1/img09.jpg"
    ]
  },
  {
    id: "the-he-tiep-noi",
    title: "Thế hệ tiếp nối",
    subtitle: "Ký ức thanh xuân và những nỗ lực bền bỉ",
    images: [
      "/assets/album/2/img01.jpg",
      "/assets/album/2/img02.jpg",
      "/assets/album/2/img03.jpg",
      "/assets/album/2/img04.jpg",
      "/assets/album/2/img05.jpg",
      "/assets/album/2/img06.jpg",
      "/assets/album/2/img07.jpg",
      "/assets/album/3/img01.jpg",
      "/assets/album/3/img02.jpg",
      "/assets/album/3/img03.jpg",
      "/assets/album/3/img04.jpg",
      "/assets/album/3/img05.jpg",
      "/assets/album/3/img06.jpg",
      "/assets/album/3/img07.jpg",
      "/assets/album/3/img08.jpg",
      "/assets/album/4/img01.jpg",
      "/assets/album/4/img02.jpg",
      "/assets/album/4/img03.jpg",
      "/assets/album/4/img04.jpg",
      "/assets/album/4/img05.jpg",
      "/assets/album/4/img06.jpg",
      "/assets/album/4/img07.jpg",
      "/assets/album/4/img08.jpg",
      "/assets/album/4/img09.jpg",
      "/assets/album/4/img10.jpg",
      "/assets/album/6/img01.jpg",
      "/assets/album/6/img02.jpg",
      "/assets/album/6/img03.jpg",
      "/assets/album/6/img04.jpg",
      "/assets/album/6/img05.jpg",
      "/assets/album/6/img06.jpg",
      "/assets/album/6/img07.jpg",
      "/assets/album/6/img08.jpg",
      "/assets/album/7/img01.jpg",
      "/assets/album/7/img02.jpg",
      "/assets/album/7/img03.jpg",
      "/assets/album/7/img04.jpg",
      "/assets/album/7/img05.jpg",
      "/assets/album/7/img06.jpg",
      "/assets/album/7/img07.jpg",
      "/assets/album/7/img08.jpg",
      "/assets/album/7/img09.jpg",
      "/assets/album/7/img10.jpg",
      "/assets/album/8/img01.jpg",
      "/assets/album/8/img02.jpg",
      "/assets/album/8/img03.jpg",
      "/assets/album/8/img04.jpg",
      "/assets/album/8/img05.jpg",
      "/assets/album/8/img06.jpg",
      "/assets/album/8/img07.jpg",
      "/assets/album/8/img08.jpg",
      "/assets/album/8/img09.jpg"
    ]
  }
];

export const photos: PhotoItem[] = [
  {
    id: "nhung-nguoi-gieo-mam",
    title: "Những người gieo mầm",
    year: "1956–1980s",
    period: "SỰ TẬN TÂM CỦA CÁC THẾ HỆ THẦY CÔ",
    description: "Sự tận tâm của các thế hệ thầy cô trong việc đào tạo và truyền đạt tri thức.",
    image: "",
    thumbnail: "",
    source: "",
    tone: "gold"
  },
  {
    id: "the-he-tiep-noi",
    title: "Thế hệ tiếp nối",
    year: "1970s–2026",
    period: "KÝ ỨC THANH XUÂN VÀ NHỮNG NỖ LỰC BỀN BỈ",
    description: "Ký ức thanh xuân và những nỗ lực bền bỉ của các thế hệ sinh viên.",
    image: "",
    thumbnail: "",
    source: "",
    tone: "paper"
  }
];
