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

const albumToSphereMapping: Record<string, string> = {};

const folder1Images = ["img-01","img-02","img-03","img-04","img-05","img-06","img-07","img-08","img-09"];
const folder2Images = ["img-10","img-11","img-12","img-13","img-14","img-15","img-16"];
const folder3Images = ["img-17","img-18","img-19","img-20","img-21","img-22","img-23","img-24"];
const folder4Images = ["img-25","img-26","img-27","img-28","img-29","img-30","img-31","img-32","img-33","img-34"];
const folder6Images = ["img-35","img-36","img-37","img-38","img-39","img-40","img-41","img-42"];
const folder7Images = ["img-43","img-44","img-45","img-46","img-47","img-48","img-49","img-50","img-51","img-52"];
const folder8Images = ["img-53","img-54","img-55","img-56","img-57","img-58","img-59","img-60","img-61"];

for (let i = 1; i <= 9; i++) albumToSphereMapping[`/assets/album/1/img${String(i).padStart(2,"0")}.jpg`] = folder1Images[i-1];
for (let i = 1; i <= 7; i++) albumToSphereMapping[`/assets/album/2/img${String(i).padStart(2,"0")}.jpg`] = folder2Images[i-1];
for (let i = 1; i <= 8; i++) albumToSphereMapping[`/assets/album/3/img${String(i).padStart(2,"0")}.jpg`] = folder3Images[i-1];
for (let i = 1; i <= 10; i++) albumToSphereMapping[`/assets/album/4/img${String(i).padStart(2,"0")}.jpg`] = folder4Images[i-1];
for (let i = 1; i <= 8; i++) albumToSphereMapping[`/assets/album/6/img${String(i).padStart(2,"0")}.jpg`] = folder6Images[i-1];
for (let i = 1; i <= 10; i++) albumToSphereMapping[`/assets/album/7/img${String(i).padStart(2,"0")}.jpg`] = folder7Images[i-1];
for (let i = 1; i <= 9; i++) albumToSphereMapping[`/assets/album/8/img${String(i).padStart(2,"0")}.jpg`] = folder8Images[i-1];

const sphereTitles: Record<string, string> = {
  "img-01": "Ảnh chụp chung các giáo sư thế hệ đầu",
  "img-02": "Ảnh đại học tổng hợp xưa",
  "img-03": "Bác Hồ cùng Tổng Thống Nhật Bản thăm đại học Tổng Hợp",
  "img-04": "Bác Hồ tại lễ khai giảng Đại học tổng hợp",
  "img-05": "Giáo sư Đàm Trung Đồn cùng đại tướng Võ Nguyên Giáp",
  "img-06": "Giáo sư Lê Văn Thiêm ghé thăm các học trò tại ĐH Lomonosov năm 1961",
  "img-07": "Giáo sư Lê Văn Thiêm với cụm công trình toán học ứng dụng",
  "img-08": "GS Lê Văn Hợp cùng sinh viên khoa toán K1",
  "img-09": "Hiệu trưởng đầu tiên của đại học khoa học tự nhiên",
  "img-10": "3 sinh viên K14 Toán cơ Tin Học",
  "img-11": "Chuyên KHTN by VNU Media",
  "img-12": "Lễ trao thưởng giảng viên giỏi năm 1994",
  "img-13": "Một số sinh viên K14 Toán cơ Tin Học",
  "img-14": "Một số sinh viên K14 Toán-Cơ-Tin Học",
  "img-15": "Sinh viên K14 khoa Toán Cơ Tin học",
  "img-16": "Thầy và trò khối Chuyên Toán 1974",
  "img-17": "Bế giản khóa 14 khoa Toán năm 1974",
  "img-18": "Bộ đội biệt phái K14",
  "img-19": "Phát biểu bế giảng khoa học lớp Cơ",
  "img-20": "Sinh viên K14 tiếp quản trung tâm máy tính năm 1975",
  "img-21": "Sinh viên nam K14 khoa Toán Cơ",
  "img-22": "Sinh viên nữ K14",
  "img-23": "Sinh viên Toán Cơ K14",
  "img-24": "Tập thể sinh viên K14 khoa Toán",
  "img-25": "Ảnh tập thể giảng viên năm 2016",
  "img-26": "Ảnh tập thể giảng viên",
  "img-27": "Buổi seminar năm 2026",
  "img-28": "Các giảng viên tham gia lễ trao giải toán học xuất sắc 2023",
  "img-29": "Gặp mặt các thế hệ",
  "img-30": "GS Lê Văn Thiêm và các học trò ở ĐH Lomonosov năm 1961",
  "img-31": "Họp mặt cựu sinh viên năm 2016",
  "img-32": "Ngày hướng nghiệp năm 2016",
  "img-33": "Sinh viên K57 nhận bằng tốt nghiệp năm 2016",
  "img-34": "Sinh viên K67 nhận bằng tốt nghiệp năm 2026",
  "img-35": "60 năm Khoa Toán - Cơ - Tin học",
  "img-36": "Ảnh chụp tập thể",
  "img-37": "Ảnh sinh viên tại Hola Park",
  "img-38": "Cuộc thi Data Flow cho sinh viên",
  "img-39": "Hội trường tầng 7",
  "img-40": "Sinh viên đi dã ngoại",
  "img-41": "Tập huấn kỹ năng mềm cho sinh viên",
  "img-42": "Trường hè 2026",
  "img-43": "Đội ngũ giảng viên khoa Toán Cơ Tin học 2026",
  "img-44": "Gặp mặt sinh viên K70 năm 2025",
  "img-45": "Hội nghị khoa học sinh viên 2026",
  "img-46": "Hội thảo chia sẻ về định hướng việc làm cho sinh viên ngành Toán học và Toán tin 2025",
  "img-47": "Lễ tổng kết và trao Giải thưởng công trình toán học xuất sắc năm 2023",
  "img-48": "Lễ tốt nghiệp năm 2026",
  "img-49": "Ngày hướng nghiệp 2026",
  "img-50": "Sinh viên Khoa tham gia trường hè toán 2022",
  "img-51": "Tập thể cán bộ Khoa Toán - Cơ - Tin học năm 2016",
  "img-52": "Trường Đại học Khoa học Tự nhiên trao học bổng và quà Tết cho sinh viên, học viên khoa Toán – Cơ – Tin học 2026",
  "img-53": "Ảnh Temp có hình trường",
  "img-54": "Ảnh thư gọi nhập ngũ",
  "img-55": "Ảnh tốt nghiệp cũ",
  "img-56": "Ảnh tốt nghiệp Đại Học Tổng Hợp",
  "img-57": "Ảnh tốt nghiệp",
  "img-58": "Ảnh trường tổng hợp xưa và nay",
  "img-59": "Giấy mời kỷ niệm 55 năm",
  "img-60": "Giấy mời kỷ niệm 60 năm",
  "img-61": "Sinh viên Đại Học Tổng Hợp nhập ngũ"
};

function toAlbumImage(src: string): AlbumImage {
  const sphereId = albumToSphereMapping[src];
  const caption = sphereId ? sphereTitles[sphereId] : undefined;
  if (caption) return { src, caption };
  const filename = src.split("/").pop() || "";
  const name = filename.replace(/\.(jpg|jpeg|png|webp)$/i, "").replace(/[-_]/g, " ");
  if (!name || /^img\d+$/i.test(name.trim())) return { src, caption: "Đang cập nhật tư liệu lịch sử..." };
  return { src, caption: name };
}

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
    ].map(toAlbumImage)
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
    ].map(toAlbumImage)
  }
];

export const photos: PhotoItem[] = [];
