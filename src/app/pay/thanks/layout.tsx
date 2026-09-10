import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment received",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pay/thanks" },
};

export default function PayThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
