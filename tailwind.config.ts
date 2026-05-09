import type { Config } from "tailwindcss";
// Tailwind v4 — config is mostly handled via @theme in CSS
// This file kept for compatibility
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
};
export default config;
