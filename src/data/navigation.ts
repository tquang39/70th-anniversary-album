import type { NavItem } from "../types";

export const navItems: NavItem[] = [
  { label: "Trang chủ", href: "#home" },
  { label: "Lịch sử", href: "#story" },
  { label: "Cột mốc", href: "#timeline" },
  { label: "Thư viện", href: "#album" }
];

export const sectionIds: string[] = navItems.map((item) => item.href.replace("#", ""));
