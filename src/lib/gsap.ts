// Khởi tạo GSAP tập trung: đăng ký plugin đúng 1 lần, đặt defaults chung.
// Mọi component import gsap từ đây thay vì từ "gsap" trực tiếp.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ duration: 0.7, ease: "power3.out" });

// Điều kiện matchMedia: chỉ chạy animation khi người dùng không bật giảm chuyển động.
const prefersMotion = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP, prefersMotion };
