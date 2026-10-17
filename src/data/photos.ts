import type { PhotoItem } from "../types";

export type { PhotoItem } from "../types";

export type AlbumImage = {
  src: string;
  caption: string;
};

export type AlbumTopic = {
  id: string;
  title: string;
  subtitle: string;
  images: AlbumImage[];
};

export const albumTopics: AlbumTopic[] = [
  {
    id: "nhung-nguoi-gieo-mam",
    title: "Nh\u1eefng ng\u01b0\u1eddi gieo m\u1ea7m",
    subtitle: "S\u1ef1 t\u1eadn t\u00e2m c\u1ee7a c\u00e1c th\u1ea7y c\u00f4",
    images: [
      { src: "/assets/album/1/img01.jpg", caption: "B\u00e1c H\u1ed3 c\u00f9ng T\u1ed5ng Th\u1ed1ng Indonesia th\u0103m \u0111\u1ea1i h\u1ecdc T\u1ed5ng H\u1ee3p" },
      { src: "/assets/album/1/img02.jpg", caption: "B\u00e1c H\u1ed3 t\u1ea1i l\u1ec5 khai gi\u1ea3ng \u0110\u1ea1i h\u1ecdc t\u1ed5ng h\u1ee3p" },
      { src: "/assets/album/1/img03.jpg", caption: "GS L\u00ea V\u0103n H\u1ee3p c\u00f9ng sinh vi\u00ean khoa to\u00e1n K1" },
      { src: "/assets/album/1/img04.jpg", caption: "GS L\u00ea V\u0103n Thi\u00eam" },
      { src: "/assets/album/1/img05.jpg", caption: "Gi\u00e1o s\u01b0 L\u00ea V\u0103n Thi\u00eam gh\u00e9 th\u0103m c\u00e1c h\u1ecdc tr\u00f2 \u0111ang h\u1ecdc t\u1ea1i tr\u01b0\u1eddng \u0110H T\u1ed5ng h\u1ee3p Lomonosov n\u0103m 1961_" },
      { src: "/assets/album/1/img06.jpg", caption: "Gi\u00e1o s\u01b0 L\u00ea V\u0103n Thi\u00eam v\u1edbi c\u1ee5m c\u00f4ng tr\u00ecnh to\u00e1n h\u1ecdc \u1ee9ng d\u1ee5ng" },
      { src: "/assets/album/1/img07.jpg", caption: "Gi\u00e1o s\u01b0 \u0110\u00e0m Trung \u0110\u1ed3n c\u00f9ng \u0111\u1ea1i t\u01b0\u1edbng V\u00f5 Nguy\u00ean Gi\u00e1p" },
      { src: "/assets/album/1/img08.jpg", caption: "\u1ea2nh ch\u1ee5p chung c\u00e1c gi\u00e1o s\u01b0 th\u1ebf h\u1ec7 \u0111\u1ea7u" },
      { src: "/assets/album/1/img09.jpg", caption: "\u1ea2nh \u0111\u1ea1i h\u1ecdc t\u1ed5ng h\u1ee3p x\u01b0a" },
    ]
  },
  {
    id: "the-he-tiep-noi",
    title: "Th\u1ebf h\u1ec7 ti\u1ebfp n\u1ed1i",
    subtitle: "K\u1ef7 ni\u1ec7m thanh xu\u00e2n v\u00e0 nh\u1eefng ng\u01b0\u1eddi b\u1ea1n c\u0169",
    images: [
      { src: "/assets/album/2/img01.jpg", caption: "3 sinh vi\u00ean K14 To\u00e1n c\u01a1 Tin H\u1ecdc" },
      { src: "/assets/album/2/img02.jpg", caption: "Chuyen KHTN by VNU Media" },
      { src: "/assets/album/2/img03.jpg", caption: "L\u1ec5 trao th\u01b0\u1edfng gi\u1ea3ng vi\u00ean gi\u1ecfi n\u0103m 1994" },
      { src: "/assets/album/2/img04.jpg", caption: "M\u00f4t s\u1ed1 sinh vi\u00ean K14 To\u00e1n c\u01a1 Tin H\u1ecdc" },
      { src: "/assets/album/2/img05.jpg", caption: "M\u00f4t s\u1ed1 sinh vi\u00ean K14 To\u00e1n-C\u01a1-Tin H\u1ecdc" },
      { src: "/assets/album/2/img06.jpg", caption: "Sinh vi\u00ean K14 khoa To\u00e1n C\u01a1 Tin h\u1ecdc" },
      { src: "/assets/album/2/img07.jpg", caption: "Th\u1ea7y v\u00e0 tr\u00f2 kh\u1ed1i Chuy\u00ean To\u00e1n 1974" },
      { src: "/assets/album/3/img01.jpg", caption: "B\u1ebf gi\u1ea3n kh\u00f3a 14 khoa To\u00e1n n\u0103m 1974" },
      { src: "/assets/album/3/img02.jpg", caption: "B\u1ed9 \u0111\u1ed9i bi\u1ec7t ph\u00e1i k14" },
      { src: "/assets/album/3/img03.jpg", caption: "Ph\u00e1t bi\u1ec3u b\u1ebf gi\u1ea3ng khoa h\u1ecdc l\u1edbp C\u01a1" },
      { src: "/assets/album/3/img04.jpg", caption: "Sinh vi\u00ean To\u00e1n C\u01a1 k14" },
      { src: "/assets/album/3/img05.jpg", caption: "Sinh vi\u00ean k14 ti\u1ebfp qu\u1ea3n trung t\u00e2m m\u00e1y t\u00ednh n\u0103m 1975" },
      { src: "/assets/album/3/img06.jpg", caption: "Sinh vi\u00ean nam k14 khoa To\u00e1n C\u01a1" },
      { src: "/assets/album/3/img07.jpg", caption: "Sinh vi\u00ean n\u1eef k14" },
      { src: "/assets/album/3/img08.jpg", caption: "T\u1eadp th\u1ec3 sinh vi\u00ean k14 khoa To\u00e1n" },
      { src: "/assets/album/4/img01.jpg", caption: "Bu\u1ed1i seminar n\u0103m  2026" },
      { src: "/assets/album/4/img02.jpg", caption: "C\u00e1c gi\u1ea3ng vi\u00ean tham gia l\u1ec5 trao gi\u1ea3i c\u00f4ng tr\u00ecnh to\u00e1n h\u1ecdc xu\u1ea5t s\u1eafc n\u0103m 2023" },
      { src: "/assets/album/4/img03.jpg", caption: "GS L\u00ea V\u0103n Thi\u00eam v\u00e0 c\u00e1c h\u1ecdc tr\u00f2 \u1edf \u0111\u1ea1i h\u1ecdc Lomonsov n\u0103m 1961" },
      { src: "/assets/album/4/img04.jpg", caption: "G\u1eb7p m\u1eb7t c\u00e1c th\u1ebf h\u1ec7" },
      { src: "/assets/album/4/img05.jpg", caption: "H\u1ecdp m\u1eb7t c\u1ef1u sinh vi\u00ean n\u0103m 2016" },
      { src: "/assets/album/4/img06.jpg", caption: "Sinh vi\u00ean k67 nh\u1eadn b\u1eb1ng t\u1ed1t nghi\u1ec7p n\u0103m 2026" },
      { src: "/assets/album/4/img07.jpg", caption: "\u1ea2nh t\u1eadp th\u1ec3 gi\u1ea3ng vi\u00ean n\u0103m 2016" },
      { src: "/assets/album/4/img08.jpg", caption: "\u1ea2nh t\u1eadp th\u1ec3 gi\u1ea3ng vi\u00ean" },
      { src: "/assets/album/6/img01.jpg", caption: "60 n\u0103m Khoa To\u00e1n - C\u01a1 - Tin h\u1ecdc" },
      { src: "/assets/album/6/img02.jpg", caption: "Cu\u1ed9c thi Data Flow cho sinh vi\u00ean" },
      { src: "/assets/album/6/img03.jpg", caption: "H\u1ed9i tr\u01b0\u1eddng t\u1ea7ng 7" },
      { src: "/assets/album/6/img04.jpg", caption: "Sinh vi\u00ean \u0111i d\u00e3 ngo\u1ea1i" },
      { src: "/assets/album/6/img05.jpg", caption: "Tr\u01b0\u1eddng h\u00e8 2026" },
      { src: "/assets/album/6/img06.jpg", caption: "T\u1eadp hu\u1ea5n k\u1ef9 n\u0103ng m\u1ec1m cho sinh vi\u00ean" },
      { src: "/assets/album/6/img07.jpg", caption: "\u1ea2nh ch\u1ee5p t\u1eadp th\u1ec3" },
      { src: "/assets/album/6/img08.jpg", caption: "\u1ea2nh sinh vi\u00ean t\u1ea1i Hola Park" },
      { src: "/assets/album/7/img01.jpg", caption: "G\u1eb7p m\u1eb7t sinh vi\u00ean k70 n\u0103m 2025" },
      { src: "/assets/album/7/img02.jpg", caption: "H\u1ed9i ngh\u1ecb khoa h\u1ecdc sinh vi\u00ean 2026" },
      { src: "/assets/album/7/img03.jpg", caption: "H\u1ed9i th\u1ea3o chia s\u1ebb v\u1ec1 \u0111\u1ecbnh h\u01b0\u1edbng vi\u1ec7c l\u00e0m cho sinh vi\u00ean ng\u00e0nh To\u00e1n h\u1ecdc v\u00e0 To\u00e1n tin 2025" },
      { src: "/assets/album/7/img04.jpg", caption: "L\u1ec5 t\u1ed1t nghi\u1ec7p n\u0103m 2026" },
      { src: "/assets/album/7/img05.jpg", caption: "L\u1ec5 t\u1ed5ng k\u1ebft v\u00e0 trao Gi\u1ea3i th\u01b0\u1edfng c\u00f4ng tr\u00ecnh to\u00e1n h\u1ecdc xu\u1ea5t s\u1eafc n\u0103m 2023" },
      { src: "/assets/album/7/img06.jpg", caption: "Ng\u00e0y h\u01b0\u1edbng nghi\u1ec7p 2026" },
      { src: "/assets/album/7/img07.jpg", caption: "Sinh vi\u00ean Khoa tham gia tr\u01b0\u1eddng h\u00e8 to\u00e1n 2022" },
      { src: "/assets/album/7/img08.jpg", caption: "Tr\u01b0\u1eddng \u0110\u1ea1i h\u1ecdc Khoa h\u1ecdc T\u1ef1 nhi\u00ean trao h\u1ecdc b\u1ed5ng v\u00e0 qu\u00e0 T\u1ebft cho sinh vi\u00ean, h\u1ecdc vi\u00ean khoa To\u00e1n \u2013 C\u01a1 \u2013 Tin h\u1ecdc 2026" },
      { src: "/assets/album/7/img09.jpg", caption: "T\u1eadp th\u1ec3 c\u00e1n b\u1ed9 Khoa To\u00e1n - C\u01a1 - Tin h\u1ecdc n\u0103m 2016" },
      { src: "/assets/album/7/img10.jpg", caption: "\u0110\u1ed9i ng\u0169 gi\u1ea3ng vi\u00ean khoa To\u00e1n C\u01a1 Tin h\u1ecdc 2026" },
      { src: "/assets/album/8/img01.jpg", caption: "Gi\u1ea5y m\u1eddi k\u1ef7 ni\u1ec7m 55 n\u0103m" },
      { src: "/assets/album/8/img02.jpg", caption: "Gi\u1ea5y m\u1eddi k\u1ef7 ni\u1ec7m 60 n\u0103m" },
      { src: "/assets/album/8/img03.jpg", caption: "Sinh vi\u00ean \u0110\u1ea1i H\u1ecdc T\u1ed5ng H\u1ee3p nh\u1eadp ng\u0169" },
      { src: "/assets/album/8/img04.jpg", caption: "\u1ea2nh Temp c\u00f3 h\u00ecnh tr\u01b0\u1eddng" },
      { src: "/assets/album/8/img05.jpg", caption: "\u1ea2nh th\u01b0 g\u1ecdi nh\u1eadp ng\u0169" },
      { src: "/assets/album/8/img06.jpg", caption: "\u1ea2nh tr\u01b0\u1eddng t\u1ed5ng h\u1ee3p x\u01b0a v\u00e0 nay" },
      { src: "/assets/album/8/img07.jpg", caption: "\u1ea2nh t\u1ed1t nghi\u1ec7p c\u0169" },
      { src: "/assets/album/8/img08.jpg", caption: "\u1ea2nh t\u1ed1t nghi\u1ec7p \u0110\u1ea1i H\u1ecdc T\u1ed5ng H\u1ee3p" },
      { src: "/assets/album/8/img09.jpg", caption: "\u1ea2nh t\u1ed1t nghi\u1ec7p" },
    ]
  }
];

export const photos: PhotoItem[] = [];
