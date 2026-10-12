import type { NavItem } from "../types";

export const navItems: NavItem[] = [
  { label: "Trang chủ", href: "#home" },
  { label: "Câu chuyện", href: "#story" },
  { label: "Dòng thời gian", href: "#timeline" },
  { label: "Album", href: "#album" },
  { label: "Tương lai", href: "#future" }
];

export const sectionIds: string[] = navItems.map((item) => item.href.replace("#", ""));
