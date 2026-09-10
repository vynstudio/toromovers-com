import type { Metadata } from "next";
import "./pay.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
