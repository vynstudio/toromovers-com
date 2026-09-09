import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tip the Toro Movers crew",
  alternates: { canonical: "/pay?type=tip" },
};

export default function TipPage() {
  redirect("/pay?type=tip");
}
